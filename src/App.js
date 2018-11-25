import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import TeaserPage from "./containers/TeaserPage";

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
