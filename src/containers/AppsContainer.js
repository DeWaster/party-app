import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as uiActions from '../actions/ui';
import AppsList from '../components/AppsList';
import Navigation from '../components/Navigation';

const Wrapper = styled.div`
  min-height: 100vh;
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
