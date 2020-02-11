// This file declares the global strings and values used in the application
const globalENG = {
  title: 'leaRNN',
  strings: {
    controlsTitle: 'Controls',
    inputTitle: 'Input',
    networkTitle: 'Network',
    lossTitle: 'Error',
    predictionTitle: 'Prediction',
    plotInput: 'Input',
    plotOutput: 'Target',
    plotPrediction: 'Prediction',
    tooltipCell: 'click for detail',
    tooltipDelete: 'remove layer',
    tooltipAdd: 'add layer',
    sideMenu: {
      close: {
        title: 'Close',
      },
      about: {
        title: 'About',
        description: 'Something about this app',
      },
      faq: {
        title: 'FAQ',
        description: 'No Questions up until now',
      },
      impressum: {
        title: 'Impressum',
        description: 'Made by me',
      },
    },
    epoch: {
      title: 'Epochs',
      description: 'When training a Neural Network a set of training data is' +
        ' used to get predictions that can be analyzed. One Epoch describes ' +
        'one cycle through this data set. Per Epoch the data is split up ' +
        'into batches of equal size. After each batch of data is used to ' +
        'get the predictions a total error is calcualted and the network ' +
        'is trained via backpropagation.',
    },
    trainSteps: [
      {
        id: 0,
        title: 'Prediction',
        description: 'A random sample input is shown to the net value by ' +
          'value. The net than makes a predicition on how this sample would ' +
          'continue over time.',
        longDescription: 'The goal of the training process is to teach the ' +
          'network to make as good a prediction as possible. To tell how ' +
          'well the network currently is in its predictive abilities we ' +
          'first need to get predictions for some inputs. The network is ' +
          'shown these inputs and it calculates the values that it thinks ' +
          'should come next. Since we know the continuation of these inputs ' +
          'beforehand we can then check in the following steps how far off ' +
          'this prediction was.',
        note: ' To see how the values are calculated and ' +
          'where the recurrent in RNN stems from you can click on one of ' +
          'the cells to get a more detailed explanation.',
      },
      {
        id: 1,
        title: 'Validation',
        description: 'The predicted values are compared to the target values ' +
          'and the total loss is calculated.',
        longDescription: 'Now that the network has given us a prediction for ' +
          'a partial section of an input function we can compare it to the ' +
          'real values. Then we can calculate the error between prediciton ' +
          'and reality to evaluate how the net has to be adjusted to make ' +
          'better predictions the next time around. In the small error ' +
          'element you can see the direct error between a prediction and ' +
          'the real values. But normally a more complex error calcualtion ' +
          'is used to get a better training of the internal weights.',
      },
      {
        id: 2,
        title: 'Training',
        description: 'The net is told how bad its prediction was and then ' +
          'tries to update its inner variables.',
        longDescription: 'Now comes the actual training part of the training' +
          ' process. We now know for some inputs how well the network can ' +
          'predict the continuation of the given functions. With this ' +
          'knowledge we can backtrack the prediction process through the ' +
          'cells and through the time steps. With this so called ' +
          'backpropagation through time we can adjust the weights in the' +
          ' cells to minimize the difference between prediction and reality.',
      },
    ],
    lstmSteps: [
      {
        id: 0,
        title: 'Input',
        description: 'The cell waits for all necessary inputs',
        longDescription: 'In this first step the cell waits for the inputs ' +
          'to arrive. In the first time step only the outputs from the ' +
          'previous layer need will reach this input. In all later time ' +
          'steps the recurrent output from this cell itself is also used as' +
          ' an input for the coming calculations. With this cyclic stream of' +
          ' information the cell can learn the dependencies between old and' +
          ' new values.',
      },
      {
        id: 1,
        title: 'Layer Input',
        description: 'The inputs from this and the previous layer are combined',
        longDescription: 'Once all necessary input values have reached the ' +
          'cell input these values are used to form a combined input for this' +
          ' layer. This input contains information about the new time step' +
          ' as well as information about the previous state of the ' +
          'current cell.',
      },
      {
        id: 2,
        title: 'Gate Activation',
        description: 'The new input is processed by the input and forget gate',
        longDescription: 'With the layer input now sent to the gates of the' +
          ' cell the gates can calculate filters for the input and cell ' +
          'state. The input gate itself is actually composed of a block ' +
          'input and the actual input gate. The block input calculates a ' +
          'weighted version of the layer input. The input gate determines ' +
          'a filter that will be used to extract the relevant new ' +
          'information from the block input. At the same time the forget' +
          ' gate also determines a data filter. But this filter is used to' +
          ' determine which values of the cell state are not relevant anymore' +
          ' and can be forgotten.',
      },
      {
        id: 3,
        title: 'Cell Update',
        description: 'The processed values are combined to create a ' +
          'cell update',
        longDescription: 'With the input and forget gate having calculated' +
          ' their filters the cell state updated can now be determined. ' +
          'The block input is filtered by the input gate and the old cell ' +
          'state is filtered by the forget gate. The combination of these ' +
          'two steps is then used as an updated version of the memory cell.',
      },
      {
        id: 4,
        title: 'Cell State',
        description: 'The cell state is updated',
        longDescription: 'The cell state is now given the new values ' +
          'calcualted by the previuos steps. It now contains the relevant' +
          ' information about the previous time steps and the added new' +
          ' information about the current time step.',
      },
      {
        id: 5,
        title: 'Output',
        description: 'The cell state is transformed by the output gate ' +
          'before being outputted',
        longDescription: 'Since the information in memory cell is a mix of' +
          ' relevant information for this cell specifically the output gate' +
          ' now tries to extract the valuable information that can be sent' +
          ' to the following layers. Again a filter is calculated and the' +
          ' values of memory cell are transformed before being given to the' +
          ' next layer. This output is also then sent to the input of the' +
          ' current cell so that the next round of calculations can be ' +
          'done with knowledge of these now old values.',
      },
    ],
    defaultDescription: '[missing description]',
    lstmGates: [
      {
        id: 0,
        title: 'Layer Input',
        description: 'Add description',
      },
      {
        id: 1,
        title: 'Input Gate',
        description: 'Add description',
      },
      {
        id: 2,
        title: 'Forget Gate',
        description: 'Add description',
      },
      {
        id: 3,
        title: 'Output Gate',
        description: 'Add description',
      },
      {
        id: 4,
        title: 'State Update',
        description: 'Add description',
      },
      {
        id: 5,
        title: 'Cell State',
        description: 'Add description',
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
  ],
};

const globalGER = {
  title: 'leaRNN',
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
        title: 'Schließen',
      },
      about: {
        title: 'Was ist leaRNN?',
        description: 'Das ist leaRNN',
      },
      faq: {
        title: 'FAQ',
        description: 'Keine Fragen bis jetzt',
      },
      impressum: {
        title: 'Impressum',
        description: 'Impressum inhalt',
      },
    },
    epoch: {
      title: 'Epochen',
      description: 'Beim Training eines Neuronalen Netzes wird eine ' +
        'vorgegebene Menge an Daten verwendet um Ausgaben des Netzes zu ' +
        'untersuchen. Eine Epoche beschreibt dabei einen Durchlauf durch ' +
        'diese Datenmenge. Pro Epoche wird diese Datenmenge in sogenannte ' +
        'batches gleicher Größe aufgeteilt. Nachdem alle Daten eines Netzes ' +
        'verwendet wurden wird ein Gesamtfehler errechnet und das Netz wird ' +
        'über das BPTT Verfahren trainiert.',
    },
    trainSteps: [
      {
        id: 0,
        title: 'Vorhersage',
        description: 'Ein zufällige Eingabe wird aus den Testdaten gewählt ' +
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
          'wird aber normalerweise eine komplexere Form der Fehlerberechnung' +
          ' verwendet um besser Änderungen zu gewährleisten.',
      },
      {
        id: 2,
        title: 'Training',
        description: 'Der Fehler wird dem Netz mitgeteil. Dieses versucht ' +
          'dann die inneren Variablen entsprechend anzupassen.',
        longDescription: 'Hier kommen wir zum eigentlichen Training ' +
          'im Trainigsprozess. Wir wissen nun für einige Eingaben wie ' +
          'gut das Netz darin ist Vorhersagen zu machen. Mit diesem ' +
          'Wissen können wir nun die Berechnung der Vorhersage rückverfolgen ' +
          'und dabei bestimmen wie die Gewichte innerhalb des Netzes hätten ' +
          'sein müssen um eine bessere Vorhersage zu bekommen. Dieser ' +
          'Rücklauf durch die Zellen und vor allem die einzelnen ' +
          'Zeitschritte nennt man Backpropagation Through Time, kurz BPTT.',
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
          ' alten und neuen Werten bestimmt werden.',
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
        longDescription: 'Mit den nun von input und forget gate berechneten' +
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
          'gate nun die wichtigen Informationen für die nachfolgenden Zelle' +
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
        description: 'Beschreibung fehlt',
      },
      {
        id: 1,
        title: 'Input Gate',
        description: 'Beschreibung fehlt',
      },
      {
        id: 2,
        title: 'Forget Gate',
        description: 'Beschreibung fehlt',
      },
      {
        id: 3,
        title: 'Output Gate',
        description: 'Beschreibung fehlt',
      },
      {
        id: 4,
        title: 'State Update',
        description: 'Beschreibung fehlt',
      },
      {
        id: 5,
        title: 'Cell State',
        description: 'Beschreibung fehlt',
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
        'In dieser Anwendung können Sie einen Wert einstellen und ' +
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
