import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tf from '@tensorflow/tfjs';
import * as actions from '../../actions';
import {Model} from '../../tensorflow/Model';
import {Data} from '../../tensorflow/Data';

/**
 * This class handles the generation, compilation and training of the
 * used recurrent neural network
 */
class Training extends React.Component {
  /**
   * This method gets called when this component has been mounted and then
   * initializes all necessary objects used for the training steps
   */
  componentDidMount() {
    tf.setBackend('cpu');
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

  /**
   * Thi function is called if the state props have been changed and
   * then it checks if the training should be updated
   *
   * @param {object} prevProps the previous properties
   */
  componentDidUpdate(prevProps) {
    this.pause = 2000 - 2 * this.props.training.speed;
    if (this.props.training.running !== prevProps.training.running) {
      if (this.props.training.running === true) {
        const this_ = this;
        setTimeout(function() {
          this_.iterate();
        }, 500);
      }
    }
    if (this.props.training.reset) {
      this.reset();
      this.props.actions.updateTraining(
          {...this.props.training, reset: false}
      );
    }
    if (this.props.training.step) {
      this.props.actions.updateTraining(
          {...this.props.training, step: false}
      );
      this.iterate();
    }
  }

  // TODO: Create one new Network Object and send it to the state
  /**
   * This method will currently create a new model with all new network
   * values and also reset all saved data in the input, output and
   * prediction arrays/tensors
   */
  reset() {
    this.model.createComplexModel(this.data.values, 1, this.data.predictions,
        this.props.network.layers, this.props.network.layerSize);
    let network = this.props.network;
    const optimizer = tf.train.rmsprop(network.learningRate);
    this.model.model.compile({loss: 'meanSquaredError', optimizer: optimizer});
    this.model.model.summary();
    network = {...network, data: Array(5).fill({}), iteration: 0};
    for (let i = 0; i < 5; i++) {
      this.addDataToNetwork(network, [], [], [], [], [], []);
    }
    this.data.generateDataWith(0, this.props.training.dataType,
        this.props.training.dataVariant, this.props.training.noise);
    this.addDataToNetwork(network, this.data.chartDataInput,
        this.data.chartDataOutput, this.data.chartPredictionInput,
        this.data.train_sin_input, this.data.train_sin_next,
        this.data.prediction_sin_input);
    this.data.generateDataWith(1, this.props.training.dataType,
        this.props.training.dataVariant, this.props.training.noise);
    this.addDataToNetwork(network, this.data.chartDataInput,
        this.data.chartDataOutput, this.data.chartPredictionInput,
        this.data.train_sin_input, this.data.train_sin_next,
        this.data.prediction_sin_input);
    this.data.generateDataWith(2, this.props.training.dataType,
        this.props.training.dataVariant, this.props.training.noise);
    this.addDataToNetwork(network, this.data.chartDataInput,
        this.data.chartDataOutput, this.data.chartPredictionInput,
        this.data.train_sin_input, this.data.train_sin_next,
        this.data.prediction_sin_input);
    tf.tidy(() => {
      const prediction =
        this.model.model.predict(network.data[2].modelPrediction);
      const preds = Array.from(prediction.arraySync());
      this.addPredictionToNetwork(network, preds[0]);
    });
    this.props.actions.updateNetwork(network);
    this.model.model.fit(network.data[2].modelInput,
        network.data[2].modelOutput, {
          epochs: 1,
          batchSize: 1,
        }
    );
  }

  /**
   * This funtion takes all current generated data values used for training
   * the network and saves them in their right index position in the data
   * arrays in the global state object
   *
   * @param {object} oldNetwork the previous network object from the state
   * @param {number[]} chartInput the input values to be drawn on the screen
   * @param {number[]} chartOutput the output values to be drawn on the screen
   * @param {number[]} chartPrediction the prediction input
   *  values to be drawn on the screen
   * @param {array} modelInput the input values used for training the model
   * @param {array} modelOutput the output values used for training the model
   * @param {array} modelPrediction the prediction input values used to
   *   create a prediction for the training visualisation
   * @return {object} the new network object with the updated data
   */
  addDataToNetwork(oldNetwork, chartInput, chartOutput,
      chartPrediction, modelInput, modelOutput, modelPrediction) {
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

  /**
   * Adds the net prediction for the current time step to the global state
   *
   * @param {object} oldNetwork the previous network object from the state
   * @param {number[]} prediction the prediciton values predicted by
   *  the neural network
   * @return {object} the new network object with the updated data
   */
  addPredictionToNetwork(oldNetwork, prediction) {
    const data = oldNetwork.data;
    data[2].prediction = prediction;
    const network = {...oldNetwork, data: data};
    return network;
  }

  /**
   * This is the main function for training th neural network, the datasets
   * for the current time step are generated according to the user input
   * values, a prediction for the current input is computet and then the
   * network is trained by comparing predicted output to actual output
   */
  async iterate() {
    const this_ = this;
    let network = this.props.network;
    this.data.generateDataWith(network.iteration + 2,
        this.props.training.dataType, this.props.training.dataVariant,
        this.props.training.noise);
    this.addDataToNetwork(network, this.data.chartDataInput,
        this.data.chartDataOutput, this.data.chartPredictionInput,
        this.data.train_sin_input, this.data.train_sin_next,
        this.data.prediction_sin_input);
    tf.tidy(() => {
      const prediction =
        this.model.model.predict(network.data[2].modelPrediction);
      const preds = Array.from(prediction.arraySync());
      this.addPredictionToNetwork(network, preds[0]);
    });
    network = {...network, iteration: this.props.network.iteration + 1};
    this.props.actions.updateNetwork(network);
    this.model.model.fit(this.props.network.data[2].modelInput,
        this.props.network.data[2].modelOutput, {
          epochs: 1,
          batchSize: 1,
        }
    ).then(() => {
      if (this.props.training.running) {
        setTimeout(function() {
          this_.iterate();
        }, this.pause);
      }
    });
  }

  /**
   * An empty render function needed for react.js
   *
   * @return {object} null
   */
  render() {
    return null;
  }
}

Training.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

/**
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @param {object} ownProps - the properties of this component.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
    training: state.training,
  };
}
/**
 * Maps the actions to this property.
 *
 * @param {function} dispatch - the function that is used to call an action.
 * @return {object} - the actions that can be used in this component.
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Training);
