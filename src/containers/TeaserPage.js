import React, { Component } from 'react';

import Countdown from '../components/Countdown';

class TeaserPage extends Component {
  render() {
    return (
      <div className="App">
        <Countdown date={new Date('2019-02-31T00:00:00')} />
      </div>
    );
  }
}

export default TeaserPage;
