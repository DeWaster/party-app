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
      hours: [false, false],
      days: [false, false],
    },
    seconds: [0, 3],
    minutes: [0, 0],
    hours: [0, 0],
    days: [0, 0],
    untouched: {
      minutes: [true, true],
      seconds: [true, true],
      hours: [true, true],
      days: [true, true],
    },
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

  isTimeEnded = () => {
    const times = this.state.seconds.concat(
      this.state.minutes,
      this.state.hours,
      this.state.days
    );
    return times.every(t => t === 0);
  };
  subtrackSecond = () => {
    this.resetAnimations('seconds', 1);
    let second = this.state.seconds[1];
    second -= 1;

    if (second < 0) {
      if (this.isTimeEnded()) {
        alert('BOOM!');
        window.clearInterval(this.secondInterval);
        second = 0;
        return;
      } else {
        this.subtrackTenSecond();
        second = 9;
      }
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
      this.subtrackHour();
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

  subtrackHour = () => {
    this.resetAnimations('hours', 1);
    let hour = this.state.hours[1];
    hour -= 1;

    if (hour < 0) {
      this.subtrackTenHours();
      hour = 3;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        animations: {
          ...prevState.animations,
          hours: [prevState.animations.hours[0], true],
        },
        hours: [prevState.hours[0], hour],
        untouched: {
          ...prevState.untouched,
          hours: [prevState.untouched.hours[0], false],
        },
      };
    });
  };

  subtrackTenHours = () => {
    this.resetAnimations('hours', 0);
    let hour = this.state.hours[0];
    let secondHour = this.state.hours[1];
    hour -= 1;

    if (hour < 0) {
      hour = 2;
      secondHour = 4;
      this.subtrackDay();
    }
    this.setState(prevState => {
      return {
        ...prevState,
        animations: {
          ...prevState.animations,
          hours: [true, prevState.animations.hours[1]],
        },
        hours: [hour, secondHour],
        untouched: {
          ...prevState.untouched,
          hours: [false, prevState.untouched.hours[1] !== secondHour],
        },
      };
    });
  };

  subtrackDay = () => {
    this.resetAnimations('days', 1);
    let day = this.state.days[1];
    day -= 1;

    if (day < 0) {
      this.subtrackTenDays();
      day = 9;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        animations: {
          ...prevState.animations,
          days: [prevState.animations.days[0], true],
        },
        days: [prevState.days[0], day],
        untouched: {
          ...prevState.untouched,
          days: [prevState.untouched.days[0], false],
        },
      };
    });
  };

  subtrackTenDays = () => {
    this.resetAnimations('days', 0);
    let day = this.state.days[0];
    day -= 1;

    if (day < 0) {
      day = 0;
    }
    this.setState(prevState => {
      return {
        ...prevState,
        animations: {
          ...prevState.animations,
          days: [true, prevState.animations.days[1]],
        },
        days: [day, prevState.days[1]],
        untouched: {
          ...prevState.untouched,
          days: [false, prevState.untouched.days[1]],
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

  getNextHourOne = () => {
    let twos = this.state.hours[1] + 1;
    if (twos > 3) {
      twos = 0;
    }
    return twos;
  };

  getNextHourTwo = () => {
    let twos = this.state.hours[0] + 1;
    if (twos > 2) {
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
    this.updateTimes();
    this.secondInterval = setInterval(this.subtrackSecond, 1000);
  }

  render() {
    return (
      <div className="flipclock-wrapper">
        {/* DAYS */}
        <div className="number-pair">
          <div className="number">
            <div className="number-wrapper">
              {this.state.animations.days[0] && (
                <React.Fragment>
                  <div className="up flipUp">
                    <div className="shadow" />
                    <div className="inner">{this.getNextBaseTwo('days')}</div>
                  </div>
                  <div className="down flipDown">
                    <div className="shadow" />
                    <div className="inner">{this.state.days[0]}</div>
                  </div>
                </React.Fragment>
              )}
              <div className="up">
                <div className="shadow" />
                <div className="inner">{this.state.days[0]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inner">
                  {this.state.untouched.days[0]
                    ? this.state.days[0]
                    : this.getNextBaseTwo('days')}
                </div>
              </div>
            </div>
          </div>
          <div className="number">
            <div className="number-wrapper">
              {this.state.animations.days[1] && (
                <React.Fragment>
                  <div className="up flipUp">
                    <div className="shadow" />
                    <div className="inner">{this.getNextBaseOne('days')}</div>
                  </div>
                  <div className="down flipDown">
                    <div className="shadow" />
                    <div className="inner">{this.state.days[1]}</div>
                  </div>
                </React.Fragment>
              )}
              <div className="up">
                <div className="shadow" />
                <div className="inner">{this.state.days[1]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inner">
                  {this.state.untouched.days[1]
                    ? this.state.days[1]
                    : this.getNextBaseOne('days')}
                </div>
              </div>
            </div>
          </div>
          <div className="clock-header">PÄIVÄÄ</div>
        </div>
        {/* HOURS */}
        <div className="number-pair">
          <div className="number">
            <div className="number-wrapper">
              {this.state.animations.hours[0] && (
                <React.Fragment>
                  <div className="up flipUp">
                    <div className="shadow" />
                    <div className="inner">{this.getNextHourTwo()}</div>
                  </div>
                  <div className="down flipDown">
                    <div className="shadow" />
                    <div className="inner">{this.state.hours[0]}</div>
                  </div>
                </React.Fragment>
              )}
              <div className="up">
                <div className="shadow" />
                <div className="inner">{this.state.hours[0]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inner">
                  {this.state.untouched.hours[0]
                    ? this.state.hours[0]
                    : this.getNextHourTwo()}
                </div>
              </div>
            </div>
          </div>
          <div className="number">
            <div className="number-wrapper">
              {this.state.animations.hours[1] && (
                <React.Fragment>
                  <div className="up flipUp">
                    <div className="shadow" />
                    <div className="inner">{this.getNextHourOne()}</div>
                  </div>
                  <div className="down flipDown">
                    <div className="shadow" />
                    <div className="inner">{this.state.hours[1]}</div>
                  </div>
                </React.Fragment>
              )}
              <div className="up">
                <div className="shadow" />
                <div className="inner">{this.state.hours[1]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inner">
                  {this.state.untouched.hours[1]
                    ? this.state.hours[1]
                    : this.getNextHourOne()}
                </div>
              </div>
            </div>
          </div>
          <div className="clock-header">TUNTIA</div>
        </div>
        <div className="number-pair">
          {/* MINUTES */}
          <div className="number">
            <div className="number-wrapper">
              {this.state.animations.minutes[0] && (
                <React.Fragment>
                  <div className="up flipUp">
                    <div className="shadow" />
                    <div className="inner">
                      {this.getNextBaseTwo('minutes')}
                    </div>
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
                    <div className="inner">
                      {this.getNextBaseOne('minutes')}
                    </div>
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
          <div className="clock-header">MINUUTTIA</div>
        </div>
        <div className="number-pair">
          {/* SECONDS */}
          <div className="number">
            <div className="number-wrapper">
              {this.state.animations.seconds[0] && (
                <React.Fragment>
                  <div className="up flipUp">
                    <div className="shadow" />
                    <div className="inner">
                      {this.getNextBaseTwo('seconds')}
                    </div>
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
                    <div className="inner">
                      {this.getNextBaseOne('seconds')}
                    </div>
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
          <div className="clock-header">SEKUNTIA</div>
        </div>
      </div>
    );
  }
}
Countdown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
export default Countdown;
