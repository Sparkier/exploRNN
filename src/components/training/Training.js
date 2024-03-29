import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions';

import worker from './worker.js';
import TrainingWorker from './TrainingWorker';
import {TextData} from '../../helpers/TextData';
import * as tf from '@tensorflow/tfjs';

import lipsum from './lipsum.txt';
import abab from './abab.txt';

/**
 * This class handles the generation, compilation and training of the
 * used recurrent neural network
 */
class Training extends React.Component {
  /**
   * This method gets called when this component has been mounted and then
   * initializes all necessary objects used for the training steps
   */
  async componentDidMount() {
    // Get and init the worker that is used for async training
    this.worker = new TrainingWorker(worker);
    this.worker.onmessage = this.onmessage;
    this.worker.postMessage({
      cmd: 'init',
      params: {
        type: this.props.training.dataTypes,
        noise: this.props.training.noise,
        size: this.props.training.dataSetSize,
        stepSize: this.props.training.stepSize,
      },
    });
    this.reset();
  }

  /**
   * Handles messages from the worker thread
   *
   * @param {event} e the event that sends the message
   */
  onmessage = (e) => {
    const buff = e.data.values;
    let network = this.props.network;
    switch (e.data.cmd) {
      case 'init': // worker has been initialized
        this.props.actions.updateTraining({
          ...this.props.training,
          values: buff.values,
          predictions: buff.predictions,
        });
        break;
      case 'fit': // worker has trained the network for one epoch
        if (this.props.training.running) {
          this.iterate(true);
        }
        this.props.actions.updateTraining({
          ...this.props.training,
          workerReady: true,
        });
        break;
      case 'data': // worker has generated a new data set
        network = this.addDataToNetwork(this.props.network, buff.chartIn,
            buff.chartOut, buff.chartPred);
        this.props.actions.updateNetwork(network);
        this.props.actions.updateTraining({
          ...this.props.training,
          workerReady: true,
          values: buff.values,
          predictions: buff.predictions,
        });
        break;
      case 'pred': // worker has calculated prediction for the current test data
        network = this.addPredictionToNetwork(this.props.network, buff.pred);
        this.props.actions.updateNetwork(network);
        break;
      case 'modelSet':
        if (this.props.ui.detail) {
          this.props.actions.updateUI({...this.props.ui, animStep: true});
        } else {
          this.props.actions.updateTraining({...this.props.training,
            step: true});
        }
        break;
      default:
        break;
    }
  };

  /**
   * This function is called if the state props have been changed and
   * then it checks if the training should be updated
   *
   * @param {object} prevProps the previous properties
   */
  componentDidUpdate(prevProps) {
    const this_ = this;
    if (this.props.training.running && (this.props.ui.ready ||
      (this.props.training.running !== prevProps.training.running))) {
      // the app is ready for a new fit call in the current training phase, or
      // a new training phase has started
      setTimeout(function() {
        this_.iterate(true);
      }, 100);
    }
    if (this.props.training.reset) {
      // the network/training values shall be regenerated with current values
      this.reset();
      this.props.actions.updateTraining(
          {...this.props.training, reset: false, running: false,
            workerReady: false}
      );
      this.props.actions.updateUI(
          {
            ...this.props.ui,
            reset: true,
            ready: true,
            running: false,
            animStep: false,
            netAnim: false,
            lstmStep: 0,
            trainingStep: 0,
            state: [true, false, false],
          }
      );
    }
    if (this.props.training.step) {
      // training shall continue for one epoch
      this.iterate(false).then(() => {
        this.props.actions.updateUI(
            {
              ...this.props.ui,
              reset: true,
              ready: true,
              running: false,
              animStep: false,
              netAnim: false,
              lstmStep: 0,
              trainingStep: 0,
              state: [true, false, false],
            }
        );
        this.props.actions.updateTraining(
            {...this.props.training, reset: false, step: false, running: false,
              workerReady: !this.props.ui.ready,
            }
        );
      });
    }
    // If in detail view, and no completed epoch, advance for one to get data
    if (this.props.ui.detail && this.props.network.iteration === 0) {
      this_.iterate(false);
    }
    if (this.props.pretrained.model !== '') {
      this.setToModel();
      this.props.actions.updatePretrained({...this.props.pretrained,
        model: ''});
    }
  }

