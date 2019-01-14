import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import poster from './assets/images/poster.jpg';
import videoWebm from './assets/videos/background.webm';
import videoMp4 from './assets/videos/background.mp4';
import logoUrl from './assets/images/logo.svg';

const Wrapper = styled.div`
  min-height: 100vh;
`;
const BackgroundVideo = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
`;

const Circle = styled.canvas``;

const Drinkmusic = props => {
  return (
    <Wrapper>
      <BackgroundVideo
        muted
        loop
        poster={poster}
        onClick={() => null}
        ref={props.videoRef}
      >
        <source src={videoWebm} type="video/webm" />
        <source src={videoMp4} type="video/mp4" />
      </BackgroundVideo>
      <img src={logoUrl} onClick={props.onToggleSong} />
      <Circle width="800" height="600" ref={props.canvasRef} />
    </Wrapper>
  );
};

Drinkmusic.propTypes = {
  onToggleSong: PropTypes.func.isRequired,
  videoRef: PropTypes.object.isRequired,
};

export default Drinkmusic;
