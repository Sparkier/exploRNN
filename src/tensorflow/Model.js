import * as tf from '@tensorflow/tfjs';

export class Model {
  constructor() {
    this.createComplexModel(5,10,10,1,5)
  }

  /**
   * Creates a basic lstm network model with only one hidden layer 
   */
  createModel(timeSteps, sequenceLength, labels, layerSize) {
    this.model = tf.sequential();
    this.model.add(tf.layers.lstm({units: layerSize, inputShape: [timeSteps, sequenceLength]}));
    this.model.add(tf.layers.dense({units: labels, activation: 'softmax'}));
    this.model.summary();
    return this.model;
  }

  /**
   * Creates a lstm network with multiple layers, possibly later it will
   * be able to have complex a more layer structure
   */
  createComplexModel(timeSteps, sequenceLength, labels, layers, layerSize) {
    this.model = tf.sequential();
    this.model.add(tf.layers.lstm({units: layerSize, inputShape: [timeSteps, sequenceLength]}));
    for(let i = 1; i < layers; i++) {
      this.model.add(tf.layers.repeatVector({n: labels + 1})); // is this needed? maybe use a reshape layer?
      this.model.add(tf.layers.lstm({units: layerSize})); // should this be done with individual cells?
    }
    const output = tf.layers.dense({units: labels, activation: 'softmax'});
    this.model.add(output);
    this.model.summary();
    return this.model;
  }
}
