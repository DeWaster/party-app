import React, { Component } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TeaserPage from './containers/TeaserPage';
import FrontPage from './containers/FrontPage';

class App extends Component {
  render() {
    const isStarted = moment().isAfter('2018-12-26 18:29:00');

    return (
      <div className="App">
        <Router>
          <Route
            path="/"
            exact
            component={isStarted ? FrontPage : TeaserPage}
          />
        </Router>
      </div>
    );
  }
}

export default App;
