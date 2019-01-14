import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as uiActions from '../actions/ui';

import Settings from '../components/Settings';
import Navigation from '../components/Navigation';

const Wrapper = styled.div`
  background-color: #e4e4e1;
  background-image: radial-gradient(
      at top center,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(0, 0, 0, 0.03) 100%
    ),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(143, 152, 157, 0.6) 100%
    );
  background-blend-mode: normal, multiply;
  background-blend-mode: multiply, multiply;
  min-height: 100vh;
`;

let deferredPrompt;

// Capture deferredPrompt
window.addEventListener('beforeinstallprompt', e => {
  deferredPrompt = e;
});

class SettingsContainer extends Component {
  render() {
    const { ui } = this.props;

    return (
      <Wrapper>
        <Navigation
          onToggleSidepanel={this.props.toggleSidepanel}
          showMenuSelector={false}
          showMenu={ui.showAppMenu}
          openMenu={this.props.openAppMenu}
          closeMenu={this.props.closeAppMenu}
        />
        <Settings onAddToHomeScreen={this.handleAddToHomeScreen} />
      </Wrapper>
    );
  }

  handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        deferredPrompt = null;
      });
    } else {
      this.props.showError('Selaimesi ei tue lisäämistä aloitusnäyttöön');
    }
  };
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = {
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer);
