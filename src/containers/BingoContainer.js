import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as bingoActions from '../actions/bingo';
import * as uiActions from '../actions/ui';

import Bingo from '../components/Bingo';
import Navigation from '../components/Navigation';
import Confirm from '../components/Confirm';

const Wrapper = styled.div``;

class BingoContainer extends Component {
  componentDidMount() {
    if (this.props.bingo.bingoGrid[0].length === 0) {
      this.props.initialiseGrid();
    }
  }

  onToggleBox = (row, col) => {
    this.props.toggleBox({ row, col });
  };

  handleBingoReset = () => {
    this.props.initialiseGrid();
    this.props.closeConfirmation();
  };

  render() {
    const { ui } = this.props;
    const appMenuItems = [
      {
        title: 'Nollaa bingo',
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
        <Bingo {...this.props} onToggleBox={this.onToggleBox} />
        <Confirm
          open={ui.showConfirmation}
          onConfirm={this.handleBingoReset}
          onCancel={this.props.closeConfirmation}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  bingo: state.bingo,
  ui: state.ui,
});

const mapDispatchToProps = {
  ...bingoActions,
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BingoContainer);