  /**
   * Reseet the model depending on the Input Type
   */
  reset() {
    if (this.props.training.inputType === 'Text Data') {
      let textSample = abab;
      if (this.props.training.dataTypes[0] === 'lorem') {
        textSample = lipsum;
      }
      fetch(textSample)
          .then((r) => r.text())
          .then((text) => {
            const textData = new TextData(text);
            this.props.actions.updateTextData(textData);
            this.worker.postMessage({
              cmd: 'text',
              params: {
                textData: textData,
              },
            });
            this.resetModel();
          });
    } else {
      this.resetModel();
    }
  }

  /**
   * Set the model to low Learning Rate
   */
  setToModel() {
    const modelPath = `data/models/${this.props.pretrained.model}/model.json`;
    tf.loadLayersModel(modelPath).then((model) => {
      model.save('indexeddb://currentModel').then(() => {
        this.worker.postMessage({
          cmd: 'setModel',
          params: {
            learningRate: this.props.network.learningRate,
            training: this.props.training,
          },
        });
      });
    });
  }

  /**
   * This method will currently create a new model with all new network
   * values and also reset all saved data in the input, output and
   * prediction arrays/tensors
   */
  resetModel() {
    // Generate the model used for training
    this.worker.postMessage({
      cmd: 'model',
      params: {
        layers: this.props.network.layers,
        cells: this.props.network.layerSize,
        learningRate: this.props.network.learningRate,
        training: this.props.training,
      },
    });
    this.worker.postMessage({
      cmd: 'data',
      params: {
        type: this.props.training.dataTypes,
        inputType: this.props.training.inputType,
        noise: this.props.training.noise,
        size: this.props.training.dataSetSize,
        stepSize: this.props.training.stepSize,
      },
    });
    this.worker.postMessage({
      cmd: 'pred',
      params: {
        type: this.props.training.inputType,
      },
    });
    let network = this.props.network;
    const training = {...this.props.training, workerReady: false};
    // reset the datasets and create the new data for the upcoming training
    network = {...network, iteration: 0};
    network = this.addDataToNetwork(network, [], [], []);
    network = this.addPredictionToNetwork(network, []);
    this.props.actions.updateNetwork(network);
    this.props.actions.updateUI({...this.props.ui, data: network.data});
    this.props.actions.updateTraining(training);
  }

  /**
   * This function takes all current generated data values used for training
   * the network and saves them in the global state object
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
    const data = {
      chartInput: chartInput,
      chartOutput: chartOutput,
      chartPrediction: chartPrediction,
    };
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
    data.prediction = prediction;
    const network = {...oldNetwork, data: data};
    return network;
  }

  /**
   * This is the main function for training the neural network, the datasets
   * for the current time step are generated according to the user input
   * values, a prediction for the current input is computed and then the
   * network is trained by comparing predicted output to actual output
   *
   * @param {boolean} animate true, if the output should be animated
   */
  async iterate(animate) {
    let network = this.props.network;
    if (this.props.ui.ready) {
      this.props.actions.updateUI({
        ...this.props.ui,
        ready: !animate,
        running: animate,
        data: network.data,
      });
    } else {
      return;
    }
    this.props.actions.updateTraining(
        {...this.props.training, step: false, ready: false, workerReady: false}
    );
    // Prepare the data
    this.worker.postMessage({
      cmd: 'data',
      params: {
        type: this.props.training.dataTypes,
        inputType: this.props.training.inputType,
        noise: this.props.training.noise,
        size: this.props.training.dataSetSize,
        stepSize: this.props.training.stepSize,
      },
    });
    this.worker.postMessage({
      cmd: 'pred',
      params: {
        type: this.props.training.inputType,
      },
    });
    this.worker.postMessage({
      cmd: 'fit',
      params: {
        epochs: 1,
        batchSize: this.props.training.batchSize,
        reset: false,
        learningRate: this.props.network.learningRate,
      },
    });
    network = {...network, iteration: this.props.network.iteration + 1};
    this.props.actions.updateNetwork(network);
  }

  /**
   * An empty render function needed for react
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
  pretrained: PropTypes.object.isRequired,
};

/**
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state) {
  return {
    network: state.network,
    training: state.training,
    ui: state.ui,
    pretrained: state.pretrained,
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
