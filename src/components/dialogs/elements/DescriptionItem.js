import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../../../styles/themedStyles';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

/**
 * ComplexDialog is used to explain components of the App.
 */
class DescriptionItem extends React.Component {
  /**
   * Renders the Onboarding Screen inside the App.
   *
   * @return {object} AlertSnack component to be rendered
   */
  render() {
    let className = '';
    if (this.props.descriptionItem.type === 'highlighted') {
      if (this.props.ui.detail) {
        className = this.props.classes.typoCvHighlighted;
      } else {
        className = this.props.classes.typoOvHighlighted;
      }
    }
    return (
      <Typography display='inline' className={className}>
        {this.props.descriptionItem.text}
      </Typography>
    );
  }
}

// Prop Types holding all the Preferences
DescriptionItem.propTypes = {
  ui: PropTypes.object.isRequired,
  descriptionItem: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

/**
 * Map the State to the Properties of this Component
 *
 * @param {object} state the state that is to be mapped to this component
 * @param {object} _ the props of this component
 * @return {object} the props that this component holds
 */
function mapStateToProps(state, _) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(DescriptionItem));
