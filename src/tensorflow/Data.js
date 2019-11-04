import * as tf from '@tensorflow/tfjs';

/**
 * This class is responsible for generating all the necessary data for
 * the training of the network
 */
export class Data {
  /**
   * The constructor function of the data class, initializes the values
   * for setting up the training phase
   */
  constructor() {
    this.generateDataWith(0);
  }

  /**
   * Helper function for generating the data sets used for training
   *
   * @param {number} start the time step to start the data from
   * @param {string} func the type of function the network should be trained on
   * @param {string} variant the variation of input values, currently always
   *  'random'
   * @param {number} noise the amount of noise that should be added onto
   *  the training data (0-2)
   */
  generateDataWith(start, func, variant, noise) {
    this.generateData(start, func, 1.5 * Math.PI, 2 * Math.PI,
        0.2, 1, variant, noise);
  }

  /**
   * The actual function for generating the data sets used for training
   *
   * @param {number} start the time step to start the data from
   * @param {string} func the type of function the network should be trained on
   * @param {number} plotLength the size of the interval of the input values
   * @param {number} predLength the size of the interval of the output values
   * @param {number} stepSize the distance between two values in the data set
   * @param {number} setSize the amount of individual training data
   *  within the set
   * @param {string} variant the variation of input values, currently always
   *  'random'
   * @param {number} noise the amount of noise that should be added onto
   *  the training data (0-2)
   */
  generateData(start, func, plotLength,
      predLength, stepSize, setSize, variant, noise) {
    this.sinInputBuff = [];
    this.predictionInputBuff = [];
    this.sinOutputBuff = [];
    this.values = Math.round(plotLength / stepSize);
    this.predictions = Math.round(predLength / stepSize);
    this.stepSize = stepSize;
    this.chartPredictionInput = [];
    this.chartDataInput = [];
    this.chartDataOutput = [];
    let rndOff = Math.random() * 20 * Math.PI;
    let rndAmp = 0.2 + Math.random() * 0.8;
    let val = 0;
    let noiseVal = 0;
    switch (variant) {
      case 'basic':
        start = 0;
        rndOff = 0;
        rndAmp = 1;
        break;
      case 'linear':
        rndOff = 0;
        rndAmp = 1;
        break;
      case 'random':
        rndAmp = 1;
        start = 0;
        break;
      default:
    }
    for (let i = 0; i < setSize; i++) {
      const currentInSequence = [];
      const predictionInSequence = [];
      for (let j = 0; j < this.values; j++) {
        noiseVal = noise * (-0.1 + 0.2 * Math.random());
        val = this.dataFunc((start + j) * stepSize + rndOff, func) * rndAmp;
        currentInSequence.push([val]);
        predictionInSequence.push([val + noiseVal]);
        this.chartDataInput.push(val);
        this.chartPredictionInput.push(val + noiseVal);
      }
      this.predictionInputBuff.push(currentInSequence);
      this.sinInputBuff.push(currentInSequence);
      const currentOutSequence = [];
      let x;
      for (let j = 0; j < this.predictions; j++) {
        x = (this.values + j + start) * stepSize + rndOff;
        val = this.dataFunc(x, func) * rndAmp;
        currentOutSequence.push(val);
        this.chartDataOutput.push(val);
      }
      this.sinOutputBuff.push(currentOutSequence);
    }
    this.train_sin_input = tf.tensor3d(this.sinInputBuff);
    this.prediction_sin_input = tf.tensor3d(this.predictionInputBuff);
    this.train_sin_next = tf.tensor2d(this.sinOutputBuff);
    this.train_sin_input.print();
    this.train_sin_next.print();
  }

  /**
   * A helper function that represents the currently chosen input function
   *
   * @param {number} x the current input value
   * @param {string} type the type of function that should be applied to
   *  the input values
   * @return {number} y = type(x)
   */
  dataFunc(x, type) {
    let y = Math.sin(x);
    if (type === 'sinc') {
      if (x === Math.PI) {
        return 1;
      }
      y = Math.sin((x+Math.PI) % 4) / ((x+Math.PI) % 4);
    }
    if (type === 'saw') {
      y = -1 + x % 2;
    }
    if (type === 'sqr') {
      y = Math.sin(x) >= 0 ? 1 : -1;
    }
    return y;
  }
}
