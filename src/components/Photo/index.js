import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../../config';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  max-width: 100vw;
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

const PhotoWrapper = styled.div``;

const PhotoImg = styled.img`
  max-width: 800px;

  @media (max-width: 750px) {
    max-width: 100vw;
  }
`;

const Photo = props => {
  return (
    <Wrapper>
      {props.loading && <CircularProgress />}
      <PhotoWrapper>
        {props.photo.uploaded ? (
          <PhotoImg
            src={`${config.apiUrl}/api/1/get/${props.photo.filename}`}
          />
        ) : (
          <h2>Kuvan lataus on vielä kesken. Yritä hetken päästä uudelleen</h2>
        )}
      </PhotoWrapper>
    </Wrapper>
  );
};

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Photo;
