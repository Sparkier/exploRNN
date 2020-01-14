import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions';
import styles from '../../styles/themedStyles';
import InputPanel from './panels/InputPanel';
import ControlPanel from './panels/ControlPanel';
import OutputPanel from './panels/OutputPanel';
import DescriptionPanel from './panels/DescriptionPanel';
import ValuePanel from './panels/ValuePanel';
/**
 * The current Component holding all the input elements to change the Network
 * for Training.
 */
class Input extends React.Component {
  /**
   * The render function for this react component
   *
   * @return {object} the rendered component
   */
  render() {
    return (
      <div id="valueDiv" className={this.props.classes.panelWrapper}
        align="center"
      >
        <Grid container
          spacing={3}
          justify='space-evenly'>
          {
            this.props.ui.detail ?
            <DescriptionPanel/>:
            <InputPanel/>
          }
          {
            <ControlPanel/>
          }
          {
            this.props.ui.detail ?
            <ValuePanel/>:
            <OutputPanel/>
          }
        </Grid>
      </div>
    );
  }
}


// Controls state of the Application
Input.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

/**
 * Mapping the Controls state to the Props of this Class
 *
 * @param {object} state ...
 * @param {object} ownProps ...
 * @return {object} ...
 */
function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
    training: state.training,
    ui: state.ui,
  };
}

/**
 * Map the Actions called when Controls are used to the Props of this Class
 *
 * @param {object} dispatch ...
 * @return {object} ...
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Input)
);
