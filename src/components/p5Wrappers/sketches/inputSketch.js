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
        constructor(index) {
            this.index = index;
            this.scale = 0.8;
            this.vis = 255 - Math.abs(2-index) * 110;
            this.cx = s.width / 2;
            this.cy = (5 - index - 0.5) * (s.height / 5);
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
            s.stroke(255, this.vis);
            s.strokeWeight(2 * this.scale)
            s.line(-this.plotWidth/2 * this.scale, 0, this.plotWidth / 2 * this.scale, 0);
            s.line(-this.plotWidth/2 * this.scale, -this.plotHeight/2 * this.scale, -this.plotWidth/2* this.scale, this.scale * this.plotHeight/2)
            if(s.props.network.data && s.props.network.data[this.index].chartInput){
                s.stroke(50,70,250,this.vis);
                s.noFill();
                s.beginShape();
                for(let i = 0; i < s.props.training.values; i++) {
                    s.vertex(this.scale * ((-this.plotWidth / 2) + (i * this.stepWidth)), this.scale * (this.plotHeight / 4 * s.props.network.data[this.index].chartInput[i]));
                }
                s.endShape();
            }
            if(s.props.network.data && s.props.network.data[this.index].chartOutput){
                s.stroke(50,250,50,this.vis);
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
        
    s.windowResized = function(){
        s.resizeCanvas(document.getElementById("inputDiv").offsetWidth, window.innerHeight - document.getElementById("valueDiv").offsetHeight - 25)
        s.plot = [new Plot(0), new Plot(1), new Plot(2), new Plot(3), new Plot(4)]
    }

    s.setup = function() {
        s.createCanvas(document.getElementById("inputDiv").offsetWidth, window.innerHeight - document.getElementById("valueDiv").offsetHeight - 25)
        
        s.plot = [new Plot(0), new Plot(1), new Plot(2), new Plot(3), new Plot(4)]
    }

    s.draw = function() {
        s.background(25)
        /*for (let p of s.plot) {
            p.draw();
        }*/
        s.plot[4].draw();
        s.plot[3].draw();
        s.plot[2].draw();
    }
}