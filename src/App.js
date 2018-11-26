import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import TeaserPage from './containers/TeaserPage';

library.add(faVolumeUp, faVolumeMute);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={TeaserPage} />
        </Router>
      </div>
    );
  }
}

export default App;
