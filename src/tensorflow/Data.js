import * as tf from '@tensorflow/tfjs';

export class Data {

  constructor() {
    this.xs = [];
    this.ys = [];
    const examples = 100;
    const sample_size = 5;
    this.start_buff = 0;
    this.labels = 10;
    for(let i = 0; i < examples; i++) {
      const buff_x = [];
      const buff_y = [];
      for(let j = 0; j < sample_size; j++) {
        const buff_x_inner = []
        for(let k = 0; k < this.labels; k++) {
          buff_x_inner.push(0);
        }  
        buff_x_inner[(this.start_buff+j) % this.labels] = 1;
        buff_x.push(buff_x_inner)
      }
      for(let k = 0; k < this.labels; k++) {
        buff_y.push(0);
      } 
      console.log((this.start_buff + sample_size) % this.labels)
      buff_y[(this.start_buff + sample_size) % this.labels] = 1;
      this.xs.push(buff_x);
      this.ys.push(buff_y);
      this.start_buff++;
    }

    this.training_input = tf.tensor3d(this.xs);
    this.training_label = tf.tensor2d(this.ys);
    this.training_input.print();
    this.training_label.print();

    // example data form
    this.test_input = tf.tensor3d([
      [
      [0,1,0,0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,1,0,0,0,0,0],
      [0,0,0,0,0,1,0,0,0,0]
      ]
    ]);
    this.test_label = tf.tensor3d([[[0,0,0,0,0,0,1,0,0,0]]]);
  }

}
