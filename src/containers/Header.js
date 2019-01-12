import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as uiActions from '../actions/ui';
import SideMenu from '../components/SideMenu';

const Wrapper = styled.div``;

class Header extends Component {
  render() {
    const props = this.props;
    return (
      <Wrapper>
        <SideMenu
          show={props.ui.showSidepanel}
          onToggleSidepanel={props.toggleSidepanel}
          onOpenSidePanel={props.openSidepanel}
          onCloseSidePanel={props.closeSidepanel}
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
