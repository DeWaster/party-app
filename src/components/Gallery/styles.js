import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  background-color: #e4e4e1;
  background-image: radial-gradient(
      at top center,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(0, 0, 0, 0.03) 100%
    ),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(143, 152, 157, 0.6) 100%
    );
  background-blend-mode: normal, multiply;
  display: flex;
  min-height: 100vh;
`;

export const PhotoBox = styled.div`
  height: 120px;
  width: auto;
  padding: 1em;
`;

export const Thumbnail = styled.img`
  max-height: 120px;
`;
