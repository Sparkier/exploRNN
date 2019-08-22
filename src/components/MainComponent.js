import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions'
import { Grid, Paper, Typography } from '@material-ui/core';
import AlertSnack from './AlertSnack';
import Training from './training/Training';
import MainChart from './charts/MainChart';
import P5Wrapper from './p5Wrapper/P5Wrapper';
import Input from '../components/controls/InputComponent'

// Main component of the Application that displays all content dependant on the Controls State
class Main extends React.Component {


  paddingHorizontalStyle = {
    paddingLeft: "50px",
    paddingRight: "50px",
  };
  paddingVerticalStyle = {
    paddingTop: "20px",
    paddingBottom: "20px",
  };
  // Render the Main Content and call other Elements
  render() {
    return (
      <Grid container direction='row' className='mainGrid' style={this.paddingHorizontalStyle}>
        <Grid item xs className='full'>
            <Input/>
            <Paper className='value_paper' align='center' style={this.paddingVerticalStyle}>
              <Training/>
            </Paper>
            <Grid container justify="center">
            <Paper className='visual_paper' align='center' style={this.paddingVerticalStyle}>
            <Typography>
              With D3
            </Typography>
              <MainChart/>
            </Paper>
            <Paper className='visual_paper' align='center' style={this.paddingVerticalStyle}>
            <Typography>
              With P5
            </Typography>
            <P5Wrapper/>
            </Paper>
            </Grid>
        </Grid>
        <AlertSnack />
      </Grid>
    );
  }
}

Main.propTypes = {
  prediction: PropTypes.array.isRequired
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
