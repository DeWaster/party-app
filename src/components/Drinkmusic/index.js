import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

import poster from './assets/images/poster.jpg';
import videoWebm from './assets/videos/background.webm';
import videoMp4 from './assets/videos/background.mp4';
import logoUrl from './assets/images/logo.svg';
import bgUrl from './assets/images/background.jpg';
import chromecastLogo from './assets/images/chromecast';

const gradientEffect = keyframes`
0% {
  filter: drop-shadow( -.75px 0px 6px #e59400 ); 
  stroke:#e59400;
} 

50% {
  filter: drop-shadow( 0px 0px 0px #000000 ); 
  stroke:none;
}

100% {
  filter: drop-shadow( -.75px 0px 6px #e59400 ); 
  stroke:#e59400;
} 
`;

const bump = keyframes`
  0% {
    transform: scale(1)
  }

  50% {
    transform: scale(1.2)
  }

  100% {
    transform: scale(1)
  }
`;

const playanim = css`
  animation: ${bump} 0.45s ease-in infinite,
    ${gradientEffect} 1.2s linear infinite;
`;

const Wrapper = styled.div`
  ${props => props.isMobile && `background: #000 url("${bgUrl}");`}
  background-size: cover;
  height: 100vh;
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

const LogoWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Logo = styled.img`
  cursor: pointer;
  user-select: none;
  ${props => props.isPlaying && playanim}
  transform-origin: 50% 50%;
`;

const ChromecastWrapper = styled.div`
  position: fixed;
  top: 90px;
  right: 10px;
  user-select: none;
`;

const getChromecastButton = castAvailable => {
  if (castAvailable) {
    const castContext = window.cast.framework.CastContext.getInstance();
    const state = castContext.getCastState();
    console.log(state);
    return (
      <ChromecastWrapper onClick={() => castContext.requestSession()}>
        {chromecastLogo(state === 'CONNECTED' ? '#6774ef' : '#FFF')}
      </ChromecastWrapper>
    );
  }
  return '';
};

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
      {!props.isMobile && (
        <Circle width="360" height="360" ref={props.canvasRef} />
      )}

      <LogoWrapper>
        <Logo
          src={logoUrl}
          onClick={props.onToggleSong}
          isPlaying={props.isPlaying}
        />
      </LogoWrapper>
      {getChromecastButton(props.castAvailable)}
    </Wrapper>
  );
};

Drinkmusic.propTypes = {
  onToggleSong: PropTypes.func.isRequired,
  videoRef: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool,
  castAvailable: PropTypes.bool,
};

export default Drinkmusic;
