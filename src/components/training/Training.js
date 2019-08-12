import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tf from '@tensorflow/tfjs';

import * as actions from '../../actions';
import { Typography } from '@material-ui/core';
import { Model } from '../../tensorflow/Model';
import { Data } from '../../tensorflow/Data';

class Training extends React.Component {

  componentDidMount() {
    this.model = new Model();
    this.model.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    this.data = new Data();
  }

  componentDidUpdate(prevProps) {
    if (this.props.training !== prevProps.training) {
      if (this.props.training === true) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (this.props.iterations === 0) {
      this.reset();
    }
  }

  start = () => {
    this.iterate();
  }

  stop() {
    this.props.actions.stopTraining();
  }

  iterate() {
    var this_ = this;
    if (this.props.training) {
      tf.tidy(() => {
        const prediction = this.model.model.predict(tf.tensor2d([5], [1, 1]));
        this.props.actions.updatePrediction(prediction.dataSync()[0]);
        this.props.actions.updateIteration(this.props.iterations + 1);
        this.model.model.trainOnBatch(this.data.xs, this.data.ys);
      });
      setTimeout (function() { this_.iterate(); }, 100);
    }
  }

  reset() {
    // TODO: This does not reset the network. Needs to be fixed.
    tf.disposeVariables();
  }

  render() {
    return(
      <Typography align='center'>
        {this.props.prediction}
      </Typography>
    );
  }
}

Training.propTypes = {
  prediction: PropTypes.number.isRequired,
  training: PropTypes.bool.isRequired,
  iterations: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    prediction: state.prediction,
    training: state.training,
    iterations: state.iterations
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Training);
