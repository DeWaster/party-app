import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SoundButton from './SoundButton';

import sound1Image from './images/sound1.png';
import sound2Image from './images/sound2.png';
import sound3Image from './images/sound3.png';
import sound4Image from './images/sound4.png';
import sound5Image from './images/sound5.png';
import sound6Image from './images/sound6.png';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

const SoundBoard = props => {
  return (
    <Wrapper>
      <SoundButton
        title="1"
        image={sound1Image}
        onClick={() =>
          props.playStatus[0] ? props.onStopSound() : props.onPlaySound(0)
        }
        playing={props.playStatus[0]}
        duration={props.duration}
      />
      <SoundButton
        title="2"
        image={sound2Image}
        onClick={() =>
          props.playStatus[1] ? props.onStopSound() : props.onPlaySound(1)
        }
        playing={props.playStatus[1]}
        duration={props.duration}
      />
      <SoundButton
        title="3"
        image={sound3Image}
        onClick={() =>
          props.playStatus[2] ? props.onStopSound() : props.onPlaySound(2)
        }
        playing={props.playStatus[2]}
        duration={props.duration}
      />
      <SoundButton
        title="4"
        image={sound4Image}
        onClick={() =>
          props.playStatus[3] ? props.onStopSound() : props.onPlaySound(3)
        }
        playing={props.playStatus[3]}
        duration={props.duration}
      />
      <SoundButton
        title="5"
        image={sound5Image}
        onClick={() =>
          props.playStatus[4] ? props.onStopSound() : props.onPlaySound(4)
        }
        playing={props.playStatus[4]}
        duration={props.duration}
      />
      <SoundButton
        title="6"
        image={sound6Image}
        onClick={() =>
          props.playStatus[5] ? props.onStopSound() : props.onPlaySound(5)
        }
        playing={props.playStatus[5]}
        duration={props.duration}
      />
    </Wrapper>
  );
};

SoundBoard.propTypes = {
  onPlaySound: PropTypes.func.isRequired,
  onStopSound: PropTypes.func.isRequired,
  playStatus: PropTypes.array.isRequired,
  duration: PropTypes.number,
};

export default SoundBoard;
