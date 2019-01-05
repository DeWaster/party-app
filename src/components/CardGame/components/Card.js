import React from 'react';
import PropTypes from 'prop-types';

import cardSVG from '../images/cards.svg';

const cardString = card => {
  if (card.suit === 'back') {
    return 'back';
  }
  return `${card.suit}_${card.number}`;
};
const Card = props => (
  <div>
    <svg
      width="255"
      height="380"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <use
        xlinkHref={`${cardSVG}#${cardString(props.card)}`}
        x="0"
        y="0"
        transform="scale(1.5)"
      />
    </svg>
  </div>
);

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
