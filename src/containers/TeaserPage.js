import React, { Component } from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';

import VideoMp4 from '../assets/videos/epic1.mp4';
import VideoWebm from '../assets/videos/epic1.webm';
import epicMusic1Ogg from '../assets/music/epic1.ogg';
import epicMusic2Ogg from '../assets/music/epic2.ogg';
import epicMusic3Ogg from '../assets/music/epic3.ogg';
import epicMusic4Ogg from '../assets/music/epic4.ogg';
import epicMusic1Mp3 from '../assets/music/epic1.mp3';
import epicMusic2Mp3 from '../assets/music/epic2.mp3';
import epicMusic3Mp3 from '../assets/music/epic3.mp3';
import epicMusic4Mp3 from '../assets/music/epic4.mp3';
import poster from '../assets/images/poster.png';

import Countdown from '../components/Countdown';
import MuteButton from '../components/MuteButton';

const BackgroundVideo = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`;

class TeaserPage extends Component {
  sound = new Howl({
    src: [epicMusic1Ogg, epicMusic1Mp3],
    autoplay: true,
    loop: true,
  });

  togglePlay = () => {
    this.sound.playing() ? this.sound.pause() : this.sound.play();
  };
  render() {
    const playing = this.sound.playing();
    return (
      <div className="App">
        <BackgroundVideo autoPlay muted loop poster={poster}>
          <source src={VideoMp4} type="video/mp4" />
          <source src={VideoWebm} type="video/webm" />
        </BackgroundVideo>
        <Countdown date={new Date('2019-01-31T12:00:00.000Z')} />
        <MuteButton playing={playing} onClick={this.togglePlay} />
      </div>
    );
  }
}

export default TeaserPage;
