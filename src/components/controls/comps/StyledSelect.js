import * as React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Select} from '@material-ui/core/';
import styles from '../../../styles/themedStyles';

/**
 * The generating function for the individual styled select components
 *
 * @param {object} props the parent properties
 * @return {object} rendered styled select element
 */
function StyledSelectRaw(props) {
  const {classes, ...other} = props;
  return (
    <div style={ props.main ?
      {display: 'inline-flex', marginRight: '12px', flexGrow: '1'} :
      {marginRight: '12px'}}
    >
      <Select className={classes.select} inputProps={{
        classes: {
          icon: classes.selectIcon,
        },
        color: 'white',
      }} {...other} />
    </div>
  );
}

StyledSelectRaw.propTypes = {
  properties: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyledSelectRaw);

