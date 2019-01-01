import styled, { keyframes } from 'styled-components';

const gradient = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

export const Wrapper = styled.div`
  background: #eaeaea;
  max-width: 100vw;
  min-height: 100vh;
`;

export const BingoBox = styled.div`
  background: ${props => (props.toggled ? '#5F5F5F' : '#fff')};
  color: ${props => (props.toggled ? '#fff' : '#000')};
  font-weight: bold;
  margin: 2px;
  width: 18vw;
  font-size: 0.7em;
  word-wrap: break-word;
  padding: 0.3rem;
  min-height: 15vh;
  text-align: center;
  border-radius: 10px;
  border: solid 2px #000;
  animation: ${gradient} 3s linear infinite;
  ${props =>
    props.highlight &&
    `
    background: linear-gradient(270deg, #67ff00, #00c5ff);
    background-size: 400% 400%;
  `}
`;

export const BingoRow = styled.div`
  display: flex;
  justify-content: center;
`;
