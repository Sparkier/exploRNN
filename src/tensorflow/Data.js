import * as tf from '@tensorflow/tfjs';
export class Data {

  // TODO: Create all necessary Data beforehand


  constructor() {
    this.getSinDataFrom(0)
  }

  getSinDataFrom(start, func, variant) {
    return this.getDataFor(start, func, 1.5 * Math.PI, 2 * Math.PI, 0.2, 1, variant);
  }

  getDataFor(start, func, plotLength, predictionLength, stepSize, setSize, variant) {
    this.sinInputBuff = [];
    this.predictionInputBuff = [];
    this.sinOutputBuff = [];
    this.values = Math.round(plotLength / stepSize);
    this.predictions = Math.round(predictionLength / stepSize);
    this.stepSize = stepSize;
    this.chartPredictionInput = [];
    this.chartDataInput = [];
    this.chartDataOutput = [];
    let randomOffset = Math.random() * 2 * Math.PI;
    let randomAmplitude = 0.2 + Math.random() * 0.8;
    let noise = false;

    switch(variant) {
      case 'basic': 
        start = 0;
        randomOffset = 0;
        randomAmplitude = 1;
        break;
      case 'linear':
        randomOffset = 0;
        randomAmplitude = 1;
        break;
      case 'random':
        randomAmplitude = 1;
        start = 0;
        break;
      case 'linear-noise':
        randomOffset = 0;
        randomAmplitude = 1;
        noise = true;
        break;
      case 'random-noise':
        randomAmplitude = 1;
        noise = true;
        break;
      default:
    }

    for(let i = 0; i < setSize; i++) {
      const currentInSequence = [];
      const predictionInSequence = [];
      for(let j = 0; j < this.values; j++) {
        let noiseVal = 0;
        if(noise) {
          noiseVal = (-0.2 + 0.4 * Math.random());
        }
        currentInSequence.push([this.dataFunction((start + j) * stepSize + randomOffset, func) * randomAmplitude]);
        predictionInSequence.push([this.dataFunction((start + j) * stepSize + randomOffset, func) * randomAmplitude + noiseVal]);
        this.chartDataInput.push(
          this.dataFunction((start + j) * stepSize + randomOffset, func) * randomAmplitude
        )
        this.chartPredictionInput.push(
          this.dataFunction((start + j) * stepSize + randomOffset, func) * randomAmplitude + noiseVal
        )
      }
      this.predictionInputBuff.push(currentInSequence);
      this.sinInputBuff.push(currentInSequence);
      const currentOutSequence = [];
      for(let j = 0; j < this.predictions; j++) {
        currentOutSequence.push(this.dataFunction((this.values + j + start) * stepSize + randomOffset, func) * randomAmplitude)
        this.chartDataOutput.push(
          this.dataFunction((this.values + j + start) * stepSize + randomOffset, func) * randomAmplitude
        )
      }
      this.sinOutputBuff.push(currentOutSequence);
    }

    this.train_sin_input = tf.tensor3d(this.sinInputBuff);
    this.prediction_sin_input = tf.tensor3d(this.predictionInputBuff);
    this.train_sin_next = tf.tensor2d(this.sinOutputBuff);
    console.log('train input')
    this.train_sin_input.print();
    console.log('train output')
    this.train_sin_next.print();
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

  dataFunction(x, type) {
    let y = Math.sin(x);
    if(type === 'sinc') {
      if(x === Math.PI) {
        return 1;
      }
      y = Math.sin((x+Math.PI) % 4) / ((x+Math.PI) % 4);
    }
    if(type === 'saw') {
      y = -1 + x % 2;
    }
    if(type === 'sqr') {
      y = Math.sin(x) >= 0 ? 1 : -1
    }
    return y;

  }


}
