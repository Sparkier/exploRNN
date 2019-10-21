import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import networkSketch from "./sketches/networkSketch";
import { Grid } from '@material-ui/core';

import * as actions from '../../actions';

class P5VisualsWrapper extends React.Component {

    updateValues = true;

    constructor(){
      super()
      this.networkSketch = new window.p5(networkSketch, 'networkDiv')
      this.networkSketch.props = this.props
    }

    componentDidMount() {
        // this.sketch = new window.p5(sketch, 'p5sketch')
    }

    shouldComponentUpdate(nextProps) {
      this.props = nextProps
      this.networkSketch.props = nextProps
      this.networkSketch.updateMemory();
      return false
    }

    componentWillUnmount() {
      this.networkSketch.remove()
    }

  render() {
    return(
        <Grid container spacing ={0} direction="row" justify='center'>
            
            <Grid item xs={10}>
                <div id = "networkDiv"/>
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
