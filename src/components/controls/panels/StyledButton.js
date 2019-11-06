import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {lightBlue, grey, orange} from '@material-ui/core/colors';
import PropTypes from 'prop-types';

const styles = {
  root: {
    border: 1,
    borderRadius: 3,
    color: 'white',
  },
  select_net: {
    '&:before': {
      borderColor: grey[500],
    },
    '&:after': {
      borderColor: lightBlue[500],
    },
    'width': '150px',
    'color': 'white',
  }, select_detail: {
    '&:before': {
      borderColor: grey[500],
    },
    '&:after': {
      borderColor: orange[500],
    },
    'width': '150px',
    'color': 'white',
  },
  disabled: {
    '&:before': {
      borderColor: grey[100],
    },
    '&:after': {
      borderColor: grey[100],
    },
    'width': '150px',
    'color': 'white',
  },
  button_cell: {
    'paddingLeft': '12px',
    'paddingRight': '12px',
    'color': 'white',
    'borderRadius': '50%',
    'background': orange[500],
    '&:hover': {
      background: orange[800],
    },
  }, button_net: {
    'paddingLeft': '12px',
    'paddingRight': '12px',
    'color': 'white',
    'borderRadius': '50%',
    'background': lightBlue[500],
    '&:hover': {
      background: lightBlue[800],
    },
  },
  icon: {
    fill: 'white',
  },
};

/**
 * Generating function for the individual styled buttons
 *
 * @param {object} props the current redux state properties
 * @return {object} rendered styled button
 */
function StyledButtonRaw(props) {
  const {classes, properties, icon, action, disabled} = props;
  return (
    <IconButton disabled={disabled} variant="outlined"
      className={
        properties.ui.detail ? classes.button_cell : classes.button_net
      }
      onClick={action}>
      {icon}
    </IconButton>
  );
}

StyledButtonRaw.propTypes = {
  properties: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

// const StyledSelect = withStyles(styles)(StyledSelectRaw);
export default withStyles(styles)(StyledButtonRaw);

