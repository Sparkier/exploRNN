import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import sketch from "./sketches/SketchNetworkVis";

import * as actions from '../../actions';

class WrapperNetworkVis extends React.Component {

     updateValues = true;

    componentDidMount() {
        // this.sketch = new window.p5(sketch, 'p5sketch')
        this.sketch = new window.p5(sketch, 'networkVisDiv')
        this.sketch.props = this.props
    }

    shouldComponentUpdate(nextProps) {
        this.sketch.props = nextProps
        if(this.props.network.prediction !== nextProps.network.prediction)
          this.sketch.updateMemory();
        return false
    }

    componentWillUnmount() {
        this.sketch.remove()
    }
  
  render() {
    return(
        <div id = "networkVisDiv"/>
    );
  }
}

WrapperNetworkVis.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(WrapperNetworkVis);
