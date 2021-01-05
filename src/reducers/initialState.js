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
    inputType: 'Function Data', // Type of input the network can handle
    dataTypes: ['sin'], // data used for this training
    noise: 0.0, // max noise to be added to the data
    values: 0, // how many datapoints are fed into the network
    predictions: 0, // how many values to predict, calculated by the period
    dataSetSize: 100, // how many datapoints one epoch contains
    batchSize: 25, // how many items to feed to the network per batch
    stepSize: 0.2, // distance between two datapoints from the functions
    reset: false, // whether to reset the model
    step: false, // whether a training step is to be made
    workerReady: true, // the worker is ready for training commands
    save: false, // whether the model should be saved
  },
  pretrained: {
    model: '',
  },
  ui: {
    running: false, // Training running
    ready: true, // At beginning of training step, ready to start training
    detail: false, // Currently in detail view
    netAnim: false, // Network currently animating
    anim: true, // Detail cell currently animating
    animStep: false, // Detail cell step is executed
    lstmStep: 0, // Current step in the detail cell
    trainingStep: 0, // Whether in forward, prediction, or backward pass (1,2,3)
    state: [true, false, false], // Cell View: Forward/Prediction/Backward pass
    trigger: [false, false, false], // Animation trigger (forw./pred./backw.)
    detailSpeed: 1.0, // The speed at which animations in detail advance
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
    stepDialog: [false, false, false, false],
    // Dialog for epochs at bottom center
    epochDialog: false,
    // Dialog for the about section in the drawer
    aboutDialog: false,
    // Dialog for the faq section in the drawer
    faqDialog: false,
    // Dialog for the imprint section in the drawer
    impressumDialog: false,
    // Dialog for the headings of the sketch
    headingDialog: '',
  },
  alertSnack: {
    open: false,
    message: '',
  },
  textData: {},
  cookiesState: {
    intro: '',
  },
};
