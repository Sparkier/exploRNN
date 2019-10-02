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
        this.start();
      } else {
        this.stop();
      }
    }
    this.pause = 2100 - 2 * this.props.training.speed;
    console.log('WATCH ME GO:', this.props.training.speed, this.pause)
  }

  reset() {
    this.model.createComplexModel(this.data.values,1,this.data.predictions,this.props.network.layers,this.props.network.layerSize)
    console.log(this.props.network.learningRate)
    const optimizer = tf.train.rmsprop(this.props.network.learningRate);
    this.model.model.compile({loss: 'meanSquaredError', optimizer: optimizer});
    this.model.model.summary();
    this.props.actions.firstcall();
    console.log(this.props.network.data);
    this.data.getSinDataFrom(this.props.network.iteration, this.props.training.dataVariant);
    this.props.actions.addDataToNetwork(this.props.network, this.data.chartDataInput, this.data.chartDataOutput, this.data.train_sin_input, this.data.train_sin_next);
    this.data.getSinDataFrom(this.props.network.iteration + 1, this.props.training.dataVariant);
    this.props.actions.addDataToNetwork(this.props.network, this.data.chartDataInput, this.data.chartDataOutput, this.data.train_sin_input, this.data.train_sin_next);
    console.log(this.props.network.data);
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
    this.data.getSinDataFrom(this.props.network.iteration + 2, this.props.training.dataVariant);
    this.props.actions.addDataToNetwork(this.props.network, this.data.chartDataInput, this.data.chartDataOutput, this.data.train_sin_input, this.data.train_sin_next);
    this.props.actions.updateNetwork({...this.props.network, iteration: this.props.network.iteration + 1});
    // this.data.getSampleFromTestData(this.props.network.iteration + this.props.training.testOffset);
    tf.tidy(() => {
      const prediction = this.model.model.predict(this.props.network.data[2].modelInput);
      const preds = Array.from(prediction.arraySync());
      console.log('HELP ME',Array.from( this.props.network.data[2].modelInput.arraySync()), preds);
      this.props.actions.addPredictionToNetwork(this.props.network, preds[0]);
      console.log('TEST', this.props.training, this.props.network);
    });
    this.model.model.fit(this.props.network.data[2].modelInput, this.props.network.data[2].modelOutput, {
      epochs: 1, 
      batchSize: 1
    }).then(() =>  {
      setTimeout (function() {this_.iterate()}, this.pause); 
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
