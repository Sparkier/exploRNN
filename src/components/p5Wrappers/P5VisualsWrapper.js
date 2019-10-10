import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import inputSketch from "./sketches/inputSketch";
import networkSketch from "./sketches/networkSketch";
import outputSketch from "./sketches/outputSketch";
import { Grid } from '@material-ui/core';

import * as actions from '../../actions';

class P5VisualsWrapper extends React.Component {

    updateValues = true;

    constructor(){
      super()
      this.inputSketch = new window.p5(inputSketch, 'inputDiv')
      this.networkSketch = new window.p5(networkSketch, 'networkDiv')
      this.outputSketch = new window.p5(outputSketch, 'outputDiv')
      this.inputSketch.props = this.props
      this.networkSketch.props = this.props
      this.outputSketch.props = this.props
    }

    componentDidMount() {
        // this.sketch = new window.p5(sketch, 'p5sketch')
    }

    shouldComponentUpdate(nextProps) {
      this.props = nextProps
      this.inputSketch.props = nextProps
      this.networkSketch.props = nextProps
      this.outputSketch.props = nextProps
      this.inputSketch.updateMemory();
      this.networkSketch.updateMemory();
      this.outputSketch.updateMemory();
      return false
    }

    componentWillUnmount() {
      this.inputSketch.remove()
      this.networkSketch.remove()
      this.outputSketch.remove()
    }

  render() {
    return(
        <Grid container spacing ={0} direction="row" justify='space-evenly'>
            <Grid item xs={3}>
                <div id = "inputDiv"/>
            </Grid>
            <Grid item xs={6}>
                <div id = "networkDiv"/>
            </Grid>
            <Grid item xs={3}>
                <div id = "outputDiv"/>
            </Grid>
        </Grid>
    );
  }
}

P5VisualsWrapper.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
    training: state.training
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(P5VisualsWrapper);
