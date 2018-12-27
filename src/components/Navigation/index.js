import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div``;

const AppHeader = styled.h3`
  flex-grow: 1;
`;

const Navigation = props => {
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
          <AppHeader>Party-app</AppHeader>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

Navigation.propTypes = {
  onToggleSidepanel: PropTypes.func.isRequired,
};

export default Navigation;
