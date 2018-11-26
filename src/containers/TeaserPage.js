import React, { Component } from 'react';
import styled from 'styled-components';

import Video from '../assets/videos/epic1.mp4';
import Countdown from '../components/Countdown';

const BackgroundVideo = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`;

class TeaserPage extends Component {
  render() {
    return (
      <div className="App">
        <BackgroundVideo autoPlay muted loop>
          <source src={Video} type="video/mp4" />
        </BackgroundVideo>
        <Countdown date={new Date('2019-01-30T22:00:00.000Z')} />
      </div>
    );
  }
}

export default TeaserPage;
