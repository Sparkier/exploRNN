const descriptionsENG = {
  epoch: [
    [
      {
        'type': 'plain',
        'text': 'When training a Neural Network, a lot of data used to learn ' +
        'how to change the weights is fed into the network. This data ' +
        'is usually ',
      },
      {
        'type': 'highlighted',
        'text': 'fed into the network in small batches.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Once all batches in the whole dataset have been processed, ' +
        'one ',
      },
      {
        'type': 'highlighted',
        'text': 'epoch ',
      },
      {
        'type': 'plain',
        'text': 'is finished. This means that the network has been trained on ',
      },
      {
        'type': 'highlighted',
        'text': 'each item in the dataset once',
      },
      {
        'type': 'plain',
        'text': '.',
      },
    ],
  ],
  welcome: [
    [
      {
        'type': 'plain',
        'text': 'This application is designed so you can experiment with, and ',
      },
      {
        'type': 'highlighted',
        'text': 'learn about recurrent neural networks ',
      },
      {
        'type': 'plain',
        'text': '(RNNs).',
      },
    ],
  ],
  inputOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'Here, you can change which ',
      },
      {
        'type': 'highlighted',
        'text': 'function or text sample is used for training.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'In contrast to fully connected or ' +
        'convolutional neural networks, RNNs are designed to work with ',
      },
      {
        'type': 'highlighted',
        'text': 'sequential data.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Thus, they are used for tasks such as ',
      },
      {
        'type': 'highlighted',
        'text': 'translation, image captioning, and next element prediction.',
      },
    ],
  ],
  networkOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'This is the network that you can train. ',
      },
      {
        'type': 'highlighted',
        'text': 'Feel free to modify it.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'You can ',
      },
      {
        'type': 'highlighted',
        'text': 'add layers by clicking the + between the layers ',
      },
      {
        'type': 'plain',
        'text': 'and ',
      },
      {
        'type': 'highlighted',
        'text': 'remove them by hovering and clicking the red x.',
      },
    ],
  ],
  startTrainingOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'Now, lets ',
      },
      {
        'type': 'highlighted',
        'text': 'start the training by hitting the play button!',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'You can also advance individual epochs using the forward ' +
        'button.',
      },
    ],
  ],
  outputOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'Here, you can see how you network ',
      },
      {
        'type': 'highlighted',
        'text': 'currently performs.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'We show the prediction for a ',
      },
      {
        'type': 'highlighted',
        'text': 'random dataset exmple in each epoch.',
      },
    ],
  ],
  cellTransitionOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'Now that we have trained the network for a while, lets look ',
      },
      {
        'type': 'highlighted',
        'text': 'what happens inside an LSTM cell.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'To do this, simply ',
      },
      {
        'type': 'highlighted',
        'text': 'click on one of the layers.',
      },
    ],
  ],
  detailOutputOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'Here, the training progresses in slow-motion. You can see ' +
        'the cell build up its ',
      },
      {
        'type': 'highlighted',
        'text': 'internal memory from the input values in the grey box.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The network then makes a prediction based on this ',
      },
      {
        'type': 'highlighted',
        'text': 'internal state.',
      },
    ],
  ],
  detailCellOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'This is a LSTM cell, which is used throughout the network. ' +
        'Here, you can look into what ',
      },
      {
        'type': 'highlighted',
        'text': 'individual components of this cell do.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Simply click one of the compute elements, to get a ',
      },
      {
        'type': 'highlighted',
        'text': 'detailed description.',
      },
    ],
  ],
  headingExplanation: [
    [
      {
        'type': 'plain',
        'text': 'To get more information of individual components of this ' +
        'app, ',
      },
      {
        'type': 'highlighted',
        'text': 'simply click any heading in this visualization.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Now, have fun ',
      },
      {
        'type': 'highlighted',
        'text': 'exploring RNNs!',
      },
    ],
  ],
  learningRate: [
    [
      {
        'type': 'plain',
        'text': 'The learning rate specifies, ',
      },
      {
        'type': 'highlighted',
        'text': 'how much the network weights are updated.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'High learning rates mean, that the prediction error leads to ',
      },
      {
        'type': 'highlighted',
        'text': 'bigger updates, ',
      },
      {
        'type': 'plain',
        'text': 'changing the network a lot. In practice, this means, that ' +
        'the network learns faster. However, when the learning rate is ' +
        'too high, the network will overshoot, and ',
      },
      {
        'type': 'highlighted',
        'text': 'never get to an optimal state.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'If the learning rate is super low, the chance that the ' +
        'network finds the optimal solution is ',
      },
      {
        'type': 'highlighted',
        'text': 'higher',
      },
      {
        'type': 'plain',
        'text': ', but it will learn much ',
      },
      {
        'type': 'highlighted',
        'text': 'slower.',
      },
    ],
  ],
  batchSize: [
    [
      {
        'type': 'plain',
        'text': 'If we would train on every item individually, training would ',
      },
      {
        'type': 'highlighted',
        'text': 'take very long',
      },
      {
        'type': 'plain',
        'text': '. To circumvent this, we calculate the error for ',
      },
      {
        'type': 'highlighted',
        'text': 'multiple dataset items simultaneously.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Here, you can set how many training items are ',
      },
      {
        'type': 'highlighted',
        'text': 'combined in a so-called batch',
      },
      {
        'type': 'plain',
        'text': '. Weight updates are then made based on the error for the ',
      },
      {
        'type': 'highlighted',
        'text': 'whole batch.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Larger batches ',
      },
      {
        'type': 'highlighted',
        'text': 'speed up training',
      },
      {
        'type': 'plain',
        'text': ', but can lead to ',
      },
      {
        'type': 'highlighted',
        'text': 'a loss of focus on individual training samples.',
      },
    ],
  ],
  noise: [
    [
      {
        'type': 'plain',
        'text': 'If we only check if the net can recreate given functions ' +
        'we are prone to ',
      },
      {
        'type': 'highlighted',
        'text': 'overfitting',
      },
      {
        'type': 'plain',
        'text': '. Meaning the network only works well on the specific ' +
        'data used in the training process.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'In real world scenarios, measurements are almost ',
      },
      {
        'type': 'highlighted',
        'text': 'never perfect',
      },
      {
        'type': 'plain',
        'text': ', and we want the network to generalize to ',
      },
      {
        'type': 'highlighted',
        'text': 'unseen data.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'To give the network a more challenging and realistic task, ',
      },
      {
        'type': 'highlighted',
        'text': 'you can distort the input values',
      },
      {
        'type': 'plain',
        'text': '. The higher this noise is the harder it is for the network ' +
        ' to recognize the underlying function.',
      },
    ],
  ],
  forward: [
    [
      {
        'type': 'plain',
        'text': 'To teach the network how to continue a sequence, one needs ' +
        'to first ',
      },
      {
        'type': 'highlighted',
        'text': 'give the network data it can learn from.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The network then makes predictions based on this data, ' +
        'suggesting how it ',
      },
      {
        'type': 'highlighted',
        'text': 'currently thinks, the sequence would continue.',
      },
    ],
  ],
  validation: [
    [
      {
        'type': 'plain',
        'text': 'After a prediction is made on the training data, we can ',
      },
      {
        'type': 'highlighted',
        'text': 'calculate the prediction error.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'This is done by ',
      },
      {
        'type': 'highlighted',
        'text': 'comparing the prediction with what would actually be correct',
      },
      {
        'type': 'plain',
        'text': '. This is also referred to as comparing the prediction to ' +
        'the ',
      },
      {
        'type': 'highlighted',
        'text': 'ground truth.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'This difference is then used as the ',
      },
      {
        'type': 'highlighted',
        'text': 'loss',
      },
      {
        'type': 'plain',
        'text': ', which is important for the backward step.',
      },
    ],
  ],
  backward: [
    [
      {
        'type': 'plain',
        'text': 'After making predictions and calculating the loss, the ',
      },
      {
        'type': 'highlighted',
        'text': 'network weights get updated.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'This is done by ',
      },
      {
        'type': 'highlighted',
        'text': 'backpropagating the error through the network',
      },
      {
        'type': 'plain',
        'text': ', and for RNNs, also ',
      },
      {
        'type': 'highlighted',
        'text': 'through time.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Here, the network learns, how weights for ',
      },
      {
        'type': 'highlighted',
        'text': 'individual layers ',
      },
      {
        'type': 'plain',
        'text': '(backpropagation through network), but also for individual ',
      },
      {
        'type': 'highlighted',
        'text': 'timesteps of the input function ',
      },
      {
        'type': 'plain',
        'text': '(backpropagation through time), should be changed to ' +
        'the predictions.',
      },
    ],
  ],
  layerInputStep: [
    [
      {
        'type': 'plain',
        'text': 'Once all necessary input values have reached the ' +
          'cell input these values are used to form an input for this' +
          ' layer. This input contains information about the new time step' +
          ' as well as information about the previous state of the ' +
          'current cell.',
      },
    ],
  ],
  gateStep: [
    [
      {
        'type': 'plain',
        'text': 'With the layer input now sent to the gates of the' +
          ' cell the gates can calculate filters for the input and cell ' +
          'state. The input gate determines ' +
          'a filter that will be used to extract the relevant new ' +
          'information from the block input. At the same time the forget' +
          ' gate also calculates a data filter which is used to' +
          ' determine which values of the cell state are not relevant anymore' +
          ' and can be forgotten.',
      },
    ],
  ],
  updateStep: [
    [
      {
        'type': 'plain',
        'text': 'With the input and forget gate having calculated' +
          ' their filters the cell state update can now be determined.',
      },
    ],
  ],
  outputStep: [
    [
      {
        'type': 'plain',
        'text': 'Since the information in memory cell is a mix of' +
          ' relevant information for this cell, the output gate' +
          ' now tries to extract the valuable information that can be sent' +
          ' to the following layer. This output is also used as input of the' +
          ' current cell for the next time step.',
      },
    ],
  ],
  layerInput: [
    [
      {
        'type': 'plain',
        'text': 'For calculating all the gates, ',
      },
      {
        'type': 'highlighted',
        'text': 'both, the current input to the cell ',
      },
      {
        'type': 'plain',
        'text': 'and ',
      },
      {
        'type': 'highlighted',
        'text': 'the activation of the previous timestep ',
      },
      {
        'type': 'plain',
        'text': 'are needed.',
      },
    ],
  ],
  inputGate: [
    [
      {
        'type': 'plain',
        'text': 'The input gate is used as a measure for ',
      },
      {
        'type': 'highlighted',
        'text': 'what part of the input is used for updating the cell state ',
      },
      {
        'type': 'plain',
        'text': 'with new information.',
      },
      {
        'type': 'formulas',
        'formulas': [
          'i^t = sigmoid(W_{ix}x^t + W_{ia}a^{t-1} + b_i)',
        ],
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'It is used to calculate the ',
      },
      {
        'type': 'highlighted',
        'text': 'filtered input ',
      },
      {
        'type': 'plain',
        'text': 'to update the internal cell state.',
      },
      {
        'type': 'formulas',
        'formulas': [
          '\\text{filtered_input} = i^t \\circ tanh(W_{cx}x^t + ' +
          'W_{ca}a^{t-1} + b_c)',
        ],
      },
    ],
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Symbols:',
      },
      {
        'type': 'formulas',
        'formulas': [
          'i^t: \\text{the input gate}',
          'x^t: \\text{the input from the previous cell at time step t}',
          'a^{t-1}: \\text{the activation of this cell from the previous ' +
            'time step}',
          'W: \\text{trainable weight parameters}',
          'b: \\text{trainable bias parameters}',
        ],
      },
    ],
  ],
  forgetGate: [
    [
      {
        'type': 'plain',
        'text': 'The forget gate determines ',
      },
      {
        'type': 'highlighted',
        'text': 'what part of the old cell state can be forgotten.',
      },
      {
        'type': 'formulas',
        'formulas': [
          'f^t = sigmoid(W_{fx}x^t + W_{fa}a^{t-1} + b_f)',
        ],
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'It is used to calculate the ',
      },
      {
        'type': 'highlighted',
        'text': 'filtered state ',
      },
      {
        'type': 'plain',
        'text': 'to update the internal cell.',
      },
      {
        'type': 'formulas',
        'formulas': [
          '\\text{filtered_state} = f^t \\circ c^{t-1}',
        ],
      },
    ],
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Symbols:',
      },
      {
        'type': 'formulas',
        'formulas': [
          'f^t: \\text{the forget gate}',
          'x^t: \\text{the input from the previous cell at time step t}',
          'a^{t-1}: \\text{the activation of this cell from the previous ' +
            'time step}',
          'c^{t-1}: \\text{the cell state from the previous time step}',
          'W: \\text{trainable weight parameters}',
          'b: \\text{trainable bias parameters}',
        ],
      },
    ],
  ],
  outputGate: [
    [
      {
        'type': 'plain',
        'text': 'The output gate is responsible for filtering ',
      },
      {
        'type': 'highlighted',
        'text': 'what part of the current cell state is used as the output ' +
        'activation ',
      },
      {
        'type': 'plain',
        'text': 'of the cell.',
      },
      {
        'type': 'formulas',
        'formulas': [
          'o^t = sigmoid(W_{ox}x^t + W_{oa}a^{t-1} + b_o)',
        ],
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Using the output gate, one can then ',
      },
      {
        'type': 'highlighted',
        'text': 'compute the cell activation',
      },
      {
        'type': 'plain',
        'text': ', which is used as input to the next cell, as well as ' +
          'recurrently in the same cell at the next time step.',
      },
      {
        'type': 'formulas',
        'formulas': [
          'a^t = o^t \\circ tanh(c^t)',
        ],
      },
    ],
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Symbols:',
      },
      {
        'type': 'formulas',
        'formulas': [
          'o^t: \\text{the output gate}',
          'a^t: \\text{the activation of this cell for the current timestep}',
          'x^t: \\text{the input from the previous cell at time step t}',
          'a^{t-1}: \\text{the activation of this cell from the previous ' +
            'time step}',
          'c^{t}: \\text{the current cell state}',
          'W: \\text{trainable weight parameters}',
          'b: \\text{trainable bias parameters}',
        ],
      },
    ],
  ],
  stateUpdate: [
    [
      {
        'type': 'plain',
        'text': 'To update the cell state, ',
      },
      {
        'type': 'highlighted',
        'text': 'the filtered input ',
      },
      {
        'type': 'plain',
        'text': 'is combined with ',
      },
      {
        'type': 'highlighted',
        'text': 'the filtered state ',
      },
      {
        'type': 'plain',
        'text': 'of the previous time step.',
      },
    ],
  ],
  memoryCell: [
    [
      {
        'type': 'plain',
        'text': 'The ',
      },
      {
        'type': 'highlighted',
        'text': 'cell state ',
      },
      {
        'type': 'plain',
        'text': 'is the heart of any LSTM cell. By having a cell state, and ' +
        'deciding how to update it based on ',
      },
      {
        'type': 'highlighted',
        'text': 'the filtered input and previous state',
      },
      {
        'type': 'plain',
        'text': ', LSTM cells are able to ',
      },
      {
        'type': 'highlighted',
        'text': 'capture long-term dependencies.',
      },
      {
        'type': 'formulas',
        'formulas': [
          'c^t = \\text{filtered_input} + \\text{filtered_state}',
        ],
      },
    ],
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'Symbols:',
      },
      {
        'type': 'formulas',
        'formulas': [
          'c^t: \\text{the cell state at timestep t}',
        ],
      },
    ],
  ],
  inputHeading: [
    [
      {
        'type': 'plain',
        'text': '',
      },
    ],
  ],
  networkHeading: [
    [
      {
        'type': 'plain',
        'text': 'The network recurrent connection, backprop through time',
      },
    ],
  ],
  predictionHeading: [
    [
      {
        'type': 'plain',
        'text': 'The prediction blabla',
      },
    ],
  ],
  predictionTextHeading: [
    [
      {
        'type': 'plain',
        'text': 'The prediction blabla',
      },
    ],
  ],
  cellHeading: [
    [
      {
        'type': 'plain',
        'text': 'The cell blabla',
      },
    ],
  ],
  cellPlotHeading: [
    [
      {
        'type': 'plain',
        'text': 'The data blabla',
      },
    ],
  ],
};

export default {ENG: descriptionsENG};
