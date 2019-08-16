import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';

import * as actions from '../../actions';

class Input extends React.Component {

    handleChange = (event) => {
        this.props.actions.updateLayerSize(Number(event.target.value));
    }

    handleSubmit = (event) => {
        //this.props.actions.updateLayerSize(event.target.value);
    }

    handleSliderChange = (event, value) => {
        this.props.actions.updateLearningRate(value);
    }

    simplePaddingStyle = {
        paddingTop: "20px",
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}  style={this.simplePaddingStyle}>
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
                <Typography  style={this.simplePaddingStyle}>
                    Learning Rate:
                </Typography>
                <Slider
                    style={this.simplePaddingStyle}
                    defaultValue={this.props.learningRate}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={0.01}
                    marks
                    min={0.01}
                    max={0.5} onChange={this.handleSliderChange}
                />
            </div>
        );
    }
}

// Controls state of the Application
Input.propTypes = {
    layerSize: PropTypes.number,
    learningRate: PropTypes.number
  };
  
  // Mapping the Controls state to the Props of this Class
  function mapStateToProps(state, ownProps) {
    return {
      layerSize: state.layerSize,
      learningRate: state.learningRate
    };
  }
  
  // Map the Actions called when Controls are used to the Props of this Class  
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Input);
  