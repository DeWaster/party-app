import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0px 1px #000;
  font-size: 16px;
  text-decoration: none;

  margin: 0.5em;

  cursor: pointer;
  width: 150px;
  height: 70px;
  overflow: visible;
  border-radius: 3px;

  transition: all 0.1s ease-in-out;

  outline: 0;

  border-color: rgba(0, 0, 0, 0.6);
  border-style: solid;
  border-width: 1px;

  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.4) inset,
    0 2px 6px rgba(0, 0, 0, 0.5), 0 10px rgba(0, 0, 0, 0.05) inset;

  background: url("${props => props.imageurl}");
  background-size: cover;

  &:hover {

    border-color: rgba(255, 255, 255, 0.6) !important;
    border-image: none;
    border-style: solid;
    border-width: 1px;

    box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.4) inset,
      0 10px 0 0 rgba(255, 255, 255, 0.5) inset,
      0 0 5px 2px rgba(255, 255, 255, 0.75),
      0 0 10px 2px rgba(255, 255, 255, 0.75) inset !important;

    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background: url("${props => props.imageurl}");
    background-size: cover;
  }
`;

const Content = styled.div`
  width: 150px;
  height: 70px;
  padding: 1em 1em;
  max-height: 70px;
  background: gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(96, 103, 104, 0.3)),
    color-stop(3%, rgba(187, 187, 187, 0.3)),
    color-stop(27%, rgba(187, 187, 187, 0.3)),
    color-stop(28%, rgba(0, 0, 0, 0.3)),
    color-stop(60%, rgba(0, 0, 0, 0.3)),
    color-stop(73%, rgba(0, 0, 0, 0.3)),
    color-stop(88%, rgba(75, 80, 81, 0.3)),
    color-stop(97%, rgba(0, 0, 0, 0.3)),
    color-stop(100%, rgba(0, 0, 0, 0.3))
  );
  background: linear-gradient(
    to bottom,
    rgba(96, 103, 104, 0.3) 0%,
    rgba(187, 187, 187, 0.3) 3%,
    rgba(187, 187, 187, 0.3) 27%,
    rgba(0, 0, 0, 0.3) 28%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.3) 73%,
    rgba(75, 80, 81, 0.3) 88%,
    rgba(0, 0, 0, 0.3) 97%,
    rgba(0, 0, 0, 0.3) 100%
  );

  ${props => props.playing && 'background: rgba(0,0,0,0.7);'}
`;

const StatusBar = styled.div`
  position: absolute;
  width: ${props => (props.playing ? '150px' : '0')};
  height: 70px;
  background: rgba(123, 123, 123, 0.8);
  transition: width ${props => (props.playing ? `${props.duration}s` : '0')}
    linear;
`;

const Title = styled.div`
  font-family: 'Fjalla One', sans-serif;
  user-select: none;
`;

const SoundButton = props => {
  return (
    <Wrapper imageurl={props.image} onClick={props.onClick}>
      <StatusBar playing={props.playing} duration={props.duration} />
      <Content playing={props.playing}>
        <Title>{props.title}</Title>
      </Content>
    </Wrapper>
  );
};

SoundButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  image: PropTypes.string,
  playing: PropTypes.bool,
};

export default SoundButton;
