// Set the initial State of the Application
export default {
    id: '',
    alertSnack: {
        open: false,
        message: ''
    },
    network: {
        prediction: [],
        layerSize: 2,
        learningRate: 0.02,
        iteration: 0
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