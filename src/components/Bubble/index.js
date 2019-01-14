import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import * as uiActions from '../../actions/ui';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: '#4fc3f7',
  },
});

const BubbleIcon = (type, classes) => {
  switch (type) {
    case 'error':
      return (
        <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
      );

    case 'info':
      return (
        <InfoIcon className={classNames(classes.icon, classes.iconVariant)} />
      );
  }
};

class Bubble extends React.Component {
  render() {
    const { classes, ui } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.props.ui.showBubble}
          onClose={this.props.hideError}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            className={classNames(classes[ui.bubbleType])}
            message={
              <span id="client-snackbar" className={classes.message}>
                {BubbleIcon(ui.bubbleType, classes)}
                {ui.bubbleMessage}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.props.hideBubble}
                className={classes.close}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
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
)(withStyles(styles)(Bubble));
