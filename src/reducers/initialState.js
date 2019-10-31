// Set the initial State of the Application
export default {
    id: '',
    alertSnack: {
        open: false,
        message: ''
    },
    network: {
        data: Array(5).fill({}),
        layerSize: 8,
        layers: 3,
        learningRate: 0.2,
        iteration: 0,
        type: 'LSTM',
        activation: 'tanh'
    },
    training: {
        running: false,
        speed: 1000,
        dataType: 'saw',
        dataVariant: 'random',
        noise: 0,
        values: 0,
        predictions: 0,
        testOffset: 0,
        stepSize: 0.1,
        reset: false,
        step: false,
    },
    ui: {
        detail: false,
        speed: 850,
        anim: true,
        animStep: false,
    },
    firstcall: true,
}