// Set the initial State of the Application
export default {
    id: '',
    alertSnack: {
        open: false,
        message: ''
    },
    network: {
        prediction: [],
        input: [],
        output: [],
        layerSize: 2,
        layers: 1,
        learningRate: 0.2,
        iteration: 0,
        type: 'LSTM',
        activation: 'tanh'
    },
    training: {
        running: false,
        values: 0,
        predictions: 0,
        testOffset: 0,
        stepSize: 0.1
    },
    firstcall: true,
}