import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
`;

const BingoBox = styled.div`
  background: ${props => (props.toggled ? '#000000' : '#c0c0c0')};
  margin: 2px;
  width: 17vw;
  font-size: 0.7rem;
  word-wrap: break-word;
  padding: 0.3rem;
  min-height: 12vh;
`;
const BingoRow = styled.div`
  display: flex;
  justify-content: center;
`;

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
