import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as galleryActions from '../actions/gallery';
import * as uiActions from '../actions/ui';

import Photo from '../components/Photo';
import Navigation from '../components/Navigation';
import Confirm from '../components/Confirm';

const Wrapper = styled.div``;

class PhotoContainer extends Component {
  componentDidMount() {
    const sharecode = this.props.match.params.sharecode;
    this.props.fetchPhoto(sharecode);
  }
  render() {
    const { ui, gallery } = this.props;

    return (
      <Wrapper>
        <Navigation
          onToggleSidepanel={this.props.toggleSidepanel}
          showMenuSelector={false}
          showMenu={ui.showAppMenu}
          openMenu={this.props.openAppMenu}
          closeMenu={this.props.closeAppMenu}
        />
        <Photo
          loading={this.props.gallery.photoLoading}
          photo={this.props.gallery.photo}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  gallery: state.gallery,
  ui: state.ui,
});

const mapDispatchToProps = {
  ...galleryActions,
  ...uiActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoContainer);
