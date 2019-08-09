import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import sketch from "./sketch.js";

import * as actions from '../../actions';

class Visual extends React.Component {

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

Visual.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Visual);
