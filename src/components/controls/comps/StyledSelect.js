import * as React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import styles from '../../../styles/themedStyles';

/**
 *
 * @param {object} props
 * @return {component}
 */
function StyledSelectRaw(props) {
  const {classes, ...other} = props;
  return (
    <div style={{display: 'inline-flex', marginRight: '12px', flexGrow: '1'}}>
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
  icon: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

// const StyledSelect = withStyles(styles)(StyledSelectRaw);
export default withStyles(styles)(StyledSelectRaw);

