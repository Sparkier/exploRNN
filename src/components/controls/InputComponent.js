import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {grey} from '@material-ui/core/colors';
import {Grid} from '@material-ui/core';
import InputPanel from './panels/InputPanel';
import ControlPanel from './panels/ControlPanel';
import OutputPanel from './panels/OutputPanel';
import * as actions from '../../actions';
import DescriptionPanel from './panels/DescriptionPanel';
import ValuePanel from './panels/ValuePanel';
/**
 * The current Component holding all the input elements to change the Network
 * for Training.
 */
class Input extends React.Component {
  /**
   * The constructor for the Input class
   */
  constructor() {
    super();
    this.fontSize = 20;
    this.data = ['saw', 'sin', 'sqr', 'sinc'];
  }

  // Some styles for better looks, TODO: clean up
  simplePaddingStyle = {
    width: '100%',
    background: '#00000000',
  };

  myPadding = {
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
    background: grey[800],
  };

  mySecondPadding = {
    background: grey[100],
  };

  buttonPadding = {
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
  }

  sliderPaddingStyle = {
    ...this.buttonPadding,
    width: '80%',
  };

  /**
   * The render function for this react component
   *
   * @return {object} the rendered component
   */
  render() {
    return (
      <div id="valueDiv" align="center">
        <Grid container
          spacing={3}
          style={this.simplePaddingStyle}
          justify='center'>
          {
            <ControlPanel/>
          }
          {
            this.props.ui.detail ?
            <DescriptionPanel/>:
            <InputPanel/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Input);
