/* This component is based on codepen by Adam Ilter
 * https://codepen.io/ademilter/pen/czIGo
 *
 * It's working but relies on pretty stupid state changes.
 * I'll refactor this later and create own component library of it
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.css';

class Countdown extends Component {
  state = {
    animations: {
      seconds: [false, true],
    },
    seconds: 9,
  };

  updateSecond = () => {
    this.resetAnimations();
    this.setState(prevState => {
      return {
        animations: {
          seconds: [false, true],
        },
        seconds: prevState.seconds - 1,
      };
    });
  };

  getSeconds = () => {
    return [
      Math.floor((this.state.seconds / 10) % 10),
      Math.floor(this.state.seconds % 10),
    ];
  };

  getPrevSeconds = () => {
    let secs = this.state.seconds - 1;
    if (secs < 0) {
      secs = 9;
    }
    return [Math.floor((secs / 10) % 10), Math.floor(secs % 10)];
  };

  getNextSeconds = () => {
    let secs = this.state.seconds + 1;
    if (secs > 9) {
      secs = 0;
    }
    return [Math.floor((secs / 10) % 10), Math.floor(secs % 10)];
  };

  resetAnimations = () => {
    this.setState({
      animations: {
        seconds: [false, false],
      },
    });
  };

  componentDidMount() {
    setInterval(this.updateSecond, 1000);
  }
  render() {
    return (
      <div className="flipclock-wrapper">
        <div className="number">
          <div className="number-wrapper">
            {this.state.animations.seconds[1] && (
              <React.Fragment>
                <div className="up flipUp">
                  <div className="shadow" />
                  <div className="inner">{this.getNextSeconds()[1]}</div>
                </div>
                <div className="down flipDown">
                  <div className="shadow" />
                  <div className="inner">{this.getSeconds()[1]}</div>
                </div>
              </React.Fragment>
            )}
            <div className="up">
              <div className="shadow" />
              <div className="inner">{this.getSeconds()[1]}</div>
            </div>
            <div className="down">
              <div className="shadow" />
              <div className="inner">{this.getNextSeconds()[1]}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Countdown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
export default Countdown;
