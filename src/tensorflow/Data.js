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
   * @param {number} size the size of the data set
   */
  generateDataWith(start, func, variant, noise, size) {
    this.generateData(start, func, 3, 1,
        0.2, size = 100, variant, noise);
  }

  /**
   * The actual function for generating the data sets used for training
   *
   * @param {number} start the time step to start the data from
   * @param {string} func the type of function the network should be trained on
   * @param {number} plotLength the size of the interval of the input values
   * @param {number} predLength the number of values that should be predicted
   * @param {number} stepSize the distance between two values in the data set
   * @param {number} setSize the amount of individual training data
   *  within the set
   * @param {string} variant the variation of input values, currently always
   *  'random'
   * @param {number} noise the amount of noise that should be added onto
   *  the training data (0-2)
   */
  generateData(start, func, plotLength,
      predLength, stepSize, setSize, variant, noise = 0) {
    this.trainInputBuff = [];
    this.trainOutputBuff = [];
    this.testInputBuff = [];
    this.values = Math.round(plotLength / stepSize);
    this.predictions = predLength;
    this.stepSize = stepSize;
    this.chartPredictionInput = [];
    this.chartDataInput = [];
    this.chartDataOutput = [];
    // let rndOff = Math.random() * 20 * Math.PI;
    let rndAmp = 0.2 + Math.random() * 0.8;
    let val = 0;
    let noiseVal = 0;
    switch (variant) {
      case 'basic':
        start = 0;
        // rndOff = 0;
        rndAmp = 1;
        break;
      case 'linear':
        // rndOff = 0;
        rndAmp = 1;
        break;
      case 'random':
        rndAmp = 1;
        start = 0;
        break;
      default:
    }

    // train data
    for (let i = 0; i < setSize; i++) {
      const trainInputSequence = [];
      start = Math.random() * 20 * Math.PI;
      for (let j = 0; j < this.values; j++) {
        noiseVal = noise * (-0.1 + 0.2 * Math.random());
        val = this.dataFunc((i + j) * stepSize, func) * rndAmp;
        trainInputSequence.push([val]);
      }
      this.trainInputBuff.push(trainInputSequence);
      const currentOutSequence = [];
      let x;
      for (let j = 0; j < this.predictions; j++) {
        x = (i + this.values + j) * stepSize;
        val = this.dataFunc(x, func) * rndAmp;
        currentOutSequence.push(val);
      }
      this.trainOutputBuff.push(currentOutSequence);
    }

    const testInputSequence = [];
    // test data
    for (let j = 0; j < this.values; j++) {
      noiseVal = noise * (-0.1 + 0.2 * Math.random());
      val = this.dataFunc(j * stepSize, func) * rndAmp;
      testInputSequence.push([val]);
      this.chartDataInput.push(val);
      this.chartPredictionInput.push(val + noiseVal);
    }
    this.testInputBuff.push(testInputSequence);
    const currentOutSequence = [];
    let x;
    for (let j = 0; j < this.values; j++) {
      x = (this.values + j) * stepSize;
      val = this.dataFunc(x, func) * rndAmp;
      currentOutSequence.push(val);
      this.chartDataOutput.push(val);
    }
    this.trainInput = tf.tensor3d(this.trainInputBuff);
    this.trainOutput = tf.tensor2d(this.trainOutputBuff);
    // this.testInput = tf.tensor3d(this.testInputBuff);
    this.testInput = testInputSequence;
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
