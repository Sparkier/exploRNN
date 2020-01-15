export default {
  title: 'leaRNN',
  strings: {
    controlsTitle: 'Controls',
    epochTitle: 'Epochs',
    rateTitle: 'Learning Rate',
    noiseTitle: 'Noise',
    batchTitle: 'Batch Size',
    trainSteps: [
      {
        id: 0,
        title: 'Input',
        description: 'An example of input is given to the net which presents ' +
          'a prediction',
      },
      {
        id: 1,
        title: 'Validation',
        description: 'The prediction is compared to the actual solution',
      },
      {
        id: 2,
        title: 'Training',
        description: 'The deviation is given back to the net so that it can ' +
          'learn to make better predictions',
      },
    ],
    lstmSteps: [
      {
        id: 0,
        title: 'Input',
        description: 'The cell waits for all necessary inputs',
      },
      {
        id: 1,
        title: 'Layer Input',
        description: 'The inputs from this and the previous layer are combined',
      },
      {
        id: 2,
        title: 'Gate Activation',
        description: 'The new input is processed by the input and forget gate',
      },
      {
        id: 3,
        title: 'Cell Update',
        description: 'The processed values are combined to create a ' +
          'cell update',
      },
      {
        id: 4,
        title: 'Cell State',
        description: 'The cell state is updated',
      },
      {
        id: 5,
        title: 'Output',
        description: 'The cell state is transformed by the output gate ' +
          'before being outputted',
      },
    ],
    defaultDescription: '[missing description]',
  },
  types: [
    {name: 'RNN'},
    {name: 'LSTM'},
    {name: 'GRU'},
  ],
  fontSize: {
    small: 14,
    default: 16,
    title: 18,
    header: 20,
  },
  sliders: [
    {
      key: 0,
      title: 'Learning Rate',
      step: 0.005,
      min: 0.01,
      max: 0.25,
      marks: [
        {
          value: 0.01,
          label: 0.01,
        },
        {
          value: 0.1,
          label: 0.1,
        },
        {
          value: 0.2,
          label: 0.2,
        },
        {
          value: 0.25,
          label: 0.25,
        },
      ],
    },
    {
      key: 1,
      title: 'Noise',
      step: 0.01,
      min: 0,
      max: 100,
      marks: [
        {
          value: 0,
          label: '0%',
        },
        {
          value: 50,
          label: '50%',
        },
        {
          value: 100,
          label: '100%',
        },
      ],
    },
    {
      key: 2,
      title: 'Batch Size',
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
  ],
};
