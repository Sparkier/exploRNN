import descriptionStrings from './descriptionStrings';

// This file declares the global strings and values used in the application
const globalENG = {
  title: 'exploRNN',
  strings: {
    controlsTitle: 'Controls',
    inputTitle: 'Input',
    networkTitle: 'Network',
    cellTitle: 'LSTM Cell',
    cellPlotTitle: 'Network Output',
    lossTitle: 'Error',
    predictionTitle: 'Prediction',
    plotInput: 'Input',
    plotOutput: 'Target',
    plotPrediction: 'Prediction',
    tooltipCell: 'click for detail',
    tooltipDelete: 'remove layer',
    tooltipAdd: 'add layer',
    dataExplanation: 'We show a random 🎲 element of the dataset for each ' +
    'epoch\n to illustrate the training progress.',
    epoch: {
      title: 'Epochs',
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
          top: 'calc(100% - 40vh)',
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
          top: 'calc(100% - 40vh)',
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
          next: 'Magnifying!',
        },
        arrow: 'left',
        style: {
          position: 'absolute',
          top: '200px',
          left: '50%',
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
        title: 'Forward',
        description: 'A random sample input is shown to the network value by ' +
          'value. The network than makes a predicition on how this sample ' +
          'would continue over time.',
        longDescription: descriptionStrings['ENG'].forward,
      },
      {
        id: 1,
        title: 'Validation',
        description: 'The predicted values are compared to the target values ' +
          'and the total loss is calculated.',
        longDescription: descriptionStrings['ENG'].validation,
      },
      {
        id: 2,
        title: 'Backward',
        description: 'The net is told how far off its prediction was and ' +
          'then tries to update its inner variables.',
        longDescription: descriptionStrings['ENG'].backward,
      },
    ],
    // Steps in the pane at the bottom left of the cell view
    lstmSteps: [
      {
        id: 0,
        title: 'Layer Input',
        description: 'The inputs from this layer and the previous layer are ' +
        'combined and used in all gates and to update the memory.',
        longDescription: descriptionStrings['ENG'].layerInputStep,
      },
      {
        id: 1,
        title: 'Gate Activation',
        description: 'The new input is processed by the input and forget gate.',
        longDescription: descriptionStrings['ENG'].gateStep,
      },
      {
        id: 2,
        title: 'Cell Update',
        description: 'The processed values are combined to ' +
          'update the cell state.',
        longDescription: descriptionStrings['ENG'].updateStep,
      },
      {
        id: 3,
        title: 'Output',
        description: 'The cell state is transformed by the output gate ' +
          'before being sent to the next layer.',
        longDescription: descriptionStrings['ENG'].outputStep,
      },
    ],
    headings: [
      {
        id: 1,
        identifier: 'input',
        title: 'Input',
        description: descriptionStrings['ENG'].inputHeading,
      },
      {
        id: 2,
        identifier: 'network',
        title: 'Network',
        description: descriptionStrings['ENG'].networkHeading,
      },
      {
        id: 3,
        identifier: 'prediction',
        title: 'Prediction',
        description: descriptionStrings['ENG'].predictionHeading,
      },
      {
        id: 4,
        identifier: 'predictionText',
        title: 'Prediction',
        description: descriptionStrings['ENG'].predictionTextHeading,
      },
      {
        id: 5,
        identifier: 'cell',
        title: 'LSTM Cell',
        description: descriptionStrings['ENG'].cellHeading,
      },
      {
        id: 6,
        identifier: 'cellPlot',
        title: 'Network Data',
        description: descriptionStrings['ENG'].cellPlotHeading,
      },
    ],
    defaultDescription: '[missing description]',
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
      title: 'Learning Rate',
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
      title: 'Batch Size',
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
      title: 'Noise',
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
