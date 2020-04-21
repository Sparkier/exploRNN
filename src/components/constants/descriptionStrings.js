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
        'text': 'each item in the dataset once ',
      },
      {
        'type': 'plain',
        'text': 'per epoch.',
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
        'text': 'If we would try to train the network after each and ' +
        'every input that we have in our training data the training would ' +
        'take a very long time. To try and reduce the amount of ' +
        'backpropagation steps in the training process the data set is ' +
        'bundled into so called batches. Each batch contains a set amount ' +
        'of data from the training data and only after all the data in one ' +
        'batch is used up the network is being trained with the total error' +
        ' of this batch. Since we then have less steps the training is done ' +
        'more quickly, but because we only train on a total error we might ' +
        'lose information of the individual outputs given by the net.',
      },
    ],
  ],
  noise: [
    [
      {
        'type': 'plain',
        'text': 'If we only check if the net can recreate given functions ' +
        'we are prone to overfitting. Meaning we could not check if the ' +
        'network can handle inputs not specifically used in the training ' +
        'process. To give the network a more challenging task we try to ' +
        'distort the input values to see if the network can cancel out this ' +
        'noise. The higher this noise is the harder it is for the network ' +
        ' to recognize the underlying function. Therefore the other values ' +
        'need be selected more carefully.',
      },
    ],
  ],
  forward: [
    [
      {
        'type': 'plain',
        'text': 'The goal of the training process is to teach the ' +
          'network to make as good a prediction as possible. To tell how ' +
          'good the network currently is in its predictive abilities we ' +
          'first need to get predictions for some inputs. The network is ' +
          'shown these inputs and it calculates the values that it thinks ' +
          'should come next.',
      },
    ],
  ],
  validation: [
    [
      {
        'type': 'plain',
        'text': 'Since we know the continuation of the inputs we ' +
        'used for the prediction beforehand, we can now check how far off ' +
        'this prediction was. This is used as the error between prediciton ' +
        'and reality to evaluate how the network has to be adjusted to ' +
        'make better predictions the next time. In the small error ' +
        'element you can see the error between a prediction and ' +
        'the real values.',
      },
    ],
  ],
  backward: [
    [
      {
        'type': 'plain',
        'text': 'Now comes the actual training part of the training' +
        ' process. We now know for some inputs how well the network can ' +
        'predict the continuation of the given functions. With this ' +
        'knowledge we can backtrack the prediction process through the ' +
        'cells and through the time steps. With this so called ' +
        'backpropagation through time we can adjust the weights in the' +
        ' cells to minimize the difference between prediction and reality.',
      },
    ],
  ],
  inputStep: [
    [
      {
        'type': 'plain',
        'text': 'In this first step the cell waits for the inputs ' +
          'to arrive. In the first time step only the outputs from the ' +
          'previous layer will reach this input. In all later time ' +
          'steps the recurrent output from this cell itself is also used as' +
          ' an input for the coming calculations. With this cyclic stream of' +
          ' information the cell can learn the dependencies between old and' +
          ' new values.',
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
  stateStep: [
    [
      {
        'type': 'plain',
        'text': 'The cell state is now updated based on the gates ' +
          'that determine what part of the input and what part of the cell ' +
          'state from the previous time step should be used as the new cell ' +
          'state.',
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
        'text': 'The cell waits until it gets all data it needs as ' +
        'input for all calculations. These inputs are the ceell output of ' +
        'the previous time step, and the output of the cell which precedes ' +
        'the inspected cell.',
      },
    ],
  ],
  inputGate: [
    [
      {
        'type': 'plain',
        'text': 'The input gate is used as a measure for what part of ' +
          'the input is being used for updating the cell state with new ' +
          'information. The input gate is a filter used to calculate the new ' +
          'cell state.',
      },
    ],
    [
      {
        'type': 'formulas',
        'formulas': [
          'i^t = sigmoid(W_{ix}x^t + W_{ia}a^{t-1} + b_i)',
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
        'text': 'The forget gate determines what part of the ' +
          'old cell state is relevant for future calculations and which ' +
          'values can be forgotten. The forget gate is a filter used to ' +
          'calculate the new cell state.',
      },
    ],
    [
      {
        'type': 'formulas',
        'formulas': [
          'f^t = sigmoid(W_{fx}x^t + W_{fa}a^{t-1} + b_f)',
          'f^t: \\text{the forget gate}',
          'x^t: \\text{the input from the previous cell at time step t}',
          'a^{t-1}: \\text{the activation of this cell from the previous ' +
            'time step}',
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
        'text': 'The output gate is responsible for filtering what part ' +
          'of the current cell state is used as the output activation of the ' +
          'cell. Using the output gate, one can then comput the cell ' +
          'activation, which is used as input to the next cell, as well as ' +
          'recurrently in the same cell at the next time step. The gate ' +
          'value and the output activation are computed as:',
      },
    ],
    [
      {
        'type': 'formulas',
        'formulas': [
          'o^t = sigmoid(W_{ox}x^t + W_{oa}a^{t-1} + b_o)',
          'a^t = o^t \\circ tanh(c^t)',
        ],
      },
    ],
  ],
  stateUpdate: [
    [
      {
        'type': 'plain',
        'text': 'To update the cell state, both, the forget gate and ' +
        'the update gate are needed in combination with the cell input and ' +
        'the output of the cell from the previous time step.',
      },
    ],
  ],
  memoryCell: [
    [
      {
        'type': 'plain',
        'text': 'This is the memory cell, also called the cell state. ' +
          'It represents an internal memory of this cell block that contains ' +
          'relevant information about all previous time steps. When training ' +
          'the network the error of the output is sent backwards through ' +
          'by calculating the error gradients of all the cell components. ' +
          'While normal RNN suffer from information losses because of the ' +
          'many gradients decreasing the error over time the LSTM memory ' +
          'cell overcomes this problem by sending the error with a constant ' +
          'weight back in time. This makes the LSTM architecture capable of ' +
          'learning long time distance dependencies.',
      },
    ],
    [
      {
        'type': 'formulas',
        'formulas': [
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
        'text': 'The network blabla',
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
