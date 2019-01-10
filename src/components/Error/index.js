import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import * as uiActions from '../../actions/ui';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.error.dark,
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
});

class Error extends React.Component {
  render() {
    const { classes, ui } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.props.ui.showError}
          onClose={this.props.hideError}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            className={classNames(classes.wrapper)}
            message={
              <span id="client-snackbar" className={classes.message}>
                <ErrorIcon
                  className={classNames(classes.icon, classes.iconVariant)}
                />
                {ui.errorMessage}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.props.hideError}
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
)(withStyles(styles)(Error));
