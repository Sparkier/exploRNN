import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
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
    this.worker.postMessage(
        {cmd: 'init'}
    );
    this.pause = 1000;
    this.reset();
  }

  /**
   * Handles messages from the worker thread
   *
   * @param {event} e the event that sends the message
   */
  onmessage = (e) => {
    const this_ = this;
    const buff = e.data.values;
    let network = this.props.network;
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
            this_.iterate(true);
          }, this.pause);
        } else if (e.data.reset) {
          this.iterate(false);
        }
        this.props.actions.updateTraining({
          ...this.props.training,
          workerReady: true,
        });
        break;
      case 'data':
        network = this.addDataToNetwork(this.props.network, buff.chartIn,
            buff.chartOut, buff.chartPred);
        this.props.actions.updateNetwork(network);
        break;
      case 'pred':
        network = this.addPredictionToNetwork(this.props.network, buff.pred);
        this.props.actions.updateNetwork(network);
        break;
      default:
    }
  };


  /**
   * This function is called if the state props have been changed and
   * then it checks if the training should be updated
   *
   * @param {object} prevProps the previous properties
   */
  componentDidUpdate(prevProps) {
    this.pause = 2000 - 2 * this.props.training.speed;
    const this_ = this;
    if (this.props.training.running !== prevProps.training.running) {
      if (this.props.training.running) {
        setTimeout(function() {
          this_.iterate(true);
        }, 100);
      }
    } else if (this.props.training.running && this.props.ui.ready) {
      setTimeout(function() {
        this_.iterate(true);
      }, 100);
    }
    if (this.props.training.reset) {
      this.reset();
      this.props.actions.updateTraining(
          {...this.props.training, reset: false, running: false,
            workerReady: false}
      );
      this.props.actions.updateUI(
          {...this.props.ui, reset: true,
            ready: true,
            running: false,
            animStep: false,
            netAnim: false,
            lstmStep: 0,
            plotStep: 0,
            trainingStep: 0,
            state: [true, false, false],
          }
      );
    }
    if (this.props.training.step) {
      this.iterate(false);
      this.props.actions.updateUI(
          {...this.props.ui, reset: true,
            ready: true,
            running: false,
            animStep: false,
            netAnim: false,
            lstmStep: 0,
            plotStep: 0,
            trainingStep: 0,
            state: [true, false, false],
          }
      );
      this.props.actions.updateTraining(
          {...this.props.training, reset: false, step: false, running: false,
            workerReady: !this.props.ui.ready,
          }
      );
    }
  }

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
    for (let i = 0; i < 3; i++) {
      this.worker.postMessage(
          {
            cmd: 'data',
            params: {
              start: i,
              type: this.props.training.dataTypes,
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
            reset: true,
          },
        });
    let ui = this.props.ui;
    let network = this.props.network;
    const training = {...this.props.training, workerReady: false};
    // reset the datasets and create the new data for the upcoming training
    network = {...network, iteration: 0};
    network = this.addDataToNetwork(network, [], [], []);
    network = this.addPredictionToNetwork(network, []);
    ui = this.addDataToUI(ui, network);
    this.props.actions.updateNetwork(network);
    this.props.actions.updateUI(ui);
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
   * This funtion adds the current training values with the current prediction
   * to the ui object, so the plots can be drawn accurately
   *
   * @param {object} oldUI the previous ui object from the state
   * @param {object} network the current network object from the state
   * @return {object} the new ui object with the updated data
   */
  addDataToUI(oldUI, network) {
    const data = oldUI.data;
    data.pop();
    data.unshift(network.data);
    data[2] = network.data;
    const newUI = {...oldUI, data: data};
    return newUI;
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
      let ui = this.props.ui;
      ui = this.addDataToUI(ui, network);
      this.props.actions.updateUI({...ui, ready: !animate, running: animate});
    } else {
      return;
    }
    this.props.actions.updateTraining(
        {...this.props.training, step: false, ready: false, workerReady: false}
    );
    // Prepare the data
    this.worker.postMessage(
        {
          cmd: 'data',
          params: {
            start: this.props.training.iteration,
            type: this.props.training.dataTypes,
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

    this.worker.postMessage(
        {
          cmd: 'fit',
          params: {
            epochs: 1,
            batchSize: this.props.training.batchSize,
            reset: false,
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
