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
    days: [0, 0],
    hours: [0, 0],
    minutes: [0, 0],
    seconds: [0, 0],
    animations: {
      days: [false, false],
      hours: [false, false],
      minutes: [false, false],
      seconds: [false, true],
    },
    upperNext: 0,
  };

  /*
  addSecond = () => {
    const seconds = this.state.seconds;
    const minutes = this.state.minutes;
    const hours = this.state.hours;
    const days = this.state.days;
    const animations = this.state.animations;

    seconds[1] += 1;
    if (seconds[1] > 9) {
      seconds[0] += 1;
      seconds[1] = 0;
      animations.seconds[1] = true;
    }
    if (seconds[0] > 5) {
      minutes[1] += 1;
      seconds[0] = 0;
      animations.seconds[0] = true;
    }
    if (minutes[1] > 9) {
      minutes[0] += 1;
      minutes[1] = 0;
      animations.minutes[1] = true;
    }
    if (minutes[0] > 5) {
      hours[1] += 1;
      minutes[0] = 0;
      animations.minutes[0] = true;
    }
    if (hours[1] > 9) {
      hours[0] += 1;
      hours[1] = 0;
      animations.hours[1] = true;
    }
    if (hours[0] === 2 && hours[1] === 4) {
      days[1] += 1;
      hours[1] = 0;
      hours[0] = 0;
      animations.hours[0] = true;
      animations.hours[1] = true;
      animations.days[1] = true;
    }
    if (days[1] > 9) {
      days[0] += 1;
      animations.days[0] = true;
    }

    this.setState((state, props) => {
      return {
        seconds,
        minutes,
        hours,
        days,
        animations,
      };
    });
  };
  */

  subtractSecond = () => {
    const seconds = this.state.seconds;
    const animations = this.state.animations;
    this.resetAnimations();

    seconds[1] -= 1;
    animations.seconds[1] = true;

    if (seconds[1] < 0) {
      seconds[0] -= 1;
      seconds[1] = 9;
    }

    if (seconds[0] < 0) {
      seconds[0] = 5;
      animations.seconds[0] = true;
    }

    this.setState(prevstate => {
      return {
        seconds,
        animations,
      };
    });
  };

  getNext = state => {
    const next = state.seconds[1] + 1;
    if (next > 9) {
      return 0;
    } else {
      return next;
    }
  };

  getPrev = state => {
    const next = state.seconds[1] - 1;
    if (next < 0) {
      return 9;
    } else {
      return next;
    }
  };

  updateTimes() {
    const secondsTill = moment(this.props.date).diff(new Date(), 'seconds');
    const days = Math.floor(secondsTill / 86400);
    const hours = Math.floor((secondsTill - days * 86400) / 3600);
    const minutes = Math.floor(
      (secondsTill - days * 86400 - hours * 3600) / 60
    );
    const seconds = secondsTill - days * 86400 - hours * 3600 - minutes * 60;

    this.setState((state, props) => {
      return {
        days: [Math.floor((days / 10) % 10), Math.floor(days % 10)],
        hours: [Math.floor((hours / 10) % 10), Math.floor(hours % 10)],
        minutes: [Math.floor((minutes / 10) % 10), Math.floor(minutes % 10)],
        seconds: [Math.floor((seconds / 10) % 10), Math.floor(seconds % 10)],
      };
    });
  }

  componentDidMount() {
    this.updateTimes();
    setInterval(this.subtractSecond, 1000);
  }

  resetAnimations = () => {
    this.setState((state, props) => {
      return {
        animations: {
          days: [false, false],
          hours: [false, false],
          minutes: [false, false],
          seconds: [false, false],
        },
      };
    });
  };

  isAnimationOn = state => {
    const times = Object.keys(state.animations);
    return times.some(time => {
      return state.animations[time][0] || state.animations[time][1];
    });
  };

  render() {
    return (
      <div className="flipclock">
        <div
          className={`container ${
            this.state.animations.seconds[1] ? 'play' : ''
          }`}
        >
          <ul className="flip">
            <li className="before">
              <div className="up">
                <div className="shadow" />
                <div className="inn">{this.state.seconds[1]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">{this.state.seconds[1]}</div>
              </div>
            </li>
            <li className="active">
              <div className="up">
                <div className="shadow" />
                <div className="inn">{this.getPrev(this.state)}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">{this.getPrev(this.state)}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
Countdown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
export default Countdown;
