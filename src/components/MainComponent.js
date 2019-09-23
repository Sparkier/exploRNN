import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions'
import { Grid, Paper, Typography } from '@material-ui/core';
import AlertSnack from './AlertSnack';
import Training from './training/Training';
import P5VisualsWrapper from './p5Wrappers/P5VisualsWrapper'
import Input from '../components/controls/InputComponent'

// Main component of the Application that displays all content dependant on the Controls State
class Main extends React.Component {

  // Render the Main Content and call other Elements
  render() {
    return (
      <Grid container direction='row' className='mainGrid'>
        <Grid item xs className='full'>
            <Input/>
            <Training/>
            <Paper square={true}>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Typography>Input</Typography>
                <Typography>Training</Typography>
                <Typography>Output</Typography>
              </Grid>
            </Paper>
            <P5VisualsWrapper/>
          </Grid>
        <AlertSnack />
      </Grid>
    );
  }
}

Main.propTypes = {
  network: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    network: state.network
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
