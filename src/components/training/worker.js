/* eslint-disable no-restricted-globals*/
/* global tf, importScripts*/
export default () => {
  self.addEventListener('message', (e) => {
    if (!e) return;
    switch (e.data.cmd) {
      case 'init':
        importScripts('https://cdn.jsdelivr.net/npm/setimmediate@1.0.5/setImmediate.min.js');
        importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.2.7/dist/tf.min.js');
        tf.setBackend('cpu');
        self.initialize(e.data.model, e.data.data);
        postMessage({cmd: 'init', values:
          {
            values: self.values,
            predictions: self.testOutputs,
          }});
        break;
      case 'fit':
        if (self.fitting) return;
        self.fitting = true;
        self.model.model.fit(self.mem[2].in,
            self.mem[2].out, {
              epochs: e.data.params.epochs,
              batchSize: e.data.params.batchSize,
            }
        ).then(() => {
          self.fitting = false;
          postMessage({cmd: 'fit'});
        }
        );
        break;
      case 'data':
        self.generateDataWith(e.data.params);
        self.addDataToMemory();
        postMessage({cmd: 'data', values: {
          chartIn: self.chartDataInput,
          chartOut: self.chartDataOutput,
          chartPred: self.chartPredictionInput,
        }});
        break;
      case 'model':
        self.createModel(e.data.params);
        break;
      case 'pred':
        postMessage({cmd: 'pred', values: {
          pred: self.createPrediction(),
        }});
        break;
      default:
        break;
    }
  });

  self.initialize = () => {
    self.model = undefined;
    self.mem = [];
    self.fitting = false;
    self.generateDataWith({start: 0});
  };

  self.createModel = (params) => {
    // Create the network model and compile it
    self.createComplexModel(self.values, 1, self.predictions,
        params.layers, params.cells);
    const optimizer = tf.train.rmsprop(params.learningRate);
    self.model.compile({loss: 'meanSquaredError', optimizer: optimizer});
  };

  self.addDataToMemory = () => {
    const add = {in: self.trainInput,
      out: self.trainOutput,
      pred: self.testInput};
    if (!self.mem) {
      self.mem = [add];
      return;
    }
    if (self.mem.length === 5) {
      self.mem.shift();
    }
    self.mem.push(add);
  };


  /**
   * Creates a more complex lstm network model with multiple
   * hidden layers and possibly multiple blocks per layer
   *
   * @param {number} timeSteps the amount of input time steps
   * @param {number} vocab the vocabulray size, = 1 for numerical input
   * functions (meaning the vocabulary is 'one number' with any value)
   * @param {number} labels the output labels, or output dimensionality
   * @param {number} layers the amount of hidden lstm layers
   * @param {number} blockSize the amount of cell states within a lstm block
   * @return {object} the complex network model based on the input values
   */
  self.createComplexModel = (timeSteps, vocab, labels, layers, blockSize) => {
    self.model = tf.sequential();
    // blockSize = 128;
    self.model.add(
        tf.layers.lstm({
          units: blockSize,
          returnSequence: true,
          inputShape: [timeSteps, vocab],
        })
    );
    for (let i = 1; i < layers; i++) {
      self.model.add(
          tf.layers.repeatVector({n: blockSize}));
      self.model.add(
          tf.layers.lstm({
            units: blockSize,
            returnSequence: true,
          })
      ); // should self be done with individual cells?
    }
    self.model.add(
        tf.layers.dense({
          units: labels,
          returnSequence: true,
          activation: 'tanh',
        })
    );
    // self.model.summary();
    return self.model;
  };

  /**
   * Helper function for generating the data sets used for training
   *
   * @param {object} params sefsef
   */
  self.generateDataWith = (params) => {
    self.generateData(params.start, params.type, 3, 1,
        0.2, params.size, params.var, params.noise);
  };

  /**
   * The actual function for generating the data sets used for training
   *
   * @param {number} start the time step to start the data from
   * @param {string} func the type of function the network should be trained on
   * @param {number} plotLength the size of the interval of the input values
   * @param {number} predLength the number of values that should be predicted
   * @param {number} stepSize the distance between two values in the data set
   * @param {number} setSize the amount of individual training data
   *  within the set
   * @param {string} variant the variation of input values, currently always
   *  'random'
   * @param {number} noise the amount of noise that should be added onto
   *  the training data (0-2)
   */
  self.generateData = (start, func, plotLength,
      predLength, stepSize, setSize, variant, noise = 0) => {
    self.trainInputBuff = [];
    self.trainOutputBuff = [];
    self.testInputBuff = [];
    self.values = Math.round(plotLength / stepSize);
    self.predictions = predLength;
    self.testOutputs = 2 * Math.PI / stepSize;
    self.stepSize = stepSize;
    self.chartPredictionInput = [];
    self.chartDataInput = [];
    self.chartDataOutput = [];
    self.maxNoise = 0.2;
    if (func === undefined || variant === undefined) {
      return;
    }
    // let rndOff = Math.random() * 20 * Math.PI;
    let rndAmp = 0.2 + Math.random() * 0.8;
    let val = 0;
    let noiseVal = 0;
    switch (variant) {
      case 'basic':
        start = 0;
        // rndOff = 0;
        rndAmp = 1;
        break;
      case 'linear':
        // rndOff = 0;
        rndAmp = 1;
        break;
      case 'random':
        rndAmp = 1;
        start = 0;
        break;
      default:
    }

    // train data
    for (let i = 0; i < setSize; i++) {
      const trainInputSequence = [];
      start = Math.random() * Math.PI;
      for (let j = 0; j < self.values; j++) {
        noiseVal = (noise/100) * (-self.maxNoise + 2 *self.maxNoise * Math.random());
        val = self.dataFunc(start + (i + j) * stepSize, func) + noiseVal;
        trainInputSequence.push([val]);
      }
      self.trainInputBuff.push(trainInputSequence);
      const currentOutSequence = [];
      let x;
      for (let j = 0; j < self.predictions; j++) {
        x = (i + self.values + j) * stepSize + start;
        val = self.dataFunc(x, func) * rndAmp;
        currentOutSequence.push(val);
      }
      self.trainOutputBuff.push(currentOutSequence);
    }

    const testInputSequence = [];
    // test data
    for (let j = 0; j < self.values; j++) {
      noiseVal = (noise/100) * (-self.maxNoise + 2 * self.maxNoise * Math.random());
      val = self.dataFunc(j * stepSize, func) * rndAmp + noiseVal;
      testInputSequence.push([val]);
      self.chartDataInput.push(val);
      self.chartPredictionInput.push(val);
    }
    self.testInputBuff.push(testInputSequence);
    const currentOutSequence = [];
    let x;
    for (let j = 0; j < self.testOutputs; j++) {
      x = (self.values + j) * stepSize;
      val = self.dataFunc(x, func) * rndAmp;
      currentOutSequence.push(val);
      self.chartDataOutput.push(val);
    }
    self.trainInput = tf.tensor3d(self.trainInputBuff);
    self.trainOutput = tf.tensor2d(self.trainOutputBuff);
    // self.testInput = tf.tensor3d(self.testInputBuff);
    self.testInput = testInputSequence;
    console.log(self.testInput);
  };

  /**
   * A helper function that represents the currently chosen input function
   *
   * @param {number} x the current input value
   * @param {string} type the type of function that should be applied to
   *  the input values
   * @return {number} y = type(x)
   */
  self.dataFunc = (x, type) => {
    let y = Math.sin(x);
    if (type === 'sinc') {
      if (x === Math.PI) {
        return 1;
      }
      y = Math.sin((x+Math.PI) % 4) / ((x+Math.PI) % 4);
    }
    if (type === 'saw') {
      y = -1 + x % 2;
    }
    if (type === 'sqr') {
      y = Math.sin(x) >= 0 ? 1 : -1;
    }
    return y;
  };

  /**
   * This function creates a continous array of single prediction values
   * for the current test input values. The predicted values are being added
   * to the values so that the model needs to predict the function with its
   * own previous predictions
   *
   * @return {number[]} the predicition array
   */
  self.createPrediction = () => {
    const output = [];
    let preds;
    let prediction;
    let inputBuff;
    const newInput = [];
    for (const step of self.testInput) {
      newInput.push([step[0]]);
    }
    for (let i = 0; i < self.testOutputs; i++) {
      inputBuff = tf.tensor3d([newInput]);
      prediction =
      self.model.predict(inputBuff);
      preds = Array.from(prediction.arraySync());
      output.push(preds[0]);
      newInput.splice(0, 1);
      newInput.push(preds[0]);
    }
    return output;
  };
};
