import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import config from '../../config';
import Card from './components/Card';

const Wrapper = styled.div`
  justify-content: center;
  background-color: #02833f;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231cbd28' fill-opacity='0.29' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  text-align: center;
  min-height: 100vh;
`;

const RuleLabel = styled.div`
  background: #fff;
  border: #000 solid 1px;
  border-radius: 5px;
  text-align: center;
  width: 300px;
  margin: 0 auto;
  padding: 1em 2em;
`;

const scale = keyframes`
  from {
    transform: scale3d(2,2,2);
  }

  to {
    transform: scale3d(1,1,1);
  }
`;

const StyledCard = styled(Card)`
  animation: ${props => (props.showanim === 'true' ? scale : 'none')} 0.5s
    ease-out;
`;

let currentTime = Date();

const CardGame = props => {
  return (
    <Wrapper>
      <StyledCard
        card={props.currentCard}
        onDoubleClick={props.onNewCard}
        showanim={props.showAnimation.toString()}
      />
      <RuleLabel>
        {props.emptyPack
          ? 'Peli loppui!'
          : config.apps.cardGame.rules[props.currentCard.number]}
      </RuleLabel>
    </Wrapper>
  );
};

CardGame.propTypes = {
  currentCard: PropTypes.object.isRequired,
  onNewCard: PropTypes.func.isRequired,
  showAnimation: PropTypes.bool.isRequired,
  emptyPack: PropTypes.bool.isRequired,
};

export default CardGame;
