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
      description: 'This is a description',
    },
    trainSteps: [
      {
        id: 0,
        title: 'Prediction',
        description: 'A random sample input is shown to the net value by ' +
          'value. The net than makes a predicition on how this sample would ' +
          'continue over time.',
        longDescription: 'Test',
      },
      {
        id: 1,
        title: 'Validation',
        description: 'The predicted values are compared to the target values ' +
          'and the total loss is calculated.',
        longDescription: 'An example longer Description,,,,, ' +
          'a prediction lorem ipsum',
      },
      {
        id: 2,
        title: 'Training',
        description: 'The net is told how bad its prediction was and then ' +
          'tries to update its inner variables.',
        longDescription: 'An example longer Description,,,,, ' +
          'a prediction lorem ipsum',
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
      description: 'a description, wow',
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
      description: 'a description, wow',
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
      description: 'a description, wow',
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
      description: 'Das ist eine Beschreibung',
    },
    trainSteps: [
      {
        id: 0,
        title: 'Vorhersage',
        description: 'Ein zufällige Eingabe wird aus den Testdaten gewählt ' +
          'und dem Netz präsentiert. Dieses berechnet dann eine mögliche ' +
          'Vorhersage zum weiteren Verlauf.',
        longDescription: 'Das ist eine längere Beschreibung',
      },
      {
        id: 1,
        title: 'Überprüfung',
        description: 'Die vorhergesagten Werte werden mit dem tatsächlichen ' +
          'Verlauf verglichen. Daraus wird dann ein Gesamtfehler errechnet.',
        longDescription: 'Das ist eine längere Beschreibung',
      },
      {
        id: 2,
        title: 'Training',
        description: 'Der Fehler wird dem Netz mitgeteil. Dieses versucht ' +
          'dann die inneren Variablen entsprechend anzupassen.',
        longDescription: 'Das ist eine längere Beschreibung',
      },
    ],
    lstmSteps: [
      {
        id: 0,
        title: 'Start',
        description: 'Die Zelle wartet auf alle notwendigen Eingaben.',
      },
      {
        id: 1,
        title: 'Eingabe der Ebene',
        description: 'Die Eingaben werden zu einem Wert zusammengefasst.',
      },
      {
        id: 2,
        title: 'Aktivierung',
        description: 'Die neue Eingabe wird von Input und Forget Gate' +
          ' verarbeitet.',
      },
      {
        id: 3,
        title: 'Update der Zelle',
        description: 'Es wird ein Update für den Zell Zustand errechnet.',
      },
      {
        id: 4,
        title: 'Zell Zustand',
        description: 'Der Zell Zustand wird angepasst.',
      },
      {
        id: 5,
        title: 'Ausgabe',
        description: 'Die aktuelle Eingabe wird mit dem Zell Zustand im ' +
          'Output Gate zur Ausgabe verarbeitet.',
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
      description: 'Das ist eine Beschreibung',
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
      description: 'Das ist eine Beschreibung',
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
      description: 'Das ist eine Beschreibung',
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
