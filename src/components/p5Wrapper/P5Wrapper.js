import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import sketch from "./sketches/sketch.js";

import * as actions from '../../actions';

class P5Wrapper extends React.Component {

    componentDidMount() {
        this.sketch = new window.p5(sketch, 'p5sketch')
        this.sketch.props = this.props
    }

    shouldComponentUpdate(nextProps) {
        this.sketch.props = nextProps
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
  prediction: PropTypes.number.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    prediction: state.prediction,
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(P5Wrapper);
