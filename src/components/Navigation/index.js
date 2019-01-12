import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import { withStyles } from '@material-ui/core/styles';

import config from '../../config';

const Wrapper = styled.div``;

const AppHeader = styled.h3`
  flex-grow: 1;
`;

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

let anchorEl;

const Navigation = props => {
  const { classes, showMenuSelector } = props;

  const handleClose = event => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    props.closeMenu();
  };

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
          {showMenuSelector && (
            <React.Fragment>
              <IconButton
                color="inherit"
                onClick={props.showMenu ? props.closeMenu : props.openMenu}
                buttonRef={node => {
                  anchorEl = node;
                }}
                aria-haspopup="true"
                aria-owns={props.showMenu ? 'menu-list-grow' : undefined}
              >
                <MoreIcon />
              </IconButton>
              <Popper
                open={props.showMenu}
                anchorEl={anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                          {props.menuItems.map(item => (
                            <MenuItem key={item.title} onClick={item.onClick}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      {props.children}
    </Wrapper>
  );
};

Navigation.defaultProps = {
  showMenu: false,
  menuItems: [],
};

Navigation.propTypes = {
  onToggleSidepanel: PropTypes.func.isRequired,
  showMenu: PropTypes.bool,
  showMenuSelector: PropTypes.bool,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  menuItems: PropTypes.array,
};

export default withStyles(styles)(Navigation);
