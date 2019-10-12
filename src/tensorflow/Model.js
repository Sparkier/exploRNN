import * as tf from '@tensorflow/tfjs';

export class Model {

  /**
   * Creates a basic lstm network model with only one hidden layer 
   */
  createModel(timeSteps, vocab, labels, layerSize) {
    this.model = tf.sequential();
    this.model.add(tf.layers.lstm({units: layerSize, inputShape: [timeSteps, vocab]}));
    this.model.add(tf.layers.dense({units: labels, activation: 'softmax'}));
    this.model.summary();
    return this.model;
  }

  /**
   * Creates a lstm network with multiple layers, possibly later it will
   * be able to have complex a more layer structure
   */
  createComplexModel(timeSteps, vocab, labels, layers, layerSize) {
    this.model = tf.sequential();
    // layerSize = 128;
    this.model.add(tf.layers.lstm({units: layerSize,  returnSequence: true, inputShape: [timeSteps, vocab]}));
    for(let i = 1; i < layers; i++) {
      this.model.add(tf.layers.repeatVector({n: 10})); // is this needed? maybe use a reshape layer?
      this.model.add(tf.layers.lstm({units: 10, returnSequence: true})); // should this be done with individual cells?
    }
    const output = tf.layers.dense({units: labels, returnSequence: true, activation: 'tanh'});
    this.model.add(output);
    this.model.summary();
    return this.model;
  }
}
