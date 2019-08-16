import * as tf from '@tensorflow/tfjs';

export class Model {
  constructor() {
    this.model = tf.sequential();
    /*const cells = [];
    const lstm_layers = 2;
    const cells_per_layer = 5;
    for(let i = 0; i < lstm_layers; i++) {
      cells.push(tf.layers.lstmCell({units: cells_per_layer}));
    }
    const rnn = tf.layers.rnn({
      cell: cells, returnSequences: true, inputShape: [4,10]
    });
    */
    const hidden = tf.layers.lstm({units: 10, inputShape: [5, 10]})
    const output = tf.layers.dense({units: 10, activation: 'softmax'});
    //this.model.add(input);
    this.model.add(hidden);
    this.model.add(output);
    this.model.summary();
  }
}
