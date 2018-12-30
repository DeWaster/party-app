import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AppsList from '../components/AppsList';
const Wrapper = styled.div`
  min-height: 100vh;
  background: #41295a;
  background: -webkit-linear-gradient(to bottom, #2f0743, #41295a);
  background: linear-gradient(to bottom, #2f0743, #41295a);
`;

class AppsContainer extends Component {
  render() {
    return (
      <Wrapper>
        <AppsList />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppsContainer);
