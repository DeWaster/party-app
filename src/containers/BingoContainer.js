import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as bingoActions from '../actions/bingo';

import Bingo from '../components/Bingo';
//import * as bingoActions from '../actions/bingo';

const Wrapper = styled.div``;

class BingoContainer extends Component {
  componentDidMount() {
    this.props.initialiseGrid();
  }

  onToggleBox = (row, col) => {
    this.props.toggleBox({ row, col });
  };

  render() {
    return (
      <Wrapper>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BingoContainer);
