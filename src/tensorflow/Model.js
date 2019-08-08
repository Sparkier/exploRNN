import * as tf from '@tensorflow/tfjs';

export class Model {
  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 10, inputShape: [1]}));
    this.model.add(tf.layers.dense({units: 10}));
    this.model.add(tf.layers.dense({units: 1}));
  }
}
