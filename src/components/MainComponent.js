import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions'
import { Grid, Paper } from '@material-ui/core';
import AlertSnack from './AlertSnack';
import Training from './training/Training';
import P5Wrapper from './p5Wrapper/P5Wrapper';

// Main component of the Application that displays all content dependant on the Controls State
class Main extends React.Component {

  // Render the Main Content and call other Elements
  render() {
    return (
      <Grid container direction='row' className='mainGrid'>
        <Grid item xs className='full'>
            <Paper className='value_paper' align='center'>
              <Training/>
            </Paper>
            <Paper className='visual_paper' align='center'>
              <P5Wrapper/>
            </Paper>
        </Grid>
        <AlertSnack />
      </Grid>
    );
  }
}

Main.propTypes = {
  prediction: PropTypes.number
}

function mapStateToProps(state, ownProps) {
  return {
    prediction: state.prediction
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
