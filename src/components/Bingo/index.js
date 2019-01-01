import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, BingoRow, BingoBox } from './styles';

const Bingo = props => {
  const bingoStatus = props.bingo.bingoStatus;

  return (
    <Wrapper>
      {props.bingo.bingoGrid.map((row, rowKey) => {
        return (
          <BingoRow key={row}>
            {row.map((element, elementKey) => {
              return (
                <BingoBox
                  key={element}
                  onClick={() => props.onToggleBox(rowKey, elementKey)}
                  toggled={bingoStatus[rowKey][elementKey]['pressed']}
                  highlight={bingoStatus[rowKey][elementKey]['highlight']}
                >
                  {element}
                </BingoBox>
              );
            })}
          </BingoRow>
        );
      })}
    </Wrapper>
  );
};

Bingo.propTypes = {
  onToggleBox: PropTypes.func.isRequired,
};

export default Bingo;
