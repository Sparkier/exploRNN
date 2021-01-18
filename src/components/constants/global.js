import descriptionStrings from './descriptionStrings';

// This file declares the global strings and values used in the application
const globalENG = {
  title: 'exploRNN',
  strings: {
    controlsTitle: 'Controls',
    lossTitle: 'Error',
    plotInput: 'Input',
    plotOutput: 'Target',
    plotPrediction: 'Prediction',
    tooltipCell: 'click for detail',
    tooltipDelete: 'remove layer',
    tooltipAdd: 'add layer',
    dataExplanation: 'A random 🎲 element of the dataset\nis shown for each ' +
    'epoch.',
    backpropExplanation: 'A series of predictions is shown, however,\nfor ' +
    'backpropagation, only the first prediction is considered.',
    epoch: {
      title: 'Epochs ⓘ',
      description: descriptionStrings['ENG'].epoch,
    },
    // Onboarding
    onboarding: {
      welcome: {
        title: 'Welcome to exploRNN!',
        description: descriptionStrings['ENG'].welcome,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Next',
        },
        arrow: 'none',
        style: {
          position: 'absolute',
          top: ' 300px',
          left: 'calc(50% - 250px)',
        },
      },
      contrast: {
        title: 'Recurrent Networks',
        description: descriptionStrings['ENG'].contrast,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Next',
        },
        arrow: 'left',
        style: {
          position: 'absolute',
          top: ' 200px',
          left: '10%',
        },
      },
      input: {
        title: 'Training Input',
        description: descriptionStrings['ENG'].inputOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Next',
        },
        arrow: 'left',
        style: {
          position: 'absolute',
          top: ' 200px',
          left: '10%',
        },
      },
      network: {
        title: 'Network',
        description: descriptionStrings['ENG'].networkOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Next',
        },
        arrow: 'up',
        style: {
          position: 'absolute',
          top: 'calc(100% - 45vh)',
          left: 'calc(35% - 250px)',
        },
      },
      startTraining: {
        title: 'Start Training',
        description: descriptionStrings['ENG'].startTrainingOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Lets Go!',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '26vh',
          left: 'calc(50% - 250px)',
        },
      },
      output: {
        title: 'Validation',
        description: descriptionStrings['ENG'].outputOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'right',
        style: {
          position: 'absolute',
          top: '200px',
          left: 'calc(60% - 535px)',
        },
      },
      cellTransition: {
        title: 'LSTM Cells',
        description: descriptionStrings['ENG'].cellTransitionOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Sure!',
        },
        arrow: 'up',
        style: {
          position: 'absolute',
          top: 'calc(100% - 45vh)',
          left: 'calc(35% - 250px)',
        },
      },
      detailOutput: {
        title: 'Data Processing per Cell',
        description: descriptionStrings['ENG'].detailOutputOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'right',
        style: {
          position: 'absolute',
          top: '200px',
          left: 'calc(50% - 535px)',
        },
      },
      detailCell: {
        title: 'Cell Components',
        description: descriptionStrings['ENG'].detailCellOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Nice!',
        },
        arrow: 'left',
        style: {
          position: 'absolute',
          top: '200px',
          left: '50%',
        },
      },
      detailProcess: {
        title: 'Process',
        description: descriptionStrings['ENG'].processOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '40vh',
          left: 'calc(21% - 250px)',
        },
      },
      sliders: {
        title: 'Sliders',
        description: descriptionStrings['ENG'].slidersOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '40vh',
          left: 'calc(79% - 250px)',
        },
      },
      slidersExplained: {
        title: 'Sliders Functionality',
        description: descriptionStrings['ENG'].slidersExplainedOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '40vh',
          left: 'calc(79% - 250px)',
        },
      },
      lowLR: {
        title: 'Low Learning Rate',
        description: descriptionStrings['ENG'].lowLROnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '37vh',
          left: 'calc(60% - 250px)',
        },
      },
      highLR: {
        title: 'High Learning Rate',
        description: descriptionStrings['ENG'].highLROnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '37vh',
          left: 'calc(60% - 250px)',
        },
      },
      medLR: {
        title: 'Medium Learning Rate',
        description: descriptionStrings['ENG'].medLROnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '37vh',
          left: 'calc(60% - 250px)',
        },
      },
      lowBS: {
        title: 'Low Batch Size',
        description: descriptionStrings['ENG'].lowBSOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '24vh',
          left: 'calc(60% - 250px)',
        },
      },
      highBS: {
        title: 'High Batch Size',
        description: descriptionStrings['ENG'].highBSOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '24vh',
          left: 'calc(60% - 250px)',
        },
      },
      medBS: {
        title: 'Medium Batch Size',
        description: descriptionStrings['ENG'].medBSOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '24vh',
          left: 'calc(60% - 250px)',
        },
      },
      noNoise: {
        title: 'No Noise',
        description: descriptionStrings['ENG'].noNoiseOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '11vh',
          left: 'calc(60% - 250px)',
        },
      },
      medNoise: {
        title: 'Some Noise',
        description: descriptionStrings['ENG'].medNoiseOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '11vh',
          left: 'calc(60% - 250px)',
        },
      },
      highNoise: {
        title: 'High Noise',
        description: descriptionStrings['ENG'].highNoiseOnboarding,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Ok',
        },
        arrow: 'down',
        style: {
          position: 'absolute',
          bottom: '11vh',
          left: 'calc(60% - 250px)',
        },
      },
      headingExplanation: {
        title: 'Explore',
        description: descriptionStrings['ENG'].headingExplanation,
        buttonTitles: {
          skip: 'Skip Intro',
          next: 'Explore',
        },
        arrow: 'none',
        style: {
          position: 'absolute',
          top: ' 300px',
          left: 'calc(50% - 250px)',
        },
      },
    },
    // Training steps in both views
    trainSteps: [
      {
        id: 0,
        title: 'Forward ⓘ',
        description: 'Data is shown to the network value by value to build ' +
        'up the internal state. After a fixed number of data points has been ' +
        'processed, the network can make a prediction on how this sample ' +
        'would continue.',
        longDescription: descriptionStrings['ENG'].forward,
      },
      {
        id: 1,
        title: 'Validation ⓘ',
        description: 'The predicted values are compared to the correct ' +
        'values (ground truth) from the training dataset. The difference is ' +
        'used to calculate the loss.',
        longDescription: descriptionStrings['ENG'].validation,
      },
      {
        id: 2,
        title: 'Backward ⓘ',
        description: 'The calculated loss is backpropagated through the ' +
        'network as well as through time (reverting the input timesteps), to ' +
        'find out where the prediction error came from and update the ' +
        'network variables for the next iteration.',
        longDescription: descriptionStrings['ENG'].backward,
      },
    ],
    // Steps in the pane at the bottom left of the cell view
    lstmSteps: [
      {
        id: 0,
        title: 'Layer Input ⓘ',
        description: 'The inputs from the previous layer is combined with ' +
        'the output of this layer from the last time step. The layer input ' +
        'is then used in all gates.',
        longDescription: descriptionStrings['ENG'].layerInputStep,
      },
      {
        id: 1,
        title: 'Gate Activation ⓘ',
        description: 'All gates are using the layer input to determine what ' +
        'information should be use to update the cell state with, and what ' +
        'part of the cell state should be output from this cell.',
        longDescription: descriptionStrings['ENG'].gateStep,
      },
      {
        id: 2,
        title: 'Cell Update ⓘ',
        description: 'The input gate filters the layer input to update the ' +
        'cell state, whereas the forget gate determines what old cell state ' +
        'values should be forgotten.',
        longDescription: descriptionStrings['ENG'].updateStep,
      },
      {
        id: 3,
        title: 'Output ⓘ',
        description: 'The cell state is filtered by the output gate to ' +
        'compute the output activation and send it as a input to the next ' +
        'layer.',
        longDescription: descriptionStrings['ENG'].outputStep,
      },
    ],
    // Headings throughout the application
    headings: [
      {
        id: 1,
        identifier: 'input',
        title: 'Input ⓘ',
        description: descriptionStrings['ENG'].inputHeading,
      },
      {
        id: 2,
        identifier: 'network',
        title: 'Network ⓘ',
        description: descriptionStrings['ENG'].networkHeading,
      },
      {
        id: 3,
        identifier: 'prediction',
        title: 'Prediction ⓘ',
        description: descriptionStrings['ENG'].predictionHeading,
      },
      {
        id: 4,
        identifier: 'cell',
        title: 'LSTM Cell ⓘ',
        description: descriptionStrings['ENG'].cellHeading,
      },
      {
        id: 5,
        identifier: 'cellPlot',
        title: 'Network Data ⓘ',
        description: descriptionStrings['ENG'].cellPlotHeading,
      },
    ],
    // Elements in the cell view
    lstmGates: [
      {
        id: 0,
        title: 'Layer Input',
        description: descriptionStrings['ENG'].layerInput,
      },
      {
        id: 1,
        title: 'Input Gate',
        description: descriptionStrings['ENG'].inputGate,
      },
      {
        id: 2,
        title: 'Forget Gate',
        description: descriptionStrings['ENG'].forgetGate,
      },
      {
        id: 3,
        title: 'Output Gate',
        description: descriptionStrings['ENG'].outputGate,
      },
      {
        id: 4,
        title: 'State Update',
        description: descriptionStrings['ENG'].stateUpdate,
      },
      {
        id: 5,
        title: 'Memory Cell',
        description: descriptionStrings['ENG'].memoryCell,
      },
    ],
  },
  types: [
    {name: 'RNN', disabled: true},
    {name: 'LSTM', disabled: false},
    {name: 'GRU', disabled: true},
  ],
  inputTypes: [
    {name: 'Text Data', disabled: false},
    {name: 'Function Data', disabled: false},
  ],
  languages: [
    {name: 'ENG'},
    {name: 'GER'},
  ],
  fontSize: {
    small: 14,
    default: 16,
    title: 18,
    header: 20,
  },
  // Sliders for the training parameters
  sliders: [
    {
      key: 0,
      title: 'Learning Rate ⓘ',
      description: descriptionStrings['ENG'].learningRate,
      step: 0.01,
      min: -3,
      max: 1,
      marks: [
        {
          value: -3,
          label: 0.0001,
        },
        {
          value: -2,
          label: 0.001,
        },
        {
          value: -1,
          label: 0.01,
        },
        {
          value: 0,
          label: 0.1,
        },
        {
          value: 1,
          label: 1,
        },
      ],
    },
    {
      key: 1,
      title: 'Batch Size ⓘ',
      description: descriptionStrings['ENG'].batchSize,
      step: 1,
      min: 5,
      max: 50,
      marks: [
        {
          value: 5,
          label: '5',
        },
        {
          value: 25,
          label: '25',
        },
        {
          value: 50,
          label: '50',
        },
      ],
    },
    {
      key: 2,
      title: 'Noise ⓘ',
      description: descriptionStrings['ENG'].noise,
      step: 0.01,
      min: 0.0,
      max: 0.4,
      marks: [
        {
          value: 0,
          label: '0.0',
        },
        {
          value: 0.2,
          label: '0.2',
        },
        {
          value: 0.4,
          label: '0.4',
        },
      ],
    },
  ],
};

export default {ENG: globalENG};
