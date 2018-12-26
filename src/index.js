import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styled from 'styled-components';
import App from './App';
import * as serviceWorker from './serviceWorker';
import partyApp from './reducers';

const StyledApp = styled(App)`
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
    background: #ffffff;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const store = createStore(partyApp);

ReactDOM.render(
  <Provider store={store}>
    <StyledApp />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
