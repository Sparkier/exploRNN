
export default function (s) {
    s.props = {}
    s.preds = []
    s.mem = [];
    s.sin = [];
    s.err = [];
    s.marginRight = 100; 
    s.stepWidth = 2;   
    s.waveHeight = 100;

    class Plot {
        constructor(index, scale) {
            this.index = index;
            this.scale = scale;
            this.cx = s.width / 2;
            this.cy = (5 - index) * (s.height / 6) + (2 - index) * 30;
            this.plotWidth = s.width * 0.75;
            this.plotHeight = s.height * 0.2;
            if(s.props.training.values + s.props.training.predictions === 0) {
                this.stepWidth = 2
            } else {
                this.stepWidth = this.plotWidth / (s.props.training.values + s.props.training.predictions);
            }
        }
        
        draw() {
            if(this.stepWidth === 2 && s.props.training.values + s.props.training.predictions !== 0) {
                this.stepWidth = this.plotWidth / (s.props.training.values + s.props.training.predictions);
            }
            s.push();
            s.translate(this.cx, this.cy);
            s.ellipseMode(s.CENTER)
            s.stroke(255, 255 * this.scale);
            s.strokeWeight(3 * this.scale)
            s.line(-this.plotWidth/2 * this.scale, 0, this.plotWidth / 2 * this.scale, 0);
            s.line(-this.plotWidth/2 * this.scale, -this.plotHeight/2 * this.scale, -this.plotWidth/2* this.scale, this.scale * this.plotHeight/2)
            if(s.props.network.data && s.props.network.data[this.index].chartInput){
                s.stroke(50,50,200, 255 * this.scale);
                s.noFill();
                s.beginShape();
                for(let i = 0; i < s.props.training.values; i++) {
                    s.vertex(this.scale * ((-this.plotWidth / 2) + (i * this.stepWidth)), this.scale * (this.plotHeight / 4 * s.props.network.data[this.index].chartInput[i]));
                }
                s.endShape();
            }
            if(s.props.network.data && s.props.network.data[this.index].chartOutput){
                s.stroke(50,200,50, 255 * this.scale);
                s.noFill();
                s.beginShape();
                for(let i = 0; i < s.props.training.predictions; i++) {
                    s.vertex(this.scale* ((-this.plotWidth / 2) + ((i + s.props.training.values) * this.stepWidth)), this.scale * (this.plotHeight / 4 * s.props.network.data[this.index].chartOutput[i]));
                }
                s.endShape();
            }
            s.pop();
        }
    }
    
    s.updateMemory = () => {
        s.sin.push(Math.sin((s.props.network.iteration + s.values) * 0.1));
        if(s.sin.length > (s.width - s.marginRight / s.stepWidth) + 20) {
            s.sin = s.sin.splice(1);
        }
    }
        
    s.setup = function() {
        s.createCanvas(document.getElementById("inputDiv").offsetWidth, window.innerHeight)
        s.plot = [new Plot(0,0.4), new Plot(1,0.75), new Plot(2,1), new Plot(3,0.75), new Plot(4,0.4)]
        console.log(s.plot);
    }

    s.draw = function() {
        s.background(25)
        for (let p of s.plot) {
            p.draw();
        }
    }
}