import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  top: 20px;
  right: 20px;
  color: #ccc;
  position: absolute;
  z-index: 9;
  border: solid 2px #ccc;
  padding: 10px;
  border-radius: 50%;
`;

const MenuButton = props => {
  return (
    <Wrapper onClick={props.onClick}>
      <FontAwesomeIcon
        icon={props.playing ? 'volume-mute' : 'volume-up'}
        size="1x"
      />
    </Wrapper>
  );
};

MenuButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuButton;
