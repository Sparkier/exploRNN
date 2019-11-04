import * as tf from '@tensorflow/tfjs';

/**
 * This class represents the neural network model created with tf.js
 */
export class Model {
  /**
   * Creates a basic lstm network model with only one hidden layer
   *
   * @param {number} timeSteps the amount of input time steps
   * @param {number} vocab the vocabulray size, = 1 for numerical input
   *  functions
   * @param {number} labels the output labels, or output dimensionality
   * @param {number} blockSize the amount of cell states within the lstm block
   * @return {object} the basic network model
   */
  createModel(timeSteps, vocab, labels, blockSize) {
    this.model = tf.sequential();
    this.model.add(
        tf.layers.lstm({
          units: blockSize,
          inputShape: [timeSteps, vocab],
        })
    );
    this.model.add(
        tf.layers.dense({
          units: labels,
          activation: 'softmax',
        })
    );
    this.model.summary();
    return this.model;
  }

  /**
   * Creates a more complex lstm network model with multiple
   * hidden layers and possibly multiple blocks per layer
   *
   * @param {number} timeSteps the amount of input time steps
   * @param {number} vocab the vocabulray size, = 1 for numerical input
   * functions (meaning the vocabulary is 'one number' with any value)
   * @param {number} labels the output labels, or output dimensionality
   * @param {number} layers the amount of hidden lstm layers
   * @param {number} blockSize the amount of cell states within a lstm block
   * @return {object} the complex network model based on the input values
   */
  createComplexModel(timeSteps, vocab, labels, layers, blockSize) {
    this.model = tf.sequential();
    // blockSize = 128;
    this.model.add(
        tf.layers.lstm({
          units: blockSize,
          returnSequence: true,
          inputShape: [timeSteps, vocab],
        })
    );
    for (let i = 1; i < layers; i++) {
      this.model.add(
          tf.layers.repeatVector({n: blockSize}));
      this.model.add(
          tf.layers.lstm({
            units: blockSize,
            returnSequence: true,
          })
      ); // should this be done with individual cells?
    }
    this.model.add(
        tf.layers.dense({
          units: labels,
          returnSequence: true,
          activation: 'tanh',
        })
    );
    this.model.summary();
    return this.model;
  }
}
