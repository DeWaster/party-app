import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

import config from '../../config';

const Wrapper = styled.div``;

const AppHeader = styled.h3`
  flex-grow: 1;
`;

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const Navigation = props => {
  const { classes } = props;
  return (
    <Wrapper>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={props.onToggleSidepanel}
          >
            <MenuIcon />
          </IconButton>
          <AppHeader>{config.title}</AppHeader>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </Wrapper>
  );
};

Navigation.propTypes = {
  onToggleSidepanel: PropTypes.func.isRequired,
};

export default withStyles(styles)(Navigation);
