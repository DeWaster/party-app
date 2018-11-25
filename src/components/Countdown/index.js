/* This component is based (well... at least animations) on codepen by Adam Ilter
 * https://codepen.io/ademilter/pen/czIGo
 *
 * It's horrible code... way too much state changes and arrays. But it works
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.css';

class Countdown extends Component {
  state = {
    animations: {
      seconds: [false, false],
      minutes: [false, false],
    },
    seconds: [0, 3],
    minutes: [1, 0],
    untouched: {
      minutes: [true, true],
      seconds: [true, true],
    },
  };

  subtrackSecond = () => {
    this.resetAnimations('seconds', 1);
    let second = this.state.seconds[1];
    second -= 1;

    if (second < 0) {
      this.subtrackTenSecond();
      second = 9;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        animations: {
          ...prevState.animations,
          seconds: [prevState.animations.seconds[0], true],
        },
        seconds: [prevState.seconds[0], second],
        untouched: {
          ...prevState.untouched,
          seconds: [prevState.untouched.seconds[0], false],
        },
      };
    });
  };

  subtrackTenSecond = () => {
    this.resetAnimations('seconds', 0);
    let second = this.state.seconds[0];
    second -= 1;

    if (second < 0) {
      this.subtrackMinute();
      second = 5;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        animations: {
          ...prevState.animations,
          seconds: [true, prevState.animations.seconds[1]],
        },
        seconds: [second, prevState.seconds[1]],
        untouched: {
          ...prevState.untouched,
          seconds: [false, prevState.untouched.seconds[1]],
        },
      };
    });
  };

  subtrackMinute = () => {
    this.resetAnimations('minutes', 1);
    let minute = this.state.minutes[1];
    minute -= 1;

    if (minute < 0) {
      this.subtrackTenMinutes();
      minute = 9;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        animations: {
          ...prevState.animations,
          minutes: [prevState.animations.minutes[0], true],
        },
        minutes: [prevState.minutes[0], minute],
        untouched: {
          ...prevState.untouched,
          minutes: [prevState.untouched.minutes[0], false],
        },
      };
    });
  };

  subtrackTenMinutes = () => {
    this.resetAnimations('minutes', 0);
    let minute = this.state.minutes[0];
    minute -= 1;

    if (minute < 0) {
      minute = 5;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        animations: {
          ...prevState.animations,
          minutes: [true, prevState.animations.minutes[1]],
        },
        minutes: [minute, prevState.minutes[1]],
        untouched: {
          ...prevState.untouched,
          minutes: [false, prevState.untouched.minutes[1]],
        },
      };
    });
  };

  getNextBaseOne = name => {
    let ones = this.state[name][1] + 1;
    if (ones > 9) {
      ones = 0;
    }
    return ones;
  };

  getNextBaseTwo = name => {
    let twos = this.state[name][0] + 1;
    if (twos > 5) {
      twos = 0;
    }
    return twos;
  };

  resetAnimations = (name, level) => {
    const animations = { ...this.state.animations };
    animations[name][level] = false;
    this.setState(prevState => {
      return { ...prevState, animations };
    });
  };

  componentDidMount() {
    setInterval(this.subtrackSecond, 1000);
  }

  render() {
    return (
      <div className="flipclock-wrapper">
        {/* MINUTES */}
        <div className="number">
          <div className="number-wrapper">
            {this.state.animations.minutes[0] && (
              <React.Fragment>
                <div className="up flipUp">
                  <div className="shadow" />
                  <div className="inner">{this.getNextBaseTwo('minutes')}</div>
                </div>
                <div className="down flipDown">
                  <div className="shadow" />
                  <div className="inner">{this.state.minutes[0]}</div>
                </div>
              </React.Fragment>
            )}
            <div className="up">
              <div className="shadow" />
              <div className="inner">{this.state.minutes[0]}</div>
            </div>
            <div className="down">
              <div className="shadow" />
              <div className="inner">
                {this.state.untouched.minutes[0]
                  ? this.state.minutes[0]
                  : this.getNextBaseTwo('minutes')}
              </div>
            </div>
          </div>
        </div>
        <div className="number">
          <div className="number-wrapper">
            {this.state.animations.minutes[1] && (
              <React.Fragment>
                <div className="up flipUp">
                  <div className="shadow" />
                  <div className="inner">{this.getNextBaseOne('minutes')}</div>
                </div>
                <div className="down flipDown">
                  <div className="shadow" />
                  <div className="inner">{this.state.minutes[1]}</div>
                </div>
              </React.Fragment>
            )}
            <div className="up">
              <div className="shadow" />
              <div className="inner">{this.state.minutes[1]}</div>
            </div>
            <div className="down">
              <div className="shadow" />
              <div className="inner">
                {this.state.untouched.minutes[1]
                  ? this.state.minutes[1]
                  : this.getNextBaseOne('minutes')}
              </div>
            </div>
          </div>
        </div>
        {/* SECONDS */}
        <div className="number">
          <div className="number-wrapper">
            {this.state.animations.seconds[0] && (
              <React.Fragment>
                <div className="up flipUp">
                  <div className="shadow" />
                  <div className="inner">{this.getNextBaseTwo('seconds')}</div>
                </div>
                <div className="down flipDown">
                  <div className="shadow" />
                  <div className="inner">{this.state.seconds[0]}</div>
                </div>
              </React.Fragment>
            )}
            <div className="up">
              <div className="shadow" />
              <div className="inner">{this.state.seconds[0]}</div>
            </div>
            <div className="down">
              <div className="shadow" />
              <div className="inner">
                {this.state.untouched.seconds[0]
                  ? this.state.seconds[0]
                  : this.getNextBaseTwo('seconds')}
              </div>
            </div>
          </div>
        </div>
        <div className="number">
          <div className="number-wrapper">
            {this.state.animations.seconds[1] && (
              <React.Fragment>
                <div className="up flipUp">
                  <div className="shadow" />
                  <div className="inner">{this.getNextBaseOne('seconds')}</div>
                </div>
                <div className="down flipDown">
                  <div className="shadow" />
                  <div className="inner">{this.state.seconds[1]}</div>
                </div>
              </React.Fragment>
            )}
            <div className="up">
              <div className="shadow" />
              <div className="inner">{this.state.seconds[1]}</div>
            </div>
            <div className="down">
              <div className="shadow" />
              <div className="inner">
                {this.state.untouched.seconds[1]
                  ? this.state.seconds[1]
                  : this.getNextBaseOne('seconds')}
              </div>
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
