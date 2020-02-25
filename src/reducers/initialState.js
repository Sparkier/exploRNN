// Set the initial State of the Application
export default {
  network: {
    data: {
      chartIn: [],
      chartOut: [],
      chartPred: [],
    },
    layerSize: 16, // amount of memory cells per block
    layers: 3,
    learningRate: 0.025,
    iteration: 0, // equal to the amount of epochs
    type: 'LSTM',
    activation: 'tanh',
  },
  training: {
    running: false,
    ready: true,
    dataTypes: ['sin'],
    dataVariant: 'random', // deprecated
    noise: 50, // in percent
    values: 0,
    predictions: 0,
    dataSetSize: 100,
    batchSize: 25,
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
    help: false,
    language: 'ENG',
    inputDialog: [false, false, false],
    sliderDialog: [false, false, false],
    cellDialog: [false, false, false, false, false, false],
    stepDialog: [false, false, false, false, false, false],
    epochDialog: false,
    aboutDialog: false,
    faqDialog: false,
    impressumDialog: false,
  },
  firstcall: true,
};
