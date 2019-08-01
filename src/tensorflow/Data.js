import * as tf from '@tensorflow/tfjs';

export class Data {
  constructor() {
    this.xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    this.ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
  }
}
