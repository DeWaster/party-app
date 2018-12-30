import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

//import * as bingoActions from '../actions/bingo';

const Wrapper = styled.div``;

class BingoContainer extends Component {
  render() {
    const props = this.props;
    return (
      <Wrapper>
        <h1>Bingo!</h1>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BingoContainer);
