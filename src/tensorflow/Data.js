import * as tf from '@tensorflow/tfjs';
export class Data {

  constructor() {
    this.getSinDataFrom(0)
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

  getSinDataFrom(start) {
    return this.getSinDataForTime(start, 1.5 * Math.PI, 2 * Math.PI, 0.1, 1);
  }

  getSinDataForTime(start, plotLength, predictionLength, stepSize, setSize) {
    this.sinInputBuff = [];
    this.sinOutputBuff = [];
    this.values = Math.round(plotLength / stepSize);
    this.predictions = Math.round(predictionLength / stepSize);
    this.stepSize = stepSize;
    this.chartData = [];
    const randomOffset = Math.random() * 2 * Math.PI
    for(let i = 0; i < setSize; i++) {
      const currentInSequence = [];
      for(let j = 0; j < this.values; j++) {
        currentInSequence.push([Math.sin((start + j + randomOffset) * stepSize)]);
        this.chartData.push({
          y: Math.sin((start + j + randomOffset) * stepSize),
          x: (start + j + randomOffset) * stepSize
        })
      }
      this.sinInputBuff.push(currentInSequence);
      const currentOutSequence = [];
      for(let j = 0; j < this.predictions; j++) {
        currentOutSequence.push(Math.sin((start + this.values + randomOffset + j) * stepSize))
      }
      this.sinOutputBuff.push(currentOutSequence);
    }

    this.train_sin_input = tf.tensor3d(this.sinInputBuff);
    this.train_sin_next = tf.tensor2d(this.sinOutputBuff);
    console.log('train input')
    this.train_sin_input.print();
    console.log('train output')
    this.train_sin_next.print();
    return this.chartData;
  }

  getSampleFromTestData(start) {
    const test_input_sequences = [];
    console.log('data x: ', start, this.values)
    for(let j = 0; j < this.values; j++) {
      test_input_sequences.push([Math.sin((start + j) * this.stepSize)]);
    }
    this.current_test_sin = tf.tensor3d([test_input_sequences]);
    console.log('tensor for prediction')
    this.current_test_sin.print();
  }


}
