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

const globalGER = {
  title: 'exploRNN',
  strings: {
    controlsTitle: 'Steuerung',
    inputTitle: 'Eingabe',
    networkTitle: 'Netz',
    lossTitle: 'Fehler',
    predictionTitle: 'Ausgabe',
    plotInput: 'Vorgabe',
    plotOutput: 'Referenz',
    plotPrediction: 'Vorhersage',
    tooltipCell: 'Detailansicht',
    tooltipDelete: 'Zelle entfernen',
    tooltipAdd: 'Neue Ebene',
    sideMenu: {
      close: {
        title: 'Zurück',
      },
      about: {
        title: 'Über die Anwendung',
        description: 'Diese Anwendung ist als Projekt im Kontext einer ' +
          'Abschlussarbeit im Bachelorstudiengang Medieninformatik durch ' +
          'Raphael Störk entstanden. Der Titel dieser Arbeit ist: exploRNN - ' +
          'Eine Interaktive Visualisierung Rekurrenter Neuronaler Netze.',
      },
      faq: {
        title: 'FAQ',
        description: 'Keine Fragen bisher...',
      },
      impressum: {
        title: 'Impressum',
        description: 'Raphael Störk || Universität Ulm || Medieninformatik ||' +
          ' Mail: raphael.stoerk@uni-ulm.de',
      },
    },
    epoch: {
      title: 'Epochen',
      description: 'Beim Training eines Neuronalen Netzes wird eine ' +
        'vorgegebene Menge an Daten verwendet um Ausgaben des Netzes zu ' +
        'untersuchen. Eine Epoche beschreibt dabei einen Durchlauf durch ' +
        'diese Datenmenge. Pro Epoche wird diese Datenmenge in sogenannte ' +
        'Batches gleicher Größe aufgeteilt. Nachdem alle Daten eines Batch ' +
        'verwendet wurden wird ein Gesamtfehler errechnet und das Netz wird ' +
        'über das BPTT Verfahren trainiert.',
    },
    trainSteps: [
      {
        id: 0,
        title: 'Vorhersage',
        description: 'Eine zufällige Eingabe wird aus den Testdaten gewählt ' +
          'und dem Netz präsentiert. Dieses berechnet dann eine mögliche ' +
          'Vorhersage zum weiteren Verlauf.',
        longDescription: 'Das Ziel des Trainings ist es dem Netz beizubringen' +
          ' möglichst gute Vorhersagen zu machen. Um zu bestimmen wie gut ' +
          'das Netz zu einem Zeitpunkt darin ist solche Vorhersagen zu machen' +
          ' müssen diese erst vom Netz errechnet werden. Hierfür bekommt das' +
          ' Netz eine Reihe an Daten präsentiert die über die inneren ' +
          'Funktionen zu einer Ausgabe führen. Da wir für die Trainingsdaten ' +
          'sowohl die realen Ein- als auch Ausgaben kennen kann der Abstand ' +
          'der Netzausgabe von diesen Werten in weiteren Schritten ' +
          'untersucht werden.',
        note: 'Um die Berechnung der Ausgabe genauer zu ' +
          'untersuchen können Sie auf eine Zelle im Netz klicken um eine ' +
          'detailliertere Beschreibung dieser aufzurufen.',
      },
      {
        id: 1,
        title: 'Überprüfung',
        description: 'Die vorhergesagten Werte werden mit dem tatsächlichen ' +
          'Verlauf verglichen. Daraus wird dann ein Gesamtfehler errechnet.',
        longDescription: 'Da wir nun eine Vorhersage des Netzes zu einem' +
          ' gegebenen Abschnitt einer Eingabefunktion haben können wir' +
          ' diese mit den gewollten Werten vergleichen. Dabei errechnet' +
          ' sich dann ein Fehler mit dem eingschätzt werden kann wie das' +
          ' Netz angepasst werden muss um beim nächsten Mal eine bessere' +
          ' Vorhersage zu machen. In dem kleinen Element in dem der Fehler' +
          ' angezeigt wird sehen Sie den direkten Abstand der Werte ' +
          'voneinander. Für die tatsächliche Berechnung der Anpassungen ' +
          'wird in der Regel jedoch eine komplexere Form der Fehlerberechnung' +
          ' verwendet um besser Änderungen zu gewährleisten.',
      },
      {
        id: 2,
        title: 'Training',
        description: 'Der Fehler wird dem Netz mitgeteilt. Dieses versucht ' +
          'dann die inneren Variablen entsprechend anzupassen.',
        longDescription: 'Hier kommen wir zum eigentlichen Training ' +
          'im Trainigsprozess. Wir wissen nun für einige Eingaben wie ' +
          'gut das Netz darin ist Vorhersagen zu machen. Mit diesem ' +
          'Wissen können wir nun die Berechnung der Vorhersage ' +
          'zurückverfolgen und dabei bestimmen wie die Gewichte innerhalb ' +
          'des Netzes hätten sein müssen um eine bessere Vorhersage zu ' +
          'bekommen. Dieser Rücklauf durch die Zellen und vor allem die ' +
          'einzelnen Zeitschritte nennt man auch Backpropagation Through Time' +
          ' oder kurz BPTT.',
      },
    ],
    lstmSteps: [
      {
        id: 0,
        title: 'Start',
        description: 'Die Zelle wartet auf alle notwendigen Eingaben.',
        longDescription: 'Im ersten Schritt wartet die Zelle auf alle ' +
          'notwendigen Eingaben. Im ersten Zeitschritt ist dies nur die ' +
          'aktuelle Eingabe in das Netz, beziehungsweise die erste Ausgabe ' +
          'aus der vorherigen Zelle. In späteren Zeitschritten kommen hier ' +
          'auch noch die Ausgaben aus der aktuellen Ebene dazu. Durch diesen' +
          ' zyklischen Strom an Daten kann später ein Zusammenhang zwischen' +
          ' alten und neuen Werten erlernt werden.',
      },
      {
        id: 1,
        title: 'Eingabe der Ebene',
        description: 'Die Eingaben werden zu einem Wert zusammengefasst.',
        longDescription: 'Sobald alle notwendigen Eingaben an der Zelle ' +
          'angekommen sind wird eine Gesamteingabe für die Zelle bestimmt. ' +
          'Diese enthält nun Informationen über die neuen Werte die durch das' +
          ' Netz fließen als auch Informationen über den bisherigen Zustand ' +
          'der aktuellen Zelle.',
      },
      {
        id: 2,
        title: 'Aktivierung',
        description: 'Die neue Eingabe wird von Input und Forget Gate' +
          ' verarbeitet.',
        longDescription: 'Da nun die Eingabe an alle Gatter in der Zelle ' +
          'gesendet wurden können diese nun Filter für die Datenströme ' +
          'bestimmen. Das input gate besteht dabei tatsächlich aus einem ' +
          'block input und dem eigentlichen input gate. Der block input ' +
          'berechnet eine gewichtete Version der Zelleingabe. Das input gate' +
          ' errechnet dann einen Filter für diese Eingabe mit dem die ' +
          'wichtigen neuen Informationen aus der Eingabe extrahiert werden.' +
          ' Zur selben Zeit errechnet sich das forget gate einen eigenen ' +
          'Filter. Dieser wird jedoch verwendet um aus dem Zell Zustand zu ' +
          'bestimmen, welche alten Informationen nicht mehr relevant sind,' +
          ' also vergessen werden können.',
      },
      {
        id: 3,
        title: 'Update der Zelle',
        description: 'Es wird ein Update für den Zell Zustand errechnet.',
        longDescription: 'Mit den von input und forget gate berechneten' +
          ' Filtern kann nun eine Aktualisierung des Zellspeichers bestimmt ' +
          'werden. Aus dem block input werden neue Informationen mit dem ' +
          'Filter gewonnen und der alte Zellspeicher wird mit dem forget gate' +
          ' angepasst. Die Verbindung dieser beiden Ergebnisse kann dann als' +
          ' neuer Zellspeicher verwendet werden.',
      },
      {
        id: 4,
        title: 'Zell Zustand',
        description: 'Der Zell Zustand wird angepasst.',
        longDescription: 'Der Zell Zustand, auch Zellspeicher genannt, ' +
          'bekommt nun die neuen Werte, die durch die Gatter berechnet ' +
          'wurden. Er enthält nun alle relevanten Informationen über die ' +
          'früheren Zeitschritte und die Werte des aktuellen Zeitschritts.',
      },
      {
        id: 5,
        title: 'Ausgabe',
        description: 'Die aktuelle Eingabe wird mit dem Zell Zustand im ' +
          'Output Gate zur Ausgabe verarbeitet.',
        longDescription: 'Da im Zellspeicher die wichtigen Informationen zum' +
          ' Zustand der Zelle selbst gespeichert sind versucht das output ' +
          'gate nun die wichtigen Informationen für die nachfolgenden Zellen' +
          ' zu bestimmen. Dafür wird auch hier ein Filter errechnet mit dem' +
          ' der Zell Zustand vor Weitergabe angepasst wird. Diese Ausgabe ' +
          'wird dann sowohl an die nächste Ebene gereicht, als auch erneut ' +
          'an die aktuelle Zelle als Eingabe. Dadurch kann im nächsten ' +
          'Durchlauf ein Zusammenhang zu den folgenden Eingaben bestimmt' +
          ' werden.',
      },
    ],
    defaultDescription: '[fehlende Beschreibung]',
    lstmGates: [
      {
        id: 0,
        title: 'Layer Input',
        description: 'Die Eingabe der aktuellen Ebene besteht aus zwei ' +
          'Teilen: Der Ausgabe aus der vorherigen Ebene und die Ausgabe ' +
          'der aktuellen Ebene aus dem vorherigen Zeitschritt. Diese beiden ' +
          'Teile werden an jedes Gatter gesendet wo sie dann gewichtet und ' +
          'addiert werden. Dies kann folgendermaßen verallgemeinert werden:',
        formulas: [
          'X^t_g = w_{xg} \\cdot x^t + w_{yg} \\cdot y^{t-1}',
          'g: \\text{ Das entsprechende Gatter}',
          'x^t: \\text{ Ausgabe aus vorheriger Ebene}',
          'y^{t-1}: \\text{ Ausgabe des letzten Zeitschritts}',
        ],
      },
      {
        id: 1,
        title: 'Input Gate',
        description: 'Das input gate ist tatsächlich eine zweiteilige ' +
          'Komponente. Im ersten Schritt wird der sogenannte block input ' +
          'berechnet. Dies ist eine angepasste Form der Ebeneneingabe mit ' +
          'der das input gate besser umgehen kann. Das input gate selbst ' +
          'bildet dann den zweiten Schritt. Hier wird ein Filter für den ' +
          'block input berechnet durch den nur die wichtigen neuen ' +
          'Informationen durchgelassen werden. Die Berechnung hierfür können ' +
          'wie folgt dargestellt werden.',
        formulas: [
          'z^t = tanh(X^t_z + b_z)',
          'i^t = \\sigma(X^t_i + b_i)',
          'z: \\text{ Der block input}',
          'b_k: \\text{ Der bias der Komponente } k',
        ],
      },
      {
        id: 2,
        title: 'Forget Gate',
        description: 'Das forget gate versucht zu bestimmen, welcher Teil ' +
          'des alten Zell Zustandes relevant für die weiteren Schritte ist ' +
          'und entsprechend welche Informationen die Zelle vergessen kann. ' +
          'Hierfür wird ein Filter generiert, der später verwendet wird um ' +
          'die alten Werte des Zellspeichers zu filtern.',
        formulas: [
          'f^t = \\sigma(X^t_f + b_f)',
          'b_k: \\text{ Der bias der Komponente } k',
        ],
      },
      {
        id: 3,
        title: 'Output Gate',
        description: 'Da der Zellspeicher die wichtigen Informationen in ' +
          'einer für ihn verwendbaren Form speichert wird durch das ' +
          'output gate ein Filter erstellt, welcher aus einer ' +
          'transformierten Form dieses Speichers die Informationen heraus ' +
          'sucht, die an die nächsten Ebenen weitergegeben werden können.',
        formulas: [
          'h^t = tanh(c^t)',
          'o^t = \\sigma(X^t_o + b_o)',
          'y^t = h^t \\cdot o^t',
          'b_k: \\text{Der bias der Komponente } k',
        ],
      },
      {
        id: 4,
        title: 'State Update',
        description: 'Sobald input und forget gate ihre Filter generiert ' +
          'haben können diese zur Anpassung der Werte aus dem alten ' +
          'Zellspeicher und aus dem block input verwendet werden. Die ' +
          'Verbindung der angepassten Werte kann dann als Aktualisierung ' +
          'für den Zellspeicher genutzt werden.',
        formulas: [
          '\\widetilde{c}^t = f^t \\cdot c^{t-1} + i^t \\cdot z^t',
        ],
      },
      {
        id: 5,
        title: 'Memory Cell',
        description: 'Dies ist die Speicherzelle, auch Zell Zustand genannt. ' +
          'Sie repräsentiert den internen Speicher des Zellblocks und enthält' +
          ' wichtige Informationen über alle vorherigen Zeitschritte. Beim ' +
          'Training des Netzes wird der Fehler der Ausgabe rückwärts durch ' +
          'das Netz gesendet durch Berechnung der Gradienten aller ' +
          'Zellkomponenten. Während hier herkömmliche RNN darunter leiden, ' +
          'dass durch die vielen Fehlergradienten der Fehler im zeitlichen ' +
          'Verlauf des Trainings stark reduziert wird umgehen LSTM Zellen' +
          'dieses Problem durch die konstante Weitergabe des Fehlers über ' +
          'diesen Zellpeicher. Dadurch ist es LSTM Netzen möglich zeitliche ' +
          'Abhängigkeiten über lange Abstände zu erlernen.',
        formulas: [
          'c^t = \\widetilde{c}^t',
        ],
      },
    ],
  },
  types: [
    {name: 'RNN', disabled: true},
    {name: 'LSTM', disabled: false},
    {name: 'GRU', disabled: true},
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
  sliders: [
    {
      key: 0,
      title: 'Lernrate',
      description: 'Die Lernrate ist ein Wert, welcher beschreibt wie ' +
        'sehr sich das Netz im Trainingsschritt anpassen lässt. Je höher' +
        ' dieser Wert ist, desto stärker ist die Änderung der einzelnen' +
        ' Gewichte beim Training. Je besser ein Netz darin ist Werte ' +
        'vorherzusagen, desto niedriger kann dieser Wert also sein. ' +
        'In dieser Anwendung können Sie einen solchen Wert einstellen und ' +
        'untersuchen wie sich dies auf die Lernfähigkeit des Netzes ' +
        'auswirkt. Beachten Sie jedoch, dass eine Änderung der Lernrate' +
        ' nur dann aktiv wird sobald das Netz neu generiert wurde.',
      step: 0.01,
      min: -3,
      max: 1,
      marks: [
        {
          value: -3,
          label: 0.001,
        },
        {
          value: -2,
          label: 0.01,
        },
        {
          value: -1,
          label: 0.1,
        },
        {
          value: 0,
          label: 1,
        },
        {
          value: 1,
          label: 10,
        },
      ],
    },
    {
      key: 1,
      title: 'Rauschen',
      description: 'Wenn wir das Netz immer mit denselben Kurvenabschnitten' +
      ' trainieren laufen wir Gefahr das Netz zu sehr zu spezialisieren. ' +
      'Dann kann das Netz mit Eingaben, die nur etwas von den gegebenen ' +
      'Funktionen abweichen, nicht arbeiten. Man nennt dieses Problem ' +
      'auch overfitting. Um das zu umgehen können in dieser Anwendung ' +
      'entweder mehrere Formen für die Eingabe vorgegeben werden oder ' +
      'eben ein Rauschen auf den Eingabedaten eingestellt werden. Durch' +
      ' das Rauschen werden die Funktionen verschwommen und das Netz muss ' +
      'lernen dieses Rauschen zu filtern. Je höher dabei der Rauschwert ' +
      'ist, desto schwieriger ist es für das Netz gute Vorhersagen zu ' +
      'machen. Daher müssen die anderen Parameter entsprechend sorgsam ' +
      'gewählt werden.',
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
      title: 'Batch Größe',
      description: 'Würden wir das Netz nach jeder einzelnen Vorhersage' +
        ' trainieren würde der Trainingsprozess sehr lange dauern. ' +
        'Um zu versuchen die Anzahl an Rückschritten zu vermindern ' +
        'wird die Menge an Trainingsdaten in sogenannte Batches ' +
        'aufgeteilt. Jeder Batch enthält eine vorgegebene Anzahl an ' +
        'Trainingsdaten und erst wenn alle Daten in einem Batch für ' +
        'Vorhersagen durch das Netz verwendet wurden wird dieses mit ' +
        'einem Gesamtfehler des Batches trainiert. Da wir dann insgesamt' +
        ' weniger Trainingsschritte haben kann das Training schneller ' +
        'durchgeführt werden. Da wir aber für alle Daten in einem Batch' +
        ' nur mit einem Gesamtfehler arbeiten gehen womöglich Informationen' +
        ' über die einzelnen Ausgaben verloren. Daher muss hier ein gutes ' +
        'Mittelmaß gefunden werden.',
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

export default {GER: globalGER, ENG: globalENG};
