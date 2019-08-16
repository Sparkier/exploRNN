import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions';

class Input extends React.Component {

    handleChange = (event) => {
        this.props.actions.updateLayerSize(Number(event.target.value));
    }

    handleSubmit = (event) => {
        //this.props.actions.updateLayerSize(event.target.value);
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
            Size of hidden layer
            <select value={this.props.layerSize} onChange={this.handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
            </label>
        </form>
        );
    }
}

// Controls state of the Application
Input.propTypes = {
    training: PropTypes.bool,
    iteration: PropTypes.number,
    layerSize: PropTypes.number
  };
  
  // Mapping the Controls state to the Props of this Class
  function mapStateToProps(state, ownProps) {
    return {
      training: state.training,
      iteration: state.iteration,
      layerSize: state.layerSize
    };
  }
  
  // Map the Actions called when Controls are used to the Props of this Class  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Input);
  