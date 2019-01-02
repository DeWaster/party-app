import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as uiActions from '../actions/ui';
import AppsList from '../components/AppsList';
import Navigation from '../components/Navigation';

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
        <Navigation onToggleSidepanel={this.props.toggleSidepanel} />
        <AppsList />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = { ...uiActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppsContainer);
