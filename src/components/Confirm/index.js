import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div``;

const Confirm = props => {
  return (
    <Wrapper>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        aria-labelledby="confirmation-dialog-title"
        open={props.open}
      >
        <DialogTitle id="confirmation-dialog-title">Oletko varma?</DialogTitle>
        {/*<DialogContent></DialogContent>*/}
        <DialogActions>
          <Button onClick={props.onCancel} color="primary">
            Peruuta
          </Button>
          <Button onClick={props.onConfirm} color="primary">
            Kyllä
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Confirm;
