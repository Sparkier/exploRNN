import * as tf from '@tensorflow/tfjs';

export class Data {

  constructor() {
    this.xs = [];
    this.ys = [];
    const examples = 4;
    const sample_size = 4;
    this.start_buff = 0;
    for(let i = 0; i < examples; i++) {
      const buff_x = [];
      const buff_y = [];
      for(let j = 0; j < sample_size; j++) {
        buff_x.push([this.start_buff+j]);
        const buff_y_inner = [];
        for(let k = 0; k < 10; k++) {
          buff_y_inner.push(0);
        }   
        buff_y.push(buff_y_inner);
      }
      buff_y[sample_size-1][this.start_buff + 4] = 1;
      this.xs.push(buff_x);
      this.ys.push(buff_y);
      this.start_buff++;
    }

    this.training_input = tf.tensor3d(this.xs);
    this.training_label = tf.tensor3d(this.ys);
    this.training_input.print();
    this.training_label.print();
  }

}
