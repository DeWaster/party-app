import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as galleryActions from '../actions/gallery';
import * as uiActions from '../actions/ui';

import Gallery from '../components/Gallery';
import Navigation from '../components/Navigation';

const Wrapper = styled.div``;

class GalleryContainer extends Component {
  componentDidMount() {
    this.props.fetchPhotos();
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
        <Gallery
          photos={this.props.gallery.photos}
          loading={this.props.gallery.photosLoading}
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
)(GalleryContainer);
