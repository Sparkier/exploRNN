import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import sketch from "./sketches/sinFuncSketch";

import * as actions from '../../actions';

class P5Wrapper extends React.Component {

     updateValues = true;

    componentDidMount() {
        // this.sketch = new window.p5(sketch, 'p5sketch')
        this.sketch = new window.p5(sketch, 'p5sketch')
        this.sketch.props = this.props
    }

    shouldComponentUpdate(nextProps) {
        this.sketch.props = nextProps
        if(this.props.prediction !== nextProps.prediction)
          this.sketch.updateMemory();
        return false
    }

    componentWillUnmount() {
        this.sketch.remove()
    }
  
  render() {
    return(
        <div id = "p5sketch"/>
    );
  }
}

P5Wrapper.propTypes = {
  prediction: PropTypes.array.isRequired,
  iteration: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    prediction: state.prediction,
    iteration: state.iteration
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(P5Wrapper);
