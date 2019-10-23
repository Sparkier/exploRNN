import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tf from '@tensorflow/tfjs';

import * as actions from '../../actions';
import { Model } from '../../tensorflow/Model';
import { Data } from '../../tensorflow/Data';

class Training extends React.Component {

  componentDidMount() {
    tf.setBackend('cpu') // why so much better than webgl
    this.model = new Model();
    this.data = new Data();
    this.props.actions.updateTraining({
      ...this.props.training,
      values: this.data.values,
      predictions: this.data.predictions
    })
    this.pause = 1000;
    this.reset();
  }

  componentDidUpdate(prevProps) {
    if (this.props.training.running !== prevProps.training.running) {
      if (this.props.training.running === true) {
        const this_ = this;
        setTimeout (function() {this_.start()}, 500);
      } else {
        this.stop();
      }
    }
    if(this.props.training.reset) {
      this.reset();
      this.props.actions.updateTraining({...this.props.training, reset: false})
    }
    if(this.props.training.step) {
      this.props.actions.updateTraining({...this.props.training, step: false})
      this.iterate();
    }
    this.pause = 2000 - 2 * this.props.training.speed;
  }

  reset() {
    this.model.createComplexModel(this.data.values,1,this.data.predictions,this.props.network.layers,this.props.network.layerSize)
    console.log(this.props.network.learningRate)
    const optimizer = tf.train.rmsprop(this.props.network.learningRate);
    this.model.model.compile({loss: 'meanSquaredError', optimizer: optimizer});
    this.model.model.summary();
    this.props.actions.firstcall();
    this.props.actions.updateNetwork({...this.props.network, data: Array(5).fill({})});
    this.props.actions.updateNetwork({...this.props.network, iteration: 0});
    this.data.getSinDataFrom(this.props.network.iteration,  this.props.training.dataType, this.props.training.dataVariant);
    this.props.actions.addDataToNetwork(this.props.network, this.data.chartDataInput, this.data.chartDataOutput, this.data.chartPredictionInput,this.data.train_sin_input, this.data.train_sin_next,this.data.prediction_sin_input);
    this.data.getSinDataFrom(this.props.network.iteration + 1,  this.props.training.dataType, this.props.training.dataVariant);
    this.props.actions.addDataToNetwork(this.props.network, this.data.chartDataInput, this.data.chartDataOutput, this.data.chartPredictionInput,this.data.train_sin_input, this.data.train_sin_next,this.data.prediction_sin_input);
  }

  start = () => {
    // this.reset();
    this.iterate();
  }

  stop() {
    // this.props.actions.stopTraining(this.props.training);
  }

  async iterate() {
    const this_ = this;
    this.data.getSinDataFrom(this.props.network.iteration + 2, this.props.training.dataType, this.props.training.dataVariant);
    this.props.actions.addDataToNetwork(this.props.network, this.data.chartDataInput, this.data.chartDataOutput, this.data.chartPredictionInput,this.data.train_sin_input, this.data.train_sin_next,this.data.prediction_sin_input);
    this.props.actions.updateNetwork({...this.props.network, iteration: this.props.network.iteration + 1});
    // this.data.getSampleFromTestData(this.props.network.iteration + this.props.training.testOffset);
    tf.tidy(() => {
      const prediction = this.model.model.predict(this.props.network.data[2].modelPrediction);
      const preds = Array.from(prediction.arraySync());
      this.props.actions.addPredictionToNetwork(this.props.network, preds[0]);
    });
    this.model.model.fit(this.props.network.data[2].modelInput, this.props.network.data[2].modelOutput, {
      epochs: 1, 
      batchSize: 1
    }).then(() =>  {
      if(this.props.training.running){
        setTimeout (function() {this_.iterate()}, this.pause); 
      }
    })
  }

  render() {
    return null;
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
