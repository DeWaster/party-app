/* This component is based on codepen by Adam Ilter
 * https://codepen.io/ademilter/pen/czIGo
 *
 * It's working but relies on pretty stupid state changes.
 * I'll refactor this later and create own component library of it
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Wrapper,
  Number,
  Up,
  Down,
  ShadowUp,
  ShadowDown,
  Inner,
  NumberWrapper,
  UpAnim,
  DownAnim,
} from './styles';

class Countdown extends Component {
  state = {
    animations: {
      seconds: [false, true],
    },
    seconds: 9,
  };

  updateSecond = () => {};

  getSeconds = () => {
    return [
      Math.floor((this.state.seconds / 10) % 10),
      Math.floor(this.state.seconds % 10),
    ];
  };

  getPrevSeconds = () => {
    const secs = this.state.seconds - 1;
    return [Math.floor((secs / 10) % 10), Math.floor(secs % 10)];
  };

  componentDidMount() {
    setInterval(this.updateSecond, 1000);
  }
  render() {
    return (
      <Wrapper>
        <Number>
          <NumberWrapper>
            <UpAnim>
              <Inner>{this.getSeconds()[1]}</Inner>
            </UpAnim>
            <Up>
              <ShadowUp />
              <Inner>2</Inner>
            </Up>
            <DownAnim>
              <Inner>2</Inner>
            </DownAnim>
            <Down>
              <ShadowDown />
              <Inner>{this.getSeconds()[1]}</Inner>
            </Down>
          </NumberWrapper>
        </Number>
      </Wrapper>
    );
  }
}
Countdown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
export default Countdown;
