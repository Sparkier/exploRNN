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
        learningRate: 0.15,
        iteration: 0
    },
    training: false,
    firstcall: true,
}