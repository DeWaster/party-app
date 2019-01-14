import React, { Component } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import config from './config';
import TeaserPage from './containers/TeaserPage';
import Header from './containers/Header';
import Bingo from './containers/BingoContainer';
import CardGame from './containers/CardGameContainer';
import Apps from './containers/AppsContainer';
import SoundBoard from './containers/SoundboardContainer';
import Instructions from './containers/InstructionsContainer';
import Bubble from './components/Bubble';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fjalla+One|Noto+Sans:400,700');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Fjalla One', sans-serif;
  }

  body {
    background: #fff;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

class App extends Component {
  render() {
    const isStarted = moment().isAfter(config.eventDate);

    return (
      <div className="App">
        <GlobalStyle />
        <Router>
          <React.Fragment>
            <Route path="/" component={isStarted ? Header : TeaserPage} />
            {isStarted && (
              <Switch>
                <Route exact path="/" component={Apps} />
                <Route path="/instructions" component={Instructions} />
                <Route path="/bingo" component={Bingo} />
                <Route path="/cardgame" component={CardGame} />
                <Route path="/soundboard" component={SoundBoard} />
              </Switch>
            )}
          </React.Fragment>
        </Router>
        {isStarted && <Bubble />}
      </div>
    );
  }
}

export default App;
