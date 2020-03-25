/* eslint-disable no-restricted-globals */
/* global tf, importScripts */
export default () => {
  self.addEventListener('message', (e) => {
    if (!e) return;
    switch (e.data.cmd) {
      case 'init': // worker should be initialized
        importScripts(
            'https://cdn.jsdelivr.net/npm/setimmediate@1.0.5/setImmediate.min.js');
        importScripts(
            'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.2.7/dist/tf.min.js');
        tf.setBackend('cpu');
        self.initializing = true;
        self.initialize(e.data.params);
        self.initializing = false;
        postMessage({cmd: 'init', values: {
          values: self.values,
          predictions: self.testOutputs,
        }});
        break;
      case 'fit': // worker trains network for one epoch
        if (self.fitting) return;
        while (self.generating || self.initializing); // prevent inconsistencies
        self.fitting = true;
        self.model.model.fit(self.mem[0].in,
            self.mem[0].out, {
              epochs: e.data.params.epochs,
              batchSize: e.data.params.batchSize,
            }
        ).then((info) => {
          self.fitting = false;
          postMessage({cmd: 'fit', reset: e.data.params.reset});
        });
        break;
      case 'data': // a new data set shall be generated
        self.generating = true;
        self.generateDataWith(e.data.params);
        self.generating = false;
        self.addDataToMemory();
        postMessage({cmd: 'data', values: {
          chartIn: self.chartDataInput,
          chartOut: self.chartDataOutput,
          chartPred: self.chartPredictionInput,
          values: self.testInput.length,
          predictions: self.testOutputs,
        }});
        break;
      case 'model': // the network model shall be generated
        self.createModel(e.data.params);
        break;
      case 'pred': // determine a prediction for the current test data
        if (self.predicting) return;
        while (self.generating || self.initializing); // prevent inconsistencies
        self.predicting = true;
        postMessage({cmd: 'pred', values: {
          pred: self.createPrediction(e.data.params.type),
        }});
        self.predicting = false;
        break;
      default:
    }
  });

  /**
   * Initializes the worker thread with all necessary values and objects
   *
   * @param {object} params the parameters for the initialization
   */
  self.initialize = (params) => {
    self.model = undefined;
    self.mem = [];
    self.fitting = false;
    self.predicting = false;
    self.generating = false;
    self.textData = params.textData;
    self.generateDataWith(params);
  };

  /**
   * Creates the network model and compiles it
   *
   * @param {object} params The model parameters from the received message
   */
  self.createModel = (params) => {
    if (params.training.dataTypes[0] === 'text') {
      self.createComplexModel(20, self.textData.charSetSize,
          self.textData.charSetSize, params.layers, 16);
      const optimizer = tf.train.rmsprop(0.005);
      self.model.compile({loss: 'categoricalCrossentropy',
        optimizer: optimizer});
    } else {
      self.createComplexModel(self.values, 1, 1, params.layers, params.cells);
      const optimizer = tf.train.rmsprop(params.learningRate);
      self.model.compile({loss: 'meanSquaredError', optimizer: optimizer});
    }
  };

  /**
   * Adds the previously generated data to the worker memory
   */
  self.addDataToMemory = () => {
    const add = {in: self.trainInput,
      out: self.trainOutput,
      pred: self.testInput};
    if (!self.mem) { // No data, init the memory
      self.mem = [add];
    } else { // Data present, add to the memory
      self.mem.shift();
      self.mem.push(add);
    }
  };

  /**
   * Creates a more complex lstm network model with multiple
   * hidden layers and possibly multiple blocks per layer
   *
   * @param {number} timeSteps the amount of input time steps
   * @param {number} vocab the vocabulary size, = 1 for numerical input
   * functions (meaning the vocabulary is 'one number' with any value)
   * @param {number} labels the output labels, or output dimensionality, for us,
   * one number
   * @param {number} layers the amount of hidden lstm layer size
   * @param {number} blockSize the amount of cell states within a lstm block
   * @return {object} the complex network model based on the input values
   */
  self.createComplexModel = (timeSteps, vocab, labels, layers, blockSize) => {
    self.model = tf.sequential();
    // Add all LSTM layers
    for (let i = 0; i < layers; i++) {
      self.model.add(
          tf.layers.lstm({
            units: blockSize,
            returnSequences: i < layers - 1,
            inputShape: i === 0 ? [timeSteps, vocab] : undefined,
          })
      );
    }
    // Add the head to make a prediction
    if (labels > 1) {
      self.model.add(
          tf.layers.dense({
            units: labels,
            activation: 'softmax',
          })
      );
    } else {
      self.model.add(
          tf.layers.dense({
            units: labels,
            activation: 'tanh',
          })
      );
    }
    console.log(self.model.summary());
    return self.model;
  };

  /**
   * Helper function for generating the data sets used for training
   *
   * @param {object} params parameters used for generating the correct data
   */
  self.generateDataWith = (params) => {
    if (params.type[0] === 'text') {
      self.generateTextData(256);
    } else {
      self.generateFunctionData(params.type, 3, params.stepSize, params.size,
          params.noise);
    }
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
    let y = Math.sin(x); // standard sin function
    if (type === 'sinc') {
      y = (Math.sin(1.5*x) + Math.sin(4.5 * x)) / 1.5; // composite sin function
    }
    if (type === 'saw') {
      y = -1 + 2 * ((x % Math.PI) / Math.PI); // sawtooth function
    }
    if (type === 'sqr') {
      y = Math.sin((Math.PI/2)*x) >= 0 ? 1 : -1; // squarewave
    }
    return y;
  };

  /**
   * This function creates a continous array of single prediction values
   * for the current test input values. The predicted values are being added
   * to the values so that the model needs to predict the function with its
   * own previous predictions
   *
   * @param {array} dataTypes the data types the network is operating on
   * @return {number[]} the predicition array
   */
  self.createPrediction = (dataTypes) => {
    const output = [];
    let preds;
    let prediction;
    let inputBuff;
    const newInput = [];
    for (const step of self.testInput) {
      newInput.push(step);
    }
    // For a number of outputs, create predictions to draw as the network output
    for (let i = 0; i < self.testOutputs; i++) {
      inputBuff = tf.tensor3d([newInput]);
      prediction = self.model.predict(inputBuff);
      preds = Array.from(prediction.arraySync());
      output.push(preds[0]);
      if (dataTypes[0] === 'text') {
        for (const element in preds[0]) {
          if ({}.hasOwnProperty.call(preds[0], element)) {
            preds[0][element] = Math.round(preds[0][element]);
          }
        }
      }
      newInput.splice(0, 1);
      newInput.push(preds[0]);
    }
    return output;
  };

  /** Function Data Functions *************************************************/
  /**
   * The actual function for generating the data sets used for training
   *
   * @param {string} funcs the type of function the network should be trained on
   * @param {number} plotLength the size of the interval of the input values
   * @param {number} stepSize the distance between two values in the data set
   * @param {number} setSize amount of individual training data within the set
   * @param {number} noise amount of noise added onto the training data (0-2)
   */
  self.generateFunctionData = (funcs, plotLength, stepSize, setSize,
      noise = 0) => {
    self.trainInputBuff = [];
    self.trainOutputBuff = [];
    self.testInputBuff = [];
    self.values = Math.round(plotLength / stepSize);
    self.testOutputs = 2 * Math.PI / stepSize;
    self.stepSize = stepSize;
    self.chartPredictionInput = [];
    self.chartDataInput = [];
    self.chartDataOutput = [];
    self.maxNoise = 0.2;
    if (funcs === undefined || funcs.length === 0) {
      return;
    }
    // Train data
    // How many sets to generate per function
    const partialSetSize = setSize / funcs.length;
    for (const f of funcs) {
      self.trainData(stepSize, partialSetSize, f, noise);
    }
    // Test data
    self.testData(stepSize, funcs, noise);
  };

  /**
   * A helper function that creates a specific amount of training data
   * for a certain input function
   *
   * @param {number} stepSize the distance between two values in the data set
   * @param {number} partialSetSize the size of the current part of the
   * training set
   * @param {string} func the function to be used for calculating the input
   * values
   * @param {number} noise the percentage of noise to be added to the input
   */
  self.trainData = (stepSize, partialSetSize, func, noise) => {
    const setOffsetRatio = (2 * Math.PI) / partialSetSize;
    const startOffset = 2 * Math.PI * Math.random();
    for (let i = 0; i < partialSetSize; i++) {
      const trainInputSequence = [];
      const start = i * setOffsetRatio + startOffset;
      for (let j = 0; j < self.values; j++) {
        const noiseVal = - noise + (2 * noise * Math.random());
        const val = self.dataFunc(start + (j * stepSize), func) + noiseVal;
        trainInputSequence.push([val]);
      }
      self.trainInputBuff.push(trainInputSequence);
      const currentOutSequence = [];
      const val = self.dataFunc(self.values * stepSize + start, func);
      currentOutSequence.push(val);
      self.trainOutputBuff.push(currentOutSequence);
    }
    self.trainInput = tf.tensor3d(self.trainInputBuff);
    self.trainOutput = tf.tensor2d(self.trainOutputBuff);
  };

  /**
   * A helper function that creates the test data for a network epoch
   *
   * @param {number} stepSize the distance between two values in the data set
   * @param {array} funcs the functions to be used for calculating the input
   * values
   * @param {number} noise the percentage of noise to be added to the input
   */
  self.testData = (stepSize, funcs, noise) => {
    // Choose a random function
    const testFunc = funcs[Math.floor(Math.random() * funcs.length)];
    const testInputSequence = [];
    // Choose a random offset
    const offset = Math.random() * Math.PI;
    // Generate the test input data
    for (let j = 0; j < self.values; j++) {
      // Add noise to the input data
      const noiseVal = - noise + (2 * noise * Math.random());
      const val = self.dataFunc(j * stepSize + offset, testFunc) + noiseVal;
      testInputSequence.push([val]);
      self.chartDataInput.push(val);
      self.chartPredictionInput.push(val);
    }
    self.testInputBuff.push(testInputSequence);
    const currentOutSequence = [];
    let x;
    for (let j = 0; j < self.testOutputs; j++) {
      x = (self.values + j) * stepSize;
      const val = self.dataFunc(x + offset, testFunc);
      currentOutSequence.push(val);
      self.chartDataOutput.push(val);
    }
    self.chartDataInput.push();
    self.chartPredictionInput.push();
    self.testInput = testInputSequence;
  };

  /** Text Data Functions *****************************************************/
  /**
   * The actual function for generating the data sets used for training
   *
   * @param {number} numExamples Number of examples to generate.
   */
  self.generateTextData = (numExamples) => {
    self.generateExampleBeginIndices(20);
    self.trainInputBuff = [];
    self.trainOutputBuff = [];
    self.testInputBuff = [];
    self.testOutputs = 5;
    self.chartPredictionInput = [];
    self.chartDataInput = [];
    self.chartDataOutput = [];
    self.maxNoise = 0.2;
    // Train data
    self.textTrainData(numExamples, 20);
    // Test data
    self.textTestData(20);
  };

  /**
   * A helper function that creates a specific amount of training data
   * for a certain input function
   *
   * @param {number} numExamples Number of examples to generate.
   * @param {number} sampleLen the length of a training example in characters
   */
  self.textTrainData = (numExamples, sampleLen) => {
    for (let i = 0; i < numExamples; i++) {
      const trainInputSequence = [];
      const start = self.textData.exampleBeginIndices[
          self.textData.examplePosition %
          self.textData.exampleBeginIndices.length];
      for (let j = 0; j < sampleLen; j++) {
        const val = self.textData.indices[start + j];
        const valueArray = new Array(self.textData.charSetSize).fill(0);
        valueArray[val] = 1;
        trainInputSequence.push(valueArray);
      }
      self.trainInputBuff.push(trainInputSequence);
      const val = self.textData.indices[sampleLen + start];
      const valueArray = new Array(self.textData.charSetSize).fill(0);
      valueArray[val] = 1;
      self.trainOutputBuff.push(valueArray);
      self.textData.examplePosition++;
    }
    self.trainInput = tf.tensor3d(self.trainInputBuff);
    self.trainOutput = tf.tensor2d(self.trainOutputBuff);
  };

  /**
   * A helper function that creates the test data for a network epoch
   *
   * @param {number} sampleLen the length of a training example in characters
   */
  self.textTestData = (sampleLen) => {
    let val = 0;
    const testInputSequence = [];
    let offset = self.textData.exampleBeginIndices[0];
    // If we exceed the end of the book, go back a little
    if ((offset + sampleLen + self.testOutputs) >= self.textData.textLen) {
      offset = offset - self.textOutputs;
    }
    // Generate the test input data
    for (let j = 0; j < sampleLen; j++) {
      // Add noise to the input data
      val = self.textData.indices[j + offset];
      const valueArray = new Array(self.textData.charSetSize).fill(0);
      valueArray[val] = 1;
      testInputSequence.push(valueArray);
      self.chartDataInput.push(valueArray);
      self.chartPredictionInput.push(valueArray);
    }
    self.testInputBuff.push(testInputSequence);
    const currentOutSequence = [];
    let x;
    for (let j = 0; j < self.testOutputs; j++) {
      x = sampleLen + j + offset;
      val = self.textData.indices[x];
      const valueArray = new Array(self.textData.charSetSize).fill(0);
      valueArray[val] = 1;
      currentOutSequence.push(valueArray);
      self.chartDataOutput.push(valueArray);
    }
    self.chartDataInput.push();
    self.chartPredictionInput.push();
    self.testInput = testInputSequence;
  };

  /**
   * Generate the example-begin indices; shuffle them randomly.
   *
   * @param {number} sampleLen the length of a training example in characters
   */
  self.generateExampleBeginIndices = (sampleLen) => {
    // Prepare beginning indices of examples.
    self.textData.exampleBeginIndices = [];
    for (let i = 0; i < self.textData.textLen - sampleLen - 1; i += 1) {
      self.textData.exampleBeginIndices.push(i);
    }
    // Randomly shuffle the beginning indices.
    tf.util.shuffle(self.textData.exampleBeginIndices);
    self.textData.examplePosition = 0;
  };
};
