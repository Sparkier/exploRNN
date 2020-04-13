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
    epoch: {
      title: 'Epochs',
      description: 'When training a Neural Network, a set of training data is' +
        ' used to change the weight and thus knowlege that is entangled in a ' +
        'model. One Epoch describes ' +
        'one cycle through this data set. Each Epoch the data is split up ' +
        'into batches of equal size. After each batch of data is used to ' +
        'get the predictions a total error is calculated and the network ' +
        'is trained via backpropagation.',
    },
    // Training steps in both views
    trainSteps: [
      {
        id: 0,
        title: 'Prediction',
        description: 'A random sample input is shown to the network value by ' +
          'value. The network than makes a predicition on how this sample ' +
          'would continue over time.',
        longDescription: 'The goal of the training process is to teach the ' +
          'network to make as good a prediction as possible. To tell how ' +
          'good the network currently is in its predictive abilities we ' +
          'first need to get predictions for some inputs. The network is ' +
          'shown these inputs and it calculates the values that it thinks ' +
          'should come next.',
        note: ' To see how the values are calculated and ' +
          'where the recurrent in RNN stems from you can click on one of ' +
          'the cells to get a more detailed explanation.',
      },
      {
        id: 1,
        title: 'Validation',
        description: 'The predicted values are compared to the target values ' +
          'and the total loss is calculated.',
        longDescription: 'Since we know the continuation of the inputs we ' +
          'used for the prediction beforehand, we can now check how far off ' +
          'this prediction was. This is used as the error between prediciton ' +
          'and reality to evaluate how the network has to be adjusted to ' +
          'make better predictions the next time. In the small error ' +
          'element you can see the error between a prediction and ' +
          'the real values.',
      },
      {
        id: 2,
        title: 'Training',
        description: 'The net is told how far off its prediction was and ' +
          'then tries to update its inner variables.',
        longDescription: 'Now comes the actual training part of the training' +
          ' process. We now know for some inputs how well the network can ' +
          'predict the continuation of the given functions. With this ' +
          'knowledge we can backtrack the prediction process through the ' +
          'cells and through the time steps. With this so called ' +
          'backpropagation through time we can adjust the weights in the' +
          ' cells to minimize the difference between prediction and reality.',
      },
    ],
    // Steps in the pane at the bottom left of the cell view
    lstmSteps: [
      {
        id: 0,
        title: 'Input',
        description: 'The cell waits for all necessary inputs.',
        longDescription: 'In this first step the cell waits for the inputs ' +
          'to arrive. In the first time step only the outputs from the ' +
          'previous layer will reach this input. In all later time ' +
          'steps the recurrent output from this cell itself is also used as' +
          ' an input for the coming calculations. With this cyclic stream of' +
          ' information the cell can learn the dependencies between old and' +
          ' new values.',
      },
      {
        id: 1,
        title: 'Layer Input',
        description: 'The inputs from this layer and the previous layer are ' +
        'combined and used in all gates and to update the memory.',
        longDescription: 'Once all necessary input values have reached the ' +
          'cell input these values are used to form an input for this' +
          ' layer. This input contains information about the new time step' +
          ' as well as information about the previous state of the ' +
          'current cell.',
      },
      {
        id: 2,
        title: 'Gate Activation',
        description: 'The new input is processed by the input and forget gate.',
        longDescription: 'With the layer input now sent to the gates of the' +
          ' cell the gates can calculate filters for the input and cell ' +
          'state. The input gate determines ' +
          'a filter that will be used to extract the relevant new ' +
          'information from the block input. At the same time the forget' +
          ' gate also calculates a data filter which is used to' +
          ' determine which values of the cell state are not relevant anymore' +
          ' and can be forgotten.',
      },
      {
        id: 3,
        title: 'Cell Update',
        description: 'The processed values are combined to ' +
          'update the cell state.',
        longDescription: 'With the input and forget gate having calculated' +
          ' their filters the cell state update can now be determined.',
      },
      {
        id: 4,
        title: 'Cell State',
        description: 'The cell state is updated',
        longDescription: 'The cell state is now updated based on the gates ' +
          'that determine what part of the input and what part of the cell ' +
          'state from the previous time step should be used as the new cell ' +
          'state.',
      },
      {
        id: 5,
        title: 'Output',
        description: 'The cell state is transformed by the output gate ' +
          'before being sent to the next layer.',
        longDescription: 'Since the information in memory cell is a mix of' +
          ' relevant information for this cell, the output gate' +
          ' now tries to extract the valuable information that can be sent' +
          ' to the following layer. This output is also used as input of the' +
          ' current cell for the next time step.',
      },
    ],
    defaultDescription: '[missing description]',
    // Elements in the cell view
    lstmGates: [
      {
        id: 0,
        title: 'Layer Input',
        description: 'The cell waits until it gets all data it needs as ' +
          'input for all calculations. These inputs are the ceell output of ' +
          'the previous time step, and the output of the cell which precedes ' +
          'the inspected cell.',
        formulas: [
        ],
      },
      {
        id: 1,
        title: 'Input Gate',
        description: 'The input gate is used as a measure for what part of ' +
          'the input is being used for updating the cell state with new ' +
          'information. The input gate is a filter used to calculate the new ' +
          'cell state.',
        formulas: [
          'i^t = sigmoid(W_{ix}x^t + W_{ia}a^{t-1} + b_i)',
          'i^t: \\text{the input gate}',
          'x^t: \\text{the input from the previous cell at time step t}',
          'a^{t-1}: \\text{the activation of this cell from the previous ' +
            'time step}',
          'W: \\text{trainable weight parameters}',
          'b: \\text{trainable bias parameters}',
        ],
      },
      {
        id: 2,
        title: 'Forget Gate',
        description: 'The forget gate determines what part of the ' +
          'old cell state is relevant for future calculations and which ' +
          'values can be forgotten. The forget gate is a filter used to ' +
          'calculate the new cell state.',
        formulas: [
          'f^t = sigmoid(W_{fx}x^t + W_{fa}a^{t-1} + b_f)',
          'f^t: \\text{the forget gate}',
          'x^t: \\text{the input from the previous cell at time step t}',
          'a^{t-1}: \\text{the activation of this cell from the previous ' +
            'time step}',
          'W: \\text{trainable weight parameters}',
          'b: \\text{trainable bias parameters}',
        ],
      },
      {
        id: 3,
        title: 'Output Gate',
        description: 'The output gate is responsible for filtering what part ' +
          'of the current cell state is used as the output activation of the ' +
          'cell. Using the output gate, one can then comput the cell ' +
          'activation, which is used as input to the next cell, as well as ' +
          'recurrently in the same cell at the next time step. The gate ' +
          'value and the output activation are computed as:',
        formulas: [
          'o^t = sigmoid(W_{ox}x^t + W_{oa}a^{t-1} + b_o)',
          'a^t = o^t \\circ tanh(c^t)',
        ],
      },
      {
        id: 4,
        title: 'State Update',
        description: 'To update the cell state, both, the forget gate and ' +
          'the update gate are needed in combination with the cell input and ' +
          'the output of the cell from the previous time step.',
        formulas: [
        ],
      },
      {
        id: 5,
        title: 'Memory Cell',
        description: 'This is the memory cell, also called the cell state. ' +
          'It represents an internal memory of this cell block that contains ' +
          'relevant information about all previous time steps. When training ' +
          'the network the error of the output is sent backwards through ' +
          'by calculating the error gradients of all the cell components. ' +
          'While normal RNN suffer from information losses because of the ' +
          'many gradients decreasing the error over time the LSTM memory ' +
          'cell overcomes this problem by sending the error with a constant ' +
          'weight back in time. This makes the LSTM architecture capable of ' +
          'learning long time distance dependencies.',
        formulas: [
          'c^t = f^t \\circ c^{t-1} + i^t \\circ tanh(W_{cx}x^t + ' +
            'W_{ca}a^{t-1} + b_c)',
          'i^t: \\text{the input gate}',
          'f^t: \\text{the forget gate}',
          'c^t: \\text{the cell state}',
          'x^t: \\text{the input from the previous cell at time step t}',
          'a^{t-1}: \\text{the activation of this cell from the previous ' +
            'time step}',
          'W: \\text{trainable weight parameters}',
          'b: \\text{trainable bias parameters}',
        ],
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
      description: 'The learning rate is basically a value that describes ' +
        'the importance the network gives to the adjustments given by the ' +
        'training process. The higher this rate is the stronger the network ' +
        'changes its weights in the training step. The better a network is ' +
        'at prediciting values the smaller this value can be. For this ' +
        'application you can chose one rate value and explore how this ' +
        'effects the training process. Note that for a change in this value' +
        ' to be effective the network has to be regenerated first.',
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
      description: 'If we would try to train the network after each and ' +
        'every input that we have in our training data the training would ' +
        'take a very long time. To try and reduce the amount of ' +
        'backpropagation steps in the training process the data set is ' +
        'bundled into so called batches. Each batch contains a set amount ' +
        'of data from the training data and only after all the data in one ' +
        'batch is used up the network is being trained with the total error' +
        ' of this batch. Since we then have less steps the training is done ' +
        'more quickly, but because we only train on a total error we might ' +
        'lose information of the individual outputs given by the net.',
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
      description: 'If we only check if the net can recreate given functions ' +
        'we are prone to overfitting. Meaning we could not check if the ' +
        'network can handle inputs not specifically used in the training ' +
        'process. To give the network a more challenging task we try to ' +
        'distort the input values to see if the network can cancel out this ' +
        'noise. The higher this noise is the harder it is for the network ' +
        ' to recognize the underlying function. Therefore the other values ' +
        'need be selected more carefully.',
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
