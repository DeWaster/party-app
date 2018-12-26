import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';

const Wrapper = styled.div`
  top: 20px;
  right: 20px;
  color: #ccc;
  position: absolute;
  z-index: 9;
  border: solid 2px #ccc;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
`;

const MenuButton = props => {
  return (
    <Wrapper onClick={props.onClick}>
      {props.playing ? <VolumeUp /> : <VolumeOff />}
    </Wrapper>
  );
};

MenuButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuButton;
