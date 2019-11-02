import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tf from '@tensorflow/tfjs';

import * as actions from '../../actions';
import {Model} from '../../tensorflow/Model';
import {Data} from '../../tensorflow/Data';

class Training extends React.Component {
  componentDidMount() {
    tf.setBackend('cpu'); // why so much better than webgl
    this.model = new Model();
    this.data = new Data();
    this.props.actions.updateTraining({
      ...this.props.training,
      values: this.data.values,
      predictions: this.data.predictions,
    });
    this.pause = 1000;
    this.reset();
  }

  componentDidUpdate(prevProps) {
    this.pause = 2000 - 2 * this.props.training.speed;
    if (this.props.training.running !== prevProps.training.running) {
      if (this.props.training.running === true) {
        const this_ = this;
        setTimeout(function() {
          this_.start();
        }, 500);
      } else {
        this.stop();
      }
    }
    if (this.props.training.reset) {
      this.reset();
      this.props.actions.updateTraining({...this.props.training, reset: false});
    }
    if (this.props.training.step) {
      this.props.actions.updateTraining({...this.props.training, step: false});
      this.iterate();
    }
  }

  // TODO: Create one new Network Object and send it to the state
  reset() {
    this.model.createComplexModel(this.data.values, 1, this.data.predictions, this.props.network.layers, this.props.network.layerSize);
    let network = this.props.network;
    console.log(network.learningRate);
    const optimizer = tf.train.rmsprop(network.learningRate);
    this.model.model.compile({loss: 'meanSquaredError', optimizer: optimizer});
    this.model.model.summary();
    network = {...network, data: Array(5).fill({}), iteration: 0};
    for (let i = 0; i < 5; i++) {
      this.addDataToNetwork(network, [], [], [], [], [], []);
    }
    this.data.getSinDataFrom(0, this.props.training.dataType, this.props.training.dataVariant, this.props.training.noise);
    this.addDataToNetwork(network, this.data.chartDataInput, this.data.chartDataOutput, this.data.chartPredictionInput, this.data.train_sin_input, this.data.train_sin_next, this.data.prediction_sin_input);
    this.data.getSinDataFrom(1, this.props.training.dataType, this.props.training.dataVariant, this.props.training.noise);
    this.addDataToNetwork(network, this.data.chartDataInput, this.data.chartDataOutput, this.data.chartPredictionInput, this.data.train_sin_input, this.data.train_sin_next, this.data.prediction_sin_input);
    this.data.getSinDataFrom(2, this.props.training.dataType, this.props.training.dataVariant, this.props.training.noise);
    this.addDataToNetwork(network, this.data.chartDataInput, this.data.chartDataOutput, this.data.chartPredictionInput, this.data.train_sin_input, this.data.train_sin_next, this.data.prediction_sin_input);
    tf.tidy(() => {
      const prediction = this.model.model.predict(network.data[2].modelPrediction);
      const preds = Array.from(prediction.arraySync());
      this.addPredictionToNetwork(network, preds[0]);
    });
    this.props.actions.updateNetwork(network);
    this.model.model.fit(network.data[2].modelInput, network.data[2].modelOutput, {
      epochs: 1,
      batchSize: 1,
    });
  }


  addDataToNetwork(oldNetwork, chartInput, chartOutput, chartPrediction, modelInput, modelOutput, modelPrediction) {
    const data = oldNetwork.data;
    data.shift();
    data.push({
      chartInput: chartInput,
      chartOutput: chartOutput,
      chartPrediction: chartPrediction,
      modelInput: modelInput,
      modelOutput: modelOutput,
      modelPrediction: modelPrediction,
      prediction: [],
    });
    const network = {...oldNetwork, data: data};
    return network;
  }

  addPredictionToNetwork(oldNetwork, prediction) {
    const data = oldNetwork.data;
    data[2].prediction = prediction;
    const network = {...oldNetwork, data: data};
    return network;
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
    // this.data.getSampleFromTest7Data(this.props.network.iteration + this.props.training.testOffset);
    let network = this.props.network;
    this.data.getSinDataFrom(network.iteration + 2, this.props.training.dataType, this.props.training.dataVariant, this.props.training.noise);
    this.addDataToNetwork(network, this.data.chartDataInput, this.data.chartDataOutput, this.data.chartPredictionInput, this.data.train_sin_input, this.data.train_sin_next, this.data.prediction_sin_input);
    tf.tidy(() => {
      const prediction = this.model.model.predict(network.data[2].modelPrediction);
      const preds = Array.from(prediction.arraySync());
      this.addPredictionToNetwork(network, preds[0]);
    });
    network = {...network, iteration: this.props.network.iteration + 1};
    console.log(network);
    this.props.actions.updateNetwork(network); // Synchronise data and prediction
    this.model.model.fit(this.props.network.data[2].modelInput, this.props.network.data[2].modelOutput, {
      epochs: 1,
      batchSize: 1,
    }).then(() => {
      if (this.props.training.running) {
        setTimeout(function() {
          this_.iterate();
        }, this.pause);
      }
    });
  }

  render() {
    return null;
  }
}

Training.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
    training: state.training
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Training);
