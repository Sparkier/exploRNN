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
        'text': 'In this application you can experiment with and ',
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
    [
      {
        'type': 'plain',
        'text': 'In contrast to fully connected or ' +
        'convolutional neural networks, RNNs operate on ',
      },
      {
        'type': 'highlighted',
        'text': 'sequential data. ',
      },
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
  inputOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'In this application, you can experiment with ',
      },
      {
        'type': 'highlighted',
        'text': 'function and text data. ',
      },
      {
        'type': 'plain',
        'text': 'Here on the left, you can select which dataset you want to ',
      },
      {
        'type': 'highlighted',
        'text': 'train on.',
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
        'text': 'If the network is paused, you can also advance individual ' +
        'epochs using the ',
      },
      {
        'type': 'highlighted',
        'text': 'forward button.',
      },
    ],
  ],
  outputOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'To show how your network ',
      },
      {
        'type': 'highlighted',
        'text': 'currently performs',
      },
      {
        'type': 'plain',
        'text': ', we visualize ',
      },
      {
        'type': 'highlighted',
        'text': 'the prediction for a random dataset example',
      },
      {
        'type': 'plain',
        'text': ' in each epoch.',
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
        'text': 'into one of these layers',
      },
      {
        'type': 'plain',
        'text': '. Clicking on one of them will show you the workings of a ',
      },
      {
        'type': 'highlighted',
        'text': 'LSTM cell.',
      },
    ],
  ],
  detailOutputOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'In this plot, you can can see ' +
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
        'text': 'In this, more detailed view, the training progresses in ',
      },
      {
        'type': 'highlighted',
        'text': 'slow-motion.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'This is a LSTM cell, which is used throughout the network. ' +
        'To look into what ',
      },
      {
        'type': 'highlighted',
        'text': 'individual components of this cell do',
      },
      {
        'type': 'plain',
        'text': ', simply click one of the compute elements, to get a ',
      },
      {
        'type': 'highlighted',
        'text': 'detailed description.',
      },
    ],
  ],
  processOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'Here, you can see the ',
      },
      {
        'type': 'highlighted',
        'text': 'processing steps',
      },
      {
        'type': 'plain',
        'text': ' of the network you are currently training.',
      },
    ],
  ],
  slidersOnboarding: [
    [
      {
        'type': 'plain',
        'text': 'By interacting with these sliders, you can ',
      },
      {
        'type': 'highlighted',
        'text': 'change some of the most important training parameters',
      },
      {
        'type': 'plain',
        'text': ' and see in the network overivew, how ',
      },
      {
        'type': 'highlighted',
        'text': 'the model reacts',
      },
      {
        'type': 'plain',
        'text': ' during training.',
      },
    ],
  ],
  lowLROnboarding: [
    [
      {
        'type': 'plain',
        'text': 'By interacting with these sliders, you can ',
      },
      {
        'type': 'highlighted',
        'text': 'change some of the most important training parameters',
      },
      {
        'type': 'plain',
        'text': ' and see in the network overivew, how ',
      },
      {
        'type': 'highlighted',
        'text': 'the model reacts',
      },
      {
        'type': 'plain',
        'text': ' during training.',
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
        'text': 'simply click any ⓘ',
      },
      {
        'type': 'plain',
        'text': ' in this visualization.',
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
        'text': 'To inform the gates of the cell about which information ' +
        'is relevant to be ',
      },
      {
        'type': 'highlighted',
        'text': 'integrated into the cell state',
      },
      {
        'type': 'plain',
        'text': ', what aprt of the ',
      },
      {
        'type': 'highlighted',
        'text': 'previous cell state can be forgotten',
      },
      {
        'type': 'plain',
        'text': ', and what part of the cell state is ',
      },
      {
        'type': 'highlighted',
        'text': 'output as the cell activation, ',
      },
      {
        'type': 'plain',
        'text': 'LSTM cells use both, the ',
      },
      {
        'type': 'highlighted',
        'text': 'input to this cell',
      },
      {
        'type': 'plain',
        'text': ', and the ',
      },
      {
        'type': 'highlighted',
        'text': 'activation of this cell from the previous time step.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'This combined input information is referred to as the ',
      },
      {
        'type': 'highlighted',
        'text': 'layer input.',
      },
    ],
  ],
  gateStep: [
    [
      {
        'type': 'plain',
        'text': 'Using the information that is combined as the ',
      },
      {
        'type': 'highlighted',
        'text': 'layer input',
      },
      {
        'type': 'plain',
        'text': ', all three gates use their own weights and biases to ' +
        'compute the ',
      },
      {
        'type': 'highlighted',
        'text': 'gate activation',
      },
      {
        'type': 'plain',
        'text': ', which determines what part of information is used for ' +
        'updating the cell state and calculating the cell activation.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The ',
      },
      {
        'type': 'highlighted',
        'text': 'input gate',
      },
      {
        'type': 'plain',
        'text': ' filters what part of the layer input is used to ',
      },
      {
        'type': 'highlighted',
        'text': 'update the cell state',
      },
      {
        'type': 'plain',
        'text': 'with new information.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The ',
      },
      {
        'type': 'highlighted',
        'text': 'forget gate',
      },
      {
        'type': 'plain',
        'text': ' filters what part of the ',
      },
      {
        'type': 'highlighted',
        'text': 'cell state can be forgotten.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The ',
      },
      {
        'type': 'highlighted',
        'text': 'output gate',
      },
      {
        'type': 'plain',
        'text': ' filters what part of the cell state is used to ',
      },
      {
        'type': 'highlighted',
        'text': 'compute the cell activation.',
      },
    ],
  ],
  updateStep: [
    [
      {
        'type': 'plain',
        'text': 'Using the filters of the input gate and the forget gate, ' +
        'the cell state is updated with ',
      },
      {
        'type': 'highlighted',
        'text': 'a mix of new information and information from the old cell ' +
        'state.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The ',
      },
      {
        'type': 'highlighted',
        'text': 'input gate',
      },
      {
        'type': 'plain',
        'text': ' is used in combination with the ',
      },
      {
        'type': 'highlighted',
        'text': 'layer input',
      },
      {
        'type': 'plain',
        'text': ' to determine what new information gets added to the ' +
        'cell state.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The ',
      },
      {
        'type': 'highlighted',
        'text': 'forget gate',
      },
      {
        'type': 'plain',
        'text': ' is used in combination with the ',
      },
      {
        'type': 'highlighted',
        'text': 'previous cell state',
      },
      {
        'type': 'plain',
        'text': ' to determine what information from the previous cell ' +
        'state can be forgotten.',
      },
    ],
  ],
  outputStep: [
    [
      {
        'type': 'plain',
        'text': 'Finally, the cell needs to output an ',
      },
      {
        'type': 'highlighted',
        'text': 'activation value',
      },
      {
        'type': 'plain',
        'text': ', which can be used as ',
      },
      {
        'type': 'highlighted',
        'text': 'an input to the next cell, or as a prediction output.',
      },
      {
        'type': 'plain',
        'text': 'It is also used ',
      },
      {
        'type': 'highlighted',
        'text': 'recurrently',
      },
      {
        'type': 'plain',
        'text': ' as an input to this cell for the next time step.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The activation is computed as ',
      },
      {
        'type': 'highlighted',
        'text': 'filtered information',
      },
      {
        'type': 'plain',
        'text': ' from the cell state. Here, the ',
      },
      {
        'type': 'highlighted',
        'text': 'output gate',
      },
      {
        'type': 'plain',
        'text': ' is used for this filtering.',
      },
    ],
  ],
  layerInput: [
    [
      {
        'type': 'plain',
        'text': 'For informing all the gates, ',
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
        'text': 'The input to a recurrent neural network can be ',
      },
      {
        'type': 'highlighted',
        'text': 'sequential data.',
      },
      {
        'type': 'plain',
        'text': ' We use ',
      },
      {
        'type': 'highlighted',
        'text': 'periodic functions ',
      },
      {
        'type': 'plain',
        'text': 'and ',
      },
      {
        'type': 'highlighted',
        'text': 'simple text snippets ',
      },
      {
        'type': 'plain',
        'text': 'to illustrate this.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'For other tasks, such as ',
      },
      {
        'type': 'highlighted',
        'text': 'image captioning',
      },
      {
        'type': 'plain',
        'text': ', which does not include sequential input data, the network ' +
        'only gets an input value for the first time step, and then has to ',
      },
      {
        'type': 'highlighted',
        'text': 'recurrently build a caption ',
      },
      {
        'type': 'plain',
        'text': 'by outputting one word at a time, which, again, makes it a ',
      },
      {
        'type': 'highlighted',
        'text': 'sequential task.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'This way, recurrent neural networks can be used for tasks ' +
        'with ',
      },
      {
        'type': 'highlighted',
        'text': 'sequential input and non-sequential output (many-to-one)',
      },
      {
        'type': 'plain',
        'text': ', such as next element prediction. Tasks with ',
      },
      {
        'type': 'highlighted',
        'text': 'sequential input and sequential output (many-to-many)',
      },
      {
        'type': 'plain',
        'text': ', such as translation. As well as tasks with ',
      },
      {
        'type': 'highlighted',
        'text': ' non-sequential input and sequential output (one-to-many)',
      },
      {
        'type': 'plain',
        'text': ', such as image captioning.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'As the general concepts for these tasks does not differ, ' +
        'we focus on ',
      },
      {
        'type': 'highlighted',
        'text': 'next element prediction',
      },
      {
        'type': 'plain',
        'text': ' in this application, which is a many-to-one task.',
      },
    ],
  ],
  networkHeading: [
    [
      {
        'type': 'plain',
        'text': 'a recurrent neural network is built up in a similar way as ' +
        'convolutional or fully connected neural networks, where ',
      },
      {
        'type': 'highlighted',
        'text': 'multiple layers',
      },
      {
        'type': 'plain',
        'text': ' are connected to extract information from the input.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The great speciality of recurrent neural networks is, ' +
        'that they also use ',
      },
      {
        'type': 'highlighted',
        'text': 'information from previous time steps',
      },
      {
        'type': 'plain',
        'text': ' for their predictions.',
      },
      {
        'type': 'plain',
        'text': ' This is visualized by the loops in their network glyphs.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'To achieve this, they have weights not only for how ' +
        'information is processed throughout layers, but also for how ',
      },
      {
        'type': 'highlighted',
        'text': 'information from previous time steps',
      },
      {
        'type': 'plain',
        'text': ' is processed.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'During trianing, this means that the error is not only ' +
        'backpropagated through the layers, but also ',
      },
      {
        'type': 'highlighted',
        'text': 'through time',
      },
      {
        'type': 'plain',
        'text': ', to update the weights responsible for determining how ' +
        'information from previous time steps is processed.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'This can be thought of as the error ',
      },
      {
        'type': 'highlighted',
        'text': 'flowing backwards through the loops',
      },
      {
        'type': 'plain',
        'text': ' in the network, as well as through the lines connecting ' +
        'the layers.',
      },
    ],
  ],
  predictionHeading: [
    [
      {
        'type': 'plain',
        'text': 'The prediction visualization shows how the network performs ' +
        'on a ',
      },
      {
        'type': 'highlighted',
        'text': 'random example ',
      },
      {
        'type': 'plain',
        'text': 'from the dataset.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The ',
      },
      {
        'type': 'highlighted',
        'text': 'grey area',
      },
      {
        'type': 'plain',
        'text': ' shows, how many previous data points the network needs for ',
      },
      {
        'type': 'highlighted',
        'text': 'building up its internal state',
      },
      {
        'type': 'plain',
        'text': '. The network will then make a prediction after these inputs' +
        ' have been processed.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'The ',
      },
      {
        'type': 'highlighted',
        'text': 'prediction accuracy',
      },
      {
        'type': 'plain',
        'text': ' will normally get ',
      },
      {
        'type': 'highlighted',
        'text': 'worse for later predictions',
      },
      {
        'type': 'plain',
        'text': '. This comes from the fact, that the network first builds ' +
        'its internal state from ',
      },
      {
        'type': 'highlighted',
        'text': 'training data',
      },
      {
        'type': 'plain',
        'text': ', whereas later, it needs to obtain its internal state from ',
      },
      {
        'type': 'highlighted',
        'text': 'previous predictions.',
      },
    ],
  ],
  cellHeading: [
    [
      {
        'type': 'plain',
        'text': 'A LSTM (long short-term memory) cell consists of ',
      },
      {
        'type': 'highlighted',
        'text': 'different gates',
      },
      {
        'type': 'plain',
        'text': ', that determine what information is used to update its ' +
        'internal ',
      },
      {
        'type': 'highlighted',
        'text': 'cell state',
      },
      {
        'type': 'plain',
        'text': ', and what information within this cell state is used to ' +
        'calculate the ',
      },
      {
        'type': 'highlighted',
        'text': 'output activation.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'To learn more about the gates and memory of this cell, ',
      },
      {
        'type': 'highlighted',
        'text': 'click on one of the elements',
      },
      {
        'type': 'plain',
        'text': ' in this visualization.',
      },
    ],
  ],
  cellPlotHeading: [
    [
      {
        'type': 'plain',
        'text': 'The network first builds up its internal state, visualized ' +
        'by the ',
      },
      {
        'type': 'highlighted',
        'text': 'grey box',
      },
      {
        'type': 'plain',
        'text': ', before making a prediction.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'This prediction is then used, to ',
      },
      {
        'type': 'highlighted',
        'text': 'calculate the loss.',
      },
    ],
    [
      {
        'type': 'plain',
        'text': 'To make further predictions, as when generating text or ' +
        'continuing a function, one can feed the network ',
      },
      {
        'type': 'highlighted',
        'text': 'its own prediction values',
      },
      {
        'type': 'plain',
        'text': ', to again build up the internal state with the ',
      },
      {
        'type': 'highlighted',
        'text': 'same number of time steps',
      },
      {
        'type': 'plain',
        'text': ' as at the beginning, where known datapoints were used.',
      },
    ],
  ],
};

export default {ENG: descriptionsENG};
