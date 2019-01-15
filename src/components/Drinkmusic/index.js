import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import poster from './assets/images/poster.jpg';
import videoWebm from './assets/videos/background.webm';
import videoMp4 from './assets/videos/background.mp4';
import logoUrl from './assets/images/logo.svg';
import bgUrl from './assets/images/background.jpg';

const Wrapper = styled.div`
  ${props => props.isMobile && `background: url('${bgUrl}');`}
  background-size: cover;
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

const Circle = styled.canvas`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Logo = styled.img`
  transform: scale(0.3);
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Drinkmusic = props => {
  return (
    <Wrapper isMobile={props.isMobile}>
      {!props.isMobile && (
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
      )}
      <Circle width="360" height="360" ref={props.canvasRef} />

      <LogoWrapper>
        <Logo src={logoUrl} onClick={props.onToggleSong} />
      </LogoWrapper>
    </Wrapper>
  );
};

Drinkmusic.propTypes = {
  onToggleSong: PropTypes.func.isRequired,
  videoRef: PropTypes.object.isRequired,
};

export default Drinkmusic;
