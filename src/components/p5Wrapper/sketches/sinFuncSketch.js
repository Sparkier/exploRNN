
export default function (s) {
    s.props = {}
    s.preds = []
    s.mem = [];
    s.sin = [];
    s.err = [];

    s.values = 20; // Only temporary, use props instead
    s.marginRight = 100; 
    s.stepWidth = 2;   
    s.waveHeight = 100;

    
    s.updateMemory = () => {
        s.mem.push(s.props.prediction[0]);   
        s.sin.push(Math.sin((s.props.iteration + s.values) * 0.1));
        s.err.push(s.props.prediction[0] - Math.sin((s.props.iteration + s.values) * 0.1));
        if(s.mem.length > (s.width - s.marginRight / s.stepWidth) + 20) {
            s.mem = s.mem.splice(1);
        }
        if(s.sin.length > (s.width - s.marginRight / s.stepWidth) + 20) {
            s.sin = s.sin.splice(1);
        }
        if(s.err.length > (s.width - s.marginRight / s.stepWidth) + 20) {
            s.err = s.err.splice(1);
        }
    }
        
    s.setup = function() {
        s.createCanvas(1000, 500)
    }

    s.draw = function() {
        s.background(255)
        s.stroke(0)
        s.strokeWeight(1);
        s.noFill();
        s.rect(0,0,s.width-1,s.height-1)

        s.noStroke();
        s.fill(100,250,120,100);
        s.rect(s.width - s.marginRight - s.stepWidth * s.values,s.height / 2 - s.waveHeight,s.stepWidth * s.values,2 * s.waveHeight);
        s.noFill();
        s.stroke(200);
        s.strokeWeight(2);
        s.line(0,s.height/2,s.width,s.height/2);
        s.line(s.width - s.marginRight,0,s.width - s.marginRight,s.height);
        s.strokeWeight(1);
        s.line(0,s.height / 2 - s.waveHeight,s.width,s.height / 2 - s.waveHeight);
        s.line(0,s.height / 2 + s.waveHeight,s.width,s.height / 2 + s.waveHeight);
        if(s.props.prediction.length > 0) {
            s.preds = s.props.prediction;
        } else {
            s.preds = [0]
        }
        s.drawPlot(s.err, 'err');
        s.drawPlot(s.sin, 'sin');        
        s.drawPlot(s.mem, 'mem');
    }

    s.drawPlot = (data, color) => {
        switch(color) {
            case 'mem':
                s.stroke(50,50,200);
                break;
            case 'sin':
                s.stroke(150);
                break;
            case 'err':
                s.stroke(250,100,100);
                break;
            default:
                s.stroke(0);
        }
        s.noFill();
        s.strokeWeight(1);
        s.beginShape();
        for(let i = data.length - 1, j = 0; i >= 0; i--, j++) {
            s.vertex(s.width - s.marginRight - j++*s.stepWidth, s.height / 2 + s.waveHeight * data[i]);
            if(j > (s.width - s.marginRight / s.stepWidth)) {
                break;
            }
        }
        s.endShape();
        switch(color) {
            case 'mem':
                s.fill(10,10,150);
                break;
            case 'sin':
                s.fill(100);
                break;
            case 'err':
                s.fill(150,10,10);
                break;
            default:
                s.fill(0);
        }
        s.noStroke();
        s.ellipse(s.width - s.marginRight, s.height / 2 + s.waveHeight * data[data.length - 1],5);
    }
}