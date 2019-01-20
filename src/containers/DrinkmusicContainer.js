import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Howl, Howler } from 'howler';
import LinearProgress from '@material-ui/core/LinearProgress';

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
import { loadMusic } from '../components/Drinkmusic/chromecast';

const musicUrl = `${window.location.protocol}//${
  window.location.host
}/static/media${musicWebm}`;

const Wrapper = styled.div``;

class DrinkmusicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: null,
      loading: false,
      isCasting: false,
      isPlaying: false,
      castAvailable: false,
    };
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.controlPoints = 25;
  }

  componentDidMount() {
    if (window.cast) {
      const { cast } = window;
      const castContext = cast.framework.CastContext.getInstance();
      if (castContext.getCastState() === 'CONNECTED') {
        const player = new cast.framework.RemotePlayer();
        const controller = new cast.framework.RemotePlayerController(player);
        controller.addEventListener(
          window.cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,
          this.castPlayerStateChanged
        );

        this.setState({
          isCasting: true,
          isPlaying: true,
          castAvailable: true,
        });
      } else {
        // Initialize Chromecast
        window.addEventListener('castingready', this.initializeCasting, false);
      }
    }

    this.handleMusicReset();
  }

  componentWillUnmount() {
    this.state.music && this.state.music.unload();
    this.setState({});
  }

  initializeCasting = () => {
    const { cast } = window;
    const castContext = cast.framework.CastContext.getInstance();
    this.setState({
      castAvailable: true,
    });
    // Add event handlers
    castContext.addEventListener(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      this.castStateChanged
    );
  };

  castStateChanged = event => {
    const { cast } = window;
    switch (event.castState) {
      case 'CONNECTED':
        // Unload music if any
        this.state.music && this.state.music.unload();

        this.setState({
          isCasting: true,
          music: null,
          castAvailable: true,
        });

        // Add session event handlers
        const player = new cast.framework.RemotePlayer();
        const controller = new cast.framework.RemotePlayerController(player);
        controller.addEventListener(
          window.cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,
          this.castPlayerStateChanged
        );
        if (player.playerState === 'PLAYING') {
          this.setState({
            isPlaying: true,
          });
          this.videoRef.current && this.videoRef.current.play();
        }
        break;
      case 'NOT_CONNECTED':
        this.setState({
          isCasting: false,
        });
        this.handleMusicReset();
    }
  };

  castPlayerStateChanged = event => {
    switch (event.value) {
      case 'PLAYING':
        this.setState({
          isPlaying: true,
        });
        this.videoRef.current && this.videoRef.current.play();
        break;
      case 'PAUSED':
        this.setState({
          isPlaying: false,
        });
        this.videoRef.current && this.videoRef.current.pause();
        break;
      case null:
        this.setState({
          isPlaying: false,
        });
        this.videoRef.current && this.videoRef.current.pause();
        break;
    }
  };

  handleMusicReset = () => {
    this.state.music && this.state.music.unload();
    this.setState({
      isPlaying: false,
      loading: true,
      music: new Howl({
        src: [musicWebm, musicMp3],
        autoplay: false,
        loop: false,
        onload: () =>
          this.setState({
            loading: false,
          }),
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

  handleMusicToggle = () => {
    if (this.state.music && this.state.music.playing()) {
      this.state.music.pause();
      this.videoRef.current && this.videoRef.current.pause();
      this.setState({
        isPlaying: false,
      });
      //cancelAcancelAnimationFrame(this.reqFrameLoop);
    } else {
      // Disable in mobile
      window.innerWidth <= 500 && this.renderFreqFrame();

      this.state.music.play();
      this.videoRef.current && this.videoRef.current.play();
      this.setState({
        isPlaying: true,
      });
    }
  };

  handleMusicToggleCast = async () => {
    if (!this.isMediaLoaded()) {
      try {
        await loadMusic(musicUrl, 'audio/webm');
        this.setState(prevState => ({
          isPlaying: true,
        }));

        this.videoRef.current && this.videoRef.current.play();
      } catch (err) {
        console.log(err);
      }
    } else {
      const player = new window.cast.framework.RemotePlayer();
      const playerController = new window.cast.framework.RemotePlayerController(
        player
      );
      playerController.playOrPause();
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
    const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
    if (!castSession) {
      return false;
    }
    const mediaSession = castSession.getMediaSession();
    return mediaSession && mediaSession.media.contentId;
  };

  render() {
    const { ui, showError, showInfo } = this.props;
    const isMobile = window.innerWidth <= 500;
    const appMenuItems = [
      {
        title: 'Aloita alusta',
        onClick: this.props.openConfirmation,
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
        {this.state.loading && <LinearProgress />}
        <Drinkmusic
          videoRef={this.videoRef}
          canvasRef={this.canvasRef}
          onToggleSong={
            this.state.isCasting
              ? this.handleMusicToggleCast
              : this.handleMusicToggle
          }
          isMobile={isMobile}
          isPlaying={this.state.isPlaying}
          castAvailable={this.state.castAvailable}
        />
        <Confirm
          open={ui.showConfirmation}
          onConfirm={this.handleMusicReset}
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
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrinkmusicContainer);
