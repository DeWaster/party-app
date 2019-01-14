import React, { Component } from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';

import config from '../config';

import VideoMp4 from '../assets/videos/epic3.mp4';
import VideoWebm from '../assets/videos/epic3.webm';
import epicMusic3Webm from '../assets/music/epic3.webm';
import epicMusic4Webm from '../assets/music/epic4.webm';
import epicMusic3Mp3 from '../assets/music/epic3.mp3';
import epicMusic4Mp3 from '../assets/music/epic4.mp3';
import poster from '../assets/images/poster.jpg';

import Countdown from '../components/Countdown';
import MuteButton from '../components/MuteButton';

const BackgroundVideo = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`;

const InfoText = styled.div`
  font-size: 2rem;
  position: absolute;
  text-align: center;
  width: 100vw;
  z-index: 99999;
  color: #c0c0c0;
`;

class TeaserPage extends Component {
  state = {
    playing: true,
    videoPlaying: false,
  };

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  sound = new Howl({
    src: [epicMusic3Webm, epicMusic3Mp3],
    autoplay: true,
    loop: true,
  });

  componentDidMount() {
    this.videoRef.current.onplaying = () =>
      this.setState({ videoPlaying: true });

    this.setState({
      playing: true,
    });
  }

  togglePlay = () => {
    this.sound.playing() ? this.sound.pause() : this.sound.play();
    this.setState({
      playing: this.sound.playing(),
    });
  };

  playVideo = () => {
    this.videoRef.current.play();
    this.setState({ videoPlaying: true });
  };

  render() {
    return (
      <div className="App">
        <BackgroundVideo
          autoPlay
          muted
          loop
          poster={poster}
          onClick={this.playVideo}
          ref={this.videoRef}
        >
          <source src={VideoMp4} type="video/mp4" />
          <source src={VideoWebm} type="video/webm" />
        </BackgroundVideo>
        <Countdown date={new Date(config.eventDate)} />
        {!this.state.videoPlaying && <InfoText>Click to Play Video</InfoText>}

        <MuteButton playing={this.state.playing} onClick={this.togglePlay} />
      </div>
    );
  }
}

export default TeaserPage;
