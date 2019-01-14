import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const styles = theme => ({
  root: {
    width: '480px',
    padding: '1rem',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const Settings = props => {
  const { classes } = props;
  return (
    <Wrapper>
      <Paper className={classes.root} elevation={1}>
        <div>
          <Checkbox checked={false} onChange={() => null} value="checkedA" />
          <span>Vastaanota notifikaatteja</span>
        </div>
        <div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.onAddToHomeScreen}
          >
            Lisää aloitusnäyttöön
          </Button>
        </div>
      </Paper>
    </Wrapper>
  );
};

Settings.propTypes = {
  onAddToHomeScreen: PropTypes.func.isRequired,
};

export default withStyles(styles)(Settings);
