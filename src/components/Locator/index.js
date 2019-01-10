import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

import config from '../../config';

const Wrapper = styled.div`
  padding: 2em;
  background-color: #02833f;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
`;

const LocationWrapper = styled.div`
  display: flex;
`;
const styles = theme => ({
  locatorButton: {
    margin: '0 auto',
    width: '100px',
  },
});

const Locator = props => {
  const { classes, onLocate } = props;
  return (
    <Wrapper>
      <Title>{config.apps.locator.title}</Title>
      <LocationWrapper>
        <Fab
          variant="extended"
          color="default"
          aria-label="Add"
          className={classes.locatorButton}
          onClick={onLocate}
        >
          LOCATE
        </Fab>
      </LocationWrapper>
    </Wrapper>
  );
};

Locator.propTypes = {
  onLocate: PropTypes.func.isRequired,
};

export default withStyles(styles)(Locator);
