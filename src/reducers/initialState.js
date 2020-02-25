// Set the initial State of the Application
export default {
  network: {
    // State of the input and predictions
    data: {
      chartIn: [],
      chartOut: [],
      chartPred: [],
    },
    layerSize: 16, // amount of memory cells per block
    layers: 3, // amount of blocks
    learningRate: 0.025, // initial learning rate
    iteration: 0, // equal to the amount of epochs
    type: 'LSTM', // layer type
    activation: 'tanh', // activation function
  },
  training: {
    running: false, // currently training
    dataTypes: ['sin'], // data used for this training
    noise: 50, // noise to be added to the data, in percent
    values: 0, // how many datapoints are fed into the network
    predictions: 0, // how many values to predict, calculated by the period
    dataSetSize: 10000,
    batchSize: 25, // how many items to feed to the network per batch
    testOffset: 0,
    stepSize: 0.1,
    reset: false,
    step: false,
    workerReady: true,
  },
  ui: {
    running: false,
    ready: true,
    detail: false,
    data: new Array(5).fill({}),
    netAnim: false,
    anim: true,
    animStep: false,
    lstmStep: 0,
    plotStep: 0,
    trainingStep: 0,
    cellAnimStep: 0,
    panelHeight: 0,
    state: [true, false, false],
    trigger: [false, false, false],
  },
  /*
  * for dialog boolean arrays check the global constants
  * (src/components/constants/global.js) to compare the id
  * values of the corresponding objects
  */
  appState: {
    // Help opened
    help: false,
    // App language
    language: 'ENG',
    // Dialogs on the steps prediction, validation, training, overview right
    inputDialog: [false, false, false],
    // Dialogs on LR, noise, batch size, overview left
    sliderDialog: [false, false, false],
    // Dialogs for the detail cell components
    cellDialog: [false, false, false, false, false, false],
    // Dialogs for the steps in the detail cell
    stepDialog: [false, false, false, false, false, false],
    // Dialog for epochs at bottom center
    epochDialog: false,
    // Dialog for the about section in the drawer
    aboutDialog: false,
    // Dialog for the faq section in the drawer
    faqDialog: false,
    // Dialog for the imprint section in the drawer
    impressumDialog: false,
  },
};
