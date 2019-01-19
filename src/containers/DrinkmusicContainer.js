import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Howl, Howler } from 'howler';

import * as drinkmusicActions from '../actions/drinkmusic';
import * as uiActions from '../actions/ui';

import Drinkmusic from '../components/Drinkmusic';
import Navigation from '../components/Navigation';
import musicWebm from '../components/Drinkmusic/assets/music/music.webm';
import musicMp3 from '../components/Drinkmusic/assets/music/music.mp3';
import Confirm from '../components/Confirm';
import {
  drawBars,
  createBarCoordinates,
  arrayToAverages,
} from '../components/Drinkmusic/graphics';
import {
  initializeCastApi,
  loadMusic,
} from '../components/Drinkmusic/chromecast';

const musicUrl = `${window.location.protocol}//${
  window.location.host
}/static/media${musicWebm}`;

const Wrapper = styled.div``;

class DrinkmusicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: null,
      loading: true,
      isCasting: false,
      isPlaying: false,
      castController: null,
      castSession: null,
      castPlayStatus: null,
    };
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.controlPoints = 25;
  }

  async componentDidMount() {
    this.handleMusicReset();

    // Initialize chromecast
    window['__onGCastApiAvailable'] = async isAvailable => {
      if (isAvailable) {
        const { cast, chrome } = window;
        this.castContext = await initializeCastApi();

        this.castContext.addEventListener(
          cast.framework.CastContextEventType.CAST_STATE_CHANGED,
          event => {
            switch (event.castState) {
              case 'CONNECTED':
                this.castSession = cast.framework.CastContext.getInstance().getCurrentSession();

                this.state.music.unload();
                this.setState({
                  isCasting: true,
                  music: null,
                });
                this.castPlayer = new cast.framework.RemotePlayer();
                this.castController = new cast.framework.RemotePlayerController(
                  this.castPlayer
                );
                this.castController.addEventListener(
                  window.cast.framework.RemotePlayerEventType
                    .PLAYER_STATE_CHANGED,
                  event => {
                    if (event.value === 'PAUSED') {
                      this.videoRef.current && this.videoRef.current.pause();
                      this.setState({
                        isPlaying: false,
                      });
                    } else if (event.value === 'PLAYING') {
                      this.videoRef.current && this.videoRef.current.play();
                      this.setState({
                        isPlaying: true,
                      });
                    } else if (event.value === 'IDLE') {
                      this.videoRef.current && this.videoRef.current.pause();
                      this.setState({
                        isPlaying: false,
                      });
                    }
                  }
                );
                // If chromecast is already playing
                if (this.getCastPlayerState() === 'PLAYING') {
                  this.videoRef.current && this.videoRef.current.play();
                  this.setState({
                    isPlaying: true,
                  });
                }

                break;
              case 'NOT_CONNECTED':
                this.setState({
                  isCasting: false,
                });
                this.handleMusicReset();
                break;
            }
          }
        );
      }
    };
  }

  componentWillUnmount() {
    this.state.music.unload();
    this.setState({});
  }

  handleMusicReset = () => {
    this.state.music && this.state.music.unload();
    this.setState({
      music: new Howl({
        src: [musicWebm, musicMp3],
        autoplay: false,
        loop: false,
        onend: () => this.videoRef.current && this.videoRef.current.pause(),
      }),
    });

    // Connect analyser to Howler music
    this.analyser = Howler.ctx.createAnalyser();
    Howler.masterGain.connect(this.analyser);
    this.analyser.connect(Howler.ctx.destination);
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    this.props.closeConfirmation();
  };

  handleMusicToggle = async () => {
    if (!this.state.isCasting && this.state.music.playing()) {
      this.state.music.pause();
      this.videoRef.current && this.videoRef.current.pause();
      this.setState({
        isPlaying: false,
      });
      //cancelAcancelAnimationFrame(this.reqFrameLoop);
    } else if (!this.state.isCasting) {
      this.renderFreqFrame();
      this.state.music.play();
      this.videoRef.current && this.videoRef.current.play();
      this.setState({
        isPlaying: true,
      });
    } else if (this.state.isCasting) {
      if (!this.isMediaLoaded()) {
        try {
          await loadMusic(this.castSession, musicUrl, 'audio/webm');
          this.setState({
            isPlaying: true,
          });
          this.videoRef.current && this.videoRef.current.play();
        } catch {
          console.log('Failed at loading music');
        }
      } else {
        this.castController.playOrPause();
      }
    }
  };

  // Render loop to draw graphics
  renderFreqFrame = () => {
    this.reqFrameLoop = requestAnimationFrame(this.renderFreqFrame);
    this.analyser.getByteFrequencyData(this.frequencyData);

    drawBars(
      createBarCoordinates(
        arrayToAverages(this.frequencyData, this.controlPoints),
        this.controlPoints
      ),
      this.canvasRef
    );

    // this.drawCircle(
    //   this.createCircleCoordinates(this.arrayToAverages(this.frequencyData))
    // );
  };

  getCastPlayerState = () => {
    return this.castPlayer && this.castPlayer.playerState;
  };

  isMediaLoaded = () => {
    console.log(this.castSession.getMediaSession());
    if (!this.castSession) {
      return false;
    }
    const mediaSession = this.castSession.getMediaSession();
    return mediaSession && mediaSession.media.contentId;
  };

  render() {
    const { ui, showError, showInfo } = this.props;
    const isMobile = window.innerWidth <= 500;
    const appMenuItems = [
      {
        title: 'Aloita alusta',
        onClick: () => {},
      },
      {
        title: <google-cast-launcher />,
        onClick: () => null,
      },
    ];

    return (
      <Wrapper>
        <Navigation
          onToggleSidepanel={this.props.toggleSidepanel}
          showMenuSelector={true}
          showMenu={ui.showAppMenu}
          openMenu={this.props.openAppMenu}
          closeMenu={this.props.closeAppMenu}
          menuItems={appMenuItems}
        />
        <Drinkmusic
          videoRef={this.videoRef}
          canvasRef={this.canvasRef}
          onToggleSong={this.handleMusicToggle}
          isMobile={isMobile}
          isPlaying={this.state.isPlaying}
        />
        <Confirm
          open={ui.showConfirmation}
          onConfirm={this.handleBingoReset}
          onCancel={this.props.closeConfirmation}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = {
  ...drinkmusicActions,
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrinkmusicContainer);
