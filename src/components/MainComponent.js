import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {Grid} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import styles from '../styles/themedStyles';
import * as actions from '../actions';
import Training from './training/Training';
import VisualWrapper from './visualisation/VisualWrapper';
import BottomPanel from './controls/BottomComponent';
import AlertSnack from './AlertSnack';

/**
 * Main component of the Application that displays all content dependant on the
 * Controls State.
 */
class Main extends React.Component {
  /**
   * Render the Main Content and call other Elements.
   *
   * @return {object} - the main component to be rendered.
   */
  render() {
    return (
      <Grid container className='mainGrid' style={{height: '100%'}}>
        <Grid item className={this.props.classes.fullWidth} id='netArea'>
          <Training/>
          <VisualWrapper/>
        </Grid>
        <Grid item className={this.props.classes.panelWrapper}>
          <Divider/>
          <BottomPanel/>
        </Grid>
        <AlertSnack />
      </Grid>
    );
  }
}

Main.propTypes = {
  network: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

/**
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @param {object} ownProps - the properties of this component.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
  };
}

/**
 * Maps the actions to this property.
 *
 * @param {function} dispatch - the function that is used to call an action.
 * @return {object} - the actions that can be used in this component.
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Main)
);
