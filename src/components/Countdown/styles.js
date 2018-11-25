import styled, { keyframes } from 'styled-components';

const turn = keyframes`
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
}
`;

const turn2 = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
`;

const hide = keyframes`
  0% {
      opacity: 1;
  }
  100% {
      opacity: 0;
  }
`;

export const Wrapper = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
`;
export const Number = styled.div`
  position: relative;
  float: left;
  margin: 5px;
  width: 60px;
  height: 90px;
  font-size: 80px;
  font-weight: bold;
  line-height: 87px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
`;

const BaseHalf = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  z-index: 1;
  overflow: hidden;
`;

export const Inner = styled.div`
  position: absolute;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 200%;
  color: #ccc;
  text-shadow: 0 1px 2px #000;
  text-align: center;
  background-color: #333;
  border-radius: 6px;
`;

export const Up = styled(BaseHalf)`
  transform-origin: 50% 100%;
  top: 0;

  &:after {
    content: '';
    position: absolute;
    top: 44px;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.4);
  }

  & ${Inner} {
    top: 0;
  }
`;

export const UpAnim = styled(Up)`
  z-index: 3;
  animation: ${turn2} 0.5s linear both;
`;

export const Down = styled(BaseHalf)`
  transform-origin: 50% 0%;
  bottom: 0;

  & ${Inner} {
    bottom: 0;
  }
`;

export const DownAnim = styled(Down)`
  z-index: 2;
  animation: ${turn} 0.5s 0.5s linear both;
`;

export const ShadowUp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  animation: show 0.5s linear both;
`;

export const ShadowDown = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  animation: show 0.5s linear both;
`;

export const NumberWrapper = styled.div`
  height: 100%;
  perspective: 200px;
`;
