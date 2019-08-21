import * as tf from '@tensorflow/tfjs';
export class Data {

  /**
   * Currently creates data sets in form of linear integer sequences, using labels for input and output
   * 
   * e.g.:
   * input corresponding to the sequence 1,2,3,4,5:
      [0,1,0,0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,0,0,0],
      [0,0,0,0,1,0,0,0,0,0],
      [0,0,0,0,0,1,0,0,0,0]

   * the output would be the label representing the next number in this sequence being 5:
      [0,0,0,0,0,0,1,0,0,0]
   */
  constructor() {
    this.xs = [];
    this.ys = [];
    const examples = 30;
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
    this.test_label = tf.tensor2d([[0,0,0,0,0,0,1,0,0,0]]);
    this.createSinData(2, 0.1, 60);
  }

  createSinData(plotLength, stepSize, setSize) {
    this.sinInputBuff = [];
    this.sinOutputBuff = [];
    this.values = plotLength / stepSize;
    this.stepSize = stepSize;
    for(let i = 0; i < setSize; i++) {
      const currentSequence = [];
      const startX = Math.random() * 2 * Math.PI;
      for(let j = 0; j < this.values; j++) {
        currentSequence.push([Math.sin(startX + j * stepSize)]);
      }
      this.sinInputBuff.push(currentSequence);
      this.sinOutputBuff.push([Math.sin(startX + this.values * stepSize)])
    }

    this.train_sin_input = tf.tensor3d(this.sinInputBuff);
    this.train_sin_next = tf.tensor2d(this.sinOutputBuff);
    this.train_sin_input.print();
    this.train_sin_next.print();
    
  }

  getSampleFromTestData(start) {
    const test_input_sequences = [];
    for(let j = 0; j < this.values; j++) {
      test_input_sequences.push([Math.sin((start + j) * this.stepSize)]);
    }
    this.test_sin_input = test_input_sequences;
    this.current_test_sin = tf.tensor3d([this.test_sin_input]);
  }


}
