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
  }

  reset() {
    this.model = new Model();
    this.model.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
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

  async iterate() {
    const this_ = this;
    console.log('hello');
    if(!this.props.training) {
      return;   
    }
    await tf.tidy(() => {
      console.log('are');
      this.props.actions.updateIteration(this.props.iterations + 1);
      this.model.model.fit(this.data.training_input, this.data.training_label, {
        epochs: 5, batchSize: 5, callbacks: {
          onTrainEnd: async (epoch, logs) => {
            console.log('really');
            const prediction = this.model.model.predict(this.data.test_input);
            const preds = prediction.arraySync()[0][3];
            console.log(preds);
            this.props.actions.updatePrediction(preds);
            console.log('there')
            setTimeout (function() {this_.iterate()}, 100); 
          },
        }
      });
      console.log('you');
    });
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
  prediction: PropTypes.array.isRequired,
  training: PropTypes.bool.isRequired,
  iterations: PropTypes.number.isRequired,
  firstcall: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    prediction: state.prediction,
    training: state.training,
    iterations: state.iterations,
    firstcall: state.firstcall
  };
}

// Mapping the Actions called for SVG manipulation to the Props of this Class
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Training);
