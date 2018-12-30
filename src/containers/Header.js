import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as uiActions from '../actions/ui';
import * as apiActions from '../actions/api';
import Navigation from '../components/Navigation';
import SideMenu from '../components/SideMenu';

const Wrapper = styled.div``;

class Header extends Component {
  render() {
    const props = this.props;
    return (
      <Wrapper>
        <Navigation onToggleSidepanel={props.toggleSidepanel} />
        <SideMenu
          show={props.ui.showSidepanel}
          onToggleSidepanel={props.toggleSidepanel}
        />
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
)(Header);
