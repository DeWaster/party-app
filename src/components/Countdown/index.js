import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './styles.css';

class Countdown extends Component {
  state = {
    seconds: [0, 0],
    animations: {
      seconds: [false, true],
    },
    upperNext: 0,
  };

  secondPlay = () => {
    this.setState((state, props) => {
      return {
        animations: {
          seconds: [false, true],
        },
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

  componentDidMount() {
    setInterval(this.secondPlay, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.animations.seconds[1] === true) {
      this.setState((state, props) => {
        return {
          seconds: [0, this.getNext(prevState)],
          animations: {
            days: [false, false],
            hours: [false, false],
            minutes: [false, false],
            seconds: [false, false],
          },
        };
      });
    }
  }

  render() {
    return (
      <div className="flipclock">
        <div
          className={`container ${
            this.state.animations.seconds[1] ? 'play' : ''
          }`}
        >
          <ul className="flip minutePlay">
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
                <div className="inn">{this.getNext(this.state)}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">{this.getNext(this.state)}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
Countdown.propTypes = {
  date: PropTypes.instanceOf(moment),
};
export default Countdown;
