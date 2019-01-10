import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as uiActions from '../actions/ui';
import Navigation from '../components/Navigation';
import Locator from '../components/Locator';

const Wrapper = styled.div``;
// F7:32:B9:1B:DA:1F
class LocatorContainer extends Component {
  handleLocate = () => {
    navigator.bluetooth
      .requestDevice({ acceptAllDevices: true })
      .then(device => {
        console.log(device);
        return device.gatt.connect();
      })
      .then(server => {
        console.log(server);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (!navigator.bluetooth) {
      this.props.showError('Selain ei tue Bluetooth API:a');
    }
  }

  render() {
    const { ui } = this.props;
    const appMenuItems = [
      {
        title: 'Aloita alusta',
        onClick: this.props.openConfirmation,
      },
    ];

    return (
      <Wrapper>
        <Navigation
          onToggleSidepanel={this.props.toggleSidepanel}
          showMenuSelector={true}
          showMenu={ui.showAppMenu}
          openMenu={this.props.openAppMenu}
          closeMenu={this.props.closeAppMenu}
          menuItems={appMenuItems}
        />
        <Locator onLocate={this.handleLocate} />
      </Wrapper>
    );
  }
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
)(LocatorContainer);
