import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tf from '@tensorflow/tfjs';
import * as actions from '../../actions';
import worker from './worker.js';
import TrainingWorker from './TrainingWorker';

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
    this.worker = new TrainingWorker(worker);
    this.worker.onmessage = this.onmessage;
    console.log(window.location.href);
    this.worker.postMessage(
        {cmd: 'init'}
    );
    this.pause = 1000;
    this.reset();
    console.log('MY NETWORK', this.props.network);
  }

  /**
   * sfsef
   *
   * @param {event} e efsf
   */
  onmessage = (e) => {
    const this_ = this;
    const buff = e.data.values;
    switch (e.data.cmd) {
      case 'init':
        this.props.actions.updateTraining({
          ...this.props.training,
          values: buff.values,
          predictions: buff.predictions,
        });
        this.props.actions.updateUI({...this.props.ui});
        break;
      case 'fit':
        if (this.props.training.running) {
          setTimeout(function() {
            this_.iterate();
          }, this.pause);
        }
        break;
      case 'data':
        this.addDataToNetwork(this.props.network, buff.chartIn, buff.chartOut,
            buff.chartPred);
        break;
      case 'pred':
        this.addPredictionToNetwork(this.props.network, buff.pred);
        break;
      default:
    }
    console.log(e);
    console.log('MY NETWORK', this.props.network);
  };


  /**
   * This function is called if the state props have been changed and
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
    this.worker.postMessage(
        {
          cmd: 'model',
          params: {
            layers: this.props.network.layers,
            cells: this.props.network.layerSize,
            learningRate: this.props.network.learningRate,
          },
        });

    let network = this.props.network;
    // this.model.model.summary();
    // reset the datasets and create the new data for the upcoming training
    network = {...network, data: Array(5).fill({}), iteration: 0};
    for (let i = 0; i < 5; i++) {
      this.addDataToNetwork(network, [], [], []);
    }
    for (let i = 0; i < 3; i++) {
      this.worker.postMessage(
          {
            cmd: 'data',
            params: {
              start: i,
              type: this.props.training.dataType,
              var: this.props.training.dataVariant,
              noise: this.props.training.noise,
              size: this.props.training.dataSetSize,
            },
          }
      );
    }
    this.worker.postMessage(
        {
          cmd: 'pred',
        });
    this.worker.postMessage(
        {
          cmd: 'fit',
          params: {
            epochs: 1,
            batchSize: this.props.training.batchSize,
          },
        });
    // this.props.actions.updateNetwork(network);
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
   * @return {object} the new network object with the updated data
   */
  addDataToNetwork(oldNetwork, chartInput, chartOutput,
      chartPrediction) {
    const data = oldNetwork.data;
    data.shift();
    data.push({
      chartInput: chartInput,
      chartOutput: chartOutput,
      chartPrediction: chartPrediction,
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
   * This is the main function for training the neural network, the datasets
   * for the current time step are generated according to the user input
   * values, a prediction for the current input is computed and then the
   * network is trained by comparing predicted output to actual output
   */
  async iterate() {
    let network = this.props.network;
    // Prepare the data
    this.worker.postMessage(
        {
          cmd: 'data',
          params: {
            start: this.props.training.iteration,
            type: this.props.training.dataType,
            var: this.props.training.dataVariant,
            noise: this.props.training.noise,
            size: this.props.training.dataSetSize,
          },
        }
    );
    this.worker.postMessage(
        {
          cmd: 'pred',
        });
    network = {...network, iteration: this.props.network.iteration + 1};
    this.props.actions.updateNetwork(network);
    this.worker.postMessage(
        {
          cmd: 'fit',
          params: {
            epochs: 1,
            batchSize: this.props.training.batchSize,
          },
        });
  }

  /**
   * This function creates a continous array of single prediction values
   * for the current test input values. The predicted values are being added
   * to the values so that the model needs to predict the function with its
   * own previous predictions
   *
   * @param {number[]} testInput the input values for testing the model
   * @return {number[]} the predicition array
   */
  createPrediction(testInput) {
    const output = [];
    let preds;
    let prediction;
    let inputBuff;
    const newInput = [];
    for (const step of testInput) {
      newInput.push([step[0]]);
    }
    for (let i = 0; i < this.data.values; i++) {
      inputBuff = tf.tensor3d([newInput]);
      prediction =
        this.model.model.predict(inputBuff);
      preds = Array.from(prediction.arraySync());
      output.push(preds[0]);
      newInput.shift();
      newInput.push([preds[0]]);
    }
    return output;
  }

  /**
   * An empty render function needed for react.js (?)
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
  ui: PropTypes.object.isRequired,
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
    ui: state.ui,
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
