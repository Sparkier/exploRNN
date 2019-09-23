
export default function (s) {
    s.props = {}
    s.preds = []
    s.mem = [];
    s.sin = [];
    s.err = [];

    s.values = 63; // Only temporary, use props instead
    s.predictions = 20; // Only temporary, use props instead
    s.marginRight = 100; 
    s.stepWidth = 2;   
    s.waveHeight = 100;

    
    s.updateMemory = () => {
        s.sin.push(Math.sin((s.props.network.iteration + s.values) * 0.1));
        if(s.sin.length > (s.width - s.marginRight / s.stepWidth) + 20) {
            s.sin = s.sin.splice(1);
        }
    }
        
    s.setup = function() {
        s.createCanvas(document.getElementById("outputDiv").offsetWidth, window.innerHeight)
    }

    s.draw = function() {
        s.background(255)
        s.stroke(0)
        s.strokeWeight(1);
        s.noFill();
        s.rect(0,0,s.width-1,s.height-1)

        s.noStroke();
        s.fill(100,250,120,100);
        // s.rect(s.width - s.marginRight - s.stepWidth * s.values,s.height / 2 - s.waveHeight,s.stepWidth * s.values,2 * s.waveHeight);
        s.noFill();
        s.stroke(200);
        s.strokeWeight(2);
        s.line(0,s.height/2,s.width,s.height/2);
        s.line(s.props.training.values * s.stepWidth,0,s.props.training.values * s.stepWidth,s.height);
        s.strokeWeight(1);
        s.line(0,s.height / 2 - s.waveHeight,s.width,s.height / 2 - s.waveHeight);
        s.line(0,s.height / 2 + s.waveHeight,s.width,s.height / 2 + s.waveHeight);
        if(s.props.network.prediction.length > 0) {
            s.preds = s.props.network.prediction;
        } else {
            s.preds = [0]
        }
        s.drawPlot();
        //s.drawPlot(s.sin, 'sin');        
        //s.drawPlot(s.mem, 'mem');
    }

    s.drawPlot = () => {
        s.noFill();
        s.strokeWeight(1);
        s.stroke(50);
        s.beginShape();
        for(let i = 0; i <= s.props.training.values; i++) {
            s.vertex(i * s.stepWidth, s.height / 2 - s.waveHeight * Math.sin((s.props.network.iteration + s.props.training.testOffset + i) * 0.1));
        }
        s.endShape();
        s.stroke(50,50);
        s.beginShape();
        for(let i = 0; i < 2 * s.props.training.predictions; i++) {
            s.vertex((i + s.props.training.values) * s.stepWidth, s.height / 2 - s.waveHeight * Math.sin((s.props.training.values + s.props.network.iteration + s.props.training.testOffset + i) * 0.1));
        }
        s.endShape();
        s.stroke(50,50,200);
        s.beginShape();
        for(let i = 0; i < s.props.training.predictions; i++) {
            s.vertex((i + s.props.training.values) * s.stepWidth, s.height / 2 - s.waveHeight * s.preds[i]);
        }
        for(let i = 0; i < s.props.training.predictions; i++) {
            s.vertex((i + s.props.training.values + s.props.training.predictions) * s.stepWidth, s.height / 2 - s.waveHeight * s.preds[i]);
        }
        s.endShape();
        s.noStroke();
        //s.ellipse(s.width - s.marginRight, s.height / 2 - s.waveHeight * data[data.length - 1],5);
    }
}