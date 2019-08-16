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
    this.data = new Data();
    this.reset();
  }

  componentDidUpdate(prevProps) {
    if (this.props.training !== prevProps.training) {
      if (this.props.training === true) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  reset() {
    this.model.createComplexModel(5,10,10,1,this.props.layerSize)
    console.log(this.props.learningRate)
    const optimizer = tf.train.rmsprop(this.props.learningRate);
    this.model.model.compile({loss: 'meanSquaredError', optimizer: optimizer});
    this.props.actions.firstcall();
  }

  start = () => {
    if(this.props.firstcall) {
      this.reset();
    }
    this.iterate();
  }

  stop() {
    this.props.actions.stopTraining();
  }

  iterate() {
    const this_ = this;
    if(!this.props.training) {
      return;   
    }
    tf.tidy(() => {
      this.props.actions.updateIteration(this.props.iteration + 1);
      this.model.model.fit(this.data.training_input, this.data.training_label, {
        epochs: 1, 
        batchSize: 10,
        callbacks: {
          onTrainEnd: (epoch, logs) => {
            const prediction = this.model.model.predict(this.data.test_input);
            const preds = Array.from(prediction.arraySync());
            console.log('current prediction:', preds)
            this.props.actions.updatePrediction(preds[0]);
            setTimeout (function() {this_.iterate()}, 50); 
          },
        }
      });
    });
  }

  render() {
    return(
      <Typography align='center'>
        What comes next in the integer series 1,2,3,4,5,... ?
      </Typography>
    );
  }
}

Training.propTypes = {
  prediction: PropTypes.array.isRequired,
  training: PropTypes.bool.isRequired,
  iteration: PropTypes.number.isRequired,
  firstcall: PropTypes.bool.isRequired,
  layerSize: PropTypes.number.isRequired,
  learningRate: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    prediction: state.prediction,
    training: state.training,
    iteration: state.iteration,
    firstcall: state.firstcall,
    layerSize: state.layerSize,
    learningRate: state.learningRate
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Training);
