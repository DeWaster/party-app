import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import config from '../../config';

import { Wrapper, PhotoBox, Thumbnail } from './styles';

const Gallery = props => {
  return (
    <Wrapper>
      {props.loading && <CircularProgress />}
      {props.photos.map(photo => {
        return (
          <Link to={`/photo/${photo.code}`} key={photo.code}>
            <PhotoBox>
              <Thumbnail
                src={`${config.apiUrl}/api/1/get/thumb/${photo.filename}`}
              />
            </PhotoBox>
          </Link>
        );
      })}
    </Wrapper>
  );
};

Gallery.propTypes = {
  photos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Gallery;
