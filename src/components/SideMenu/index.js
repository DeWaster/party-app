import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Divider from '@material-ui/core/Divider';

/* Icons */
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Help from '@material-ui/icons/Help';
import Book from '@material-ui/icons/Book';
import Apps from '@material-ui/icons/Apps';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import Settings from '@material-ui/icons/Settings';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const Wrapper = styled.div``;

const SideMenu = props => {
  return (
    <Wrapper>
      <SwipeableDrawer
        variant="persistent"
        anchor="left"
        open={props.show}
        onOpen={props.onOpenSidePanel}
        onClose={props.onCloseSidePanel}
      >
        <div tabIndex={0}>
          <IconButton onClick={props.onToggleSidepanel}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/">
            <ListItem button key={'Koti'}>
              <ListItemIcon>
                <Apps />
              </ListItemIcon>
              <ListItemText primary={'Koti'} />
            </ListItem>
          </Link>
          <Link to="/instructions">
            <ListItem button key={'Ohjeet'}>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText primary={'Ohjeet'} />
            </ListItem>
          </Link>
        </List>
        <Link to="/settings">
          <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={'Asetukset'} />
          </ListItem>
        </Link>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary={'Kirjaudu ulos'} />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </Wrapper>
  );
};

SideMenu.propTypes = {
  show: PropTypes.bool.isRequired,
  onToggleSidepanel: PropTypes.func.isRequired,
  onOpenSidePanel: PropTypes.func.isRequired,
  onCloseSidePanel: PropTypes.func.isRequired,
};

export default SideMenu;
