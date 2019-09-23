import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions'
import { Grid, Paper, Typography } from '@material-ui/core';
import MainChart from './charts/MainChart';

// Main component of the Application that displays all content dependant on the Controls State
class InputSide extends React.Component {

  render() {
    return (
        <Paper>
        <Grid container direction = 'column' justify='space-between'>
            <Grid item xs>
                <MainChart/>
            </Grid>
            <Grid item xs>
                <MainChart/>
            </Grid>
            <Grid item xs>
                <MainChart/>  
            </Grid>
        </Grid>
        </Paper>
    );
  }
}

InputSide.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(InputSide);
