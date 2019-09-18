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
    this.props.actions.updateTraining({
      ...this.props.training,
      values: this.data.values,
      predictions: this.data.predictions
    })
    this.reset();
  }

  componentDidUpdate(prevProps) {
    if (this.props.training.running !== prevProps.training.running) {
      if (this.props.training.running === true) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  reset() {
    this.model.createComplexModel(this.data.values,1,this.data.predictions,1,this.props.network.layerSize)
    console.log(this.props.network.learningRate)
    const optimizer = tf.train.rmsprop(this.props.network.learningRate);
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
    this.props.actions.stopTraining(this.props.training);
  }

  async iterate() {
    const this_ = this;
    if(!this.props.training.running) {
      return;   
    }
    console.log('TEST', this.props.training, this.props.network);
    this.data.getSinDataFrom(this.props.network.iteration);
    this.model.model.fit(this.data.train_sin_input, this.data.train_sin_next, {
      epochs: 1, 
      batchSize: 1
    }).then(() =>  {
      this.props.actions.updateNetwork({...this.props.network, iteration: this.props.network.iteration + 1});
      tf.tidy(() => {
        this.data.getSampleFromTestData(this.props.network.iteration + this.props.training.testOffset);
        const prediction = this.model.model.predict(this.data.current_test_sin);
        const preds = Array.from(prediction.arraySync());
        console.log('current prediction:', preds)
        this.props.actions.updateNetwork({...this.props.network, prediction: preds[0], input: this.data.chartDataInput, output: this.data.chartDataOutput});
        console.log(this.props.network)
      });
      setTimeout (function() {this_.iterate()}, 5); 
    })
  }

  render() {
    return(
      <Typography align='center'>
        Watch a Neural Network learn how to draw a sin(x) plot:
      </Typography>
    );
  }
}

Training.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired,
  firstcall: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
    training: state.training,
    firstcall: state.firstcall
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Training);
