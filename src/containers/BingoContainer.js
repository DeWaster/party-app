import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as bingoActions from '../actions/bingo';
import * as uiActions from '../actions/ui';

import Bingo from '../components/Bingo';
import Navigation from '../components/Navigation';

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

  render() {
    return (
      <Wrapper>
        <Navigation onToggleSidepanel={this.props.toggleSidepanel} />
        <Bingo {...this.props} onToggleBox={this.onToggleBox} />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  bingo: state.bingo,
});

const mapDispatchToProps = {
  ...bingoActions,
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BingoContainer);
