export class Plot {
    constructor(index, side, s) {
        this.s = s;
        this.side = side
        this.index = index;
        this.scale = 0.8;
        this.vis = 255 - Math.abs(2-index) * 110;
        if(side === 'L') {
            this.l = s.inLeft;
            this.r = s.inRight;
        } else {
            this.l = s.outLeft;
            this.r = s.outRight;
        }
        this.cx = this.l + s.sideWidth / 2;
        this.cy = (5 - index - 0.5) * (s.height / 5);
        this.plotWidth = s.sideWidth * 0.7;
        this.plotHeight = s.height * 0.2;
        if(s.props.training.values + s.props.training.predictions === 0) {
            this.stepWidth = 2
        } else {
            this.stepWidth = this.plotWidth / (s.props.training.values + s.props.training.predictions);
        }
    }
    
    draw() {
        let s = this.s;
        if(this.stepWidth === 2 && s.props.training.values + s.props.training.predictions !== 0) {
            this.stepWidth = this.plotWidth / (s.props.training.values + s.props.training.predictions);
        }
        if(!s.props.ui.detail){
            s.push();
            s.translate(this.cx, this.cy);
            s.ellipseMode(s.CENTER)
            s.stroke(200, this.vis);
            s.strokeWeight(2 * this.scale)
            if(this.index===2)
                s.rect(0,0,this.plotWidth,this.plotHeight)
            s.stroke(54, this.vis);
            s.line(-this.plotWidth/2 * this.scale, 0, this.plotWidth / 2 * this.scale, 0);
            s.line(this.scale* ((-this.plotWidth / 2) + ((s.props.training.values) * this.stepWidth)), -this.plotHeight/2 * this.scale, this.scale* ((-this.plotWidth / 2) + ((s.props.training.values) * this.stepWidth)), this.scale * this.plotHeight/2)
        
            s.strokeWeight(3 * this.scale)
            if(s.props.network.data && s.props.network.data[this.index].chartPrediction){
                s.stroke(50,70,250,this.vis);
                s.noFill();
                s.beginShape();
                for(let i = 0; i < s.props.training.values; i++) {
                    s.vertex(this.scale * ((-this.plotWidth / 2) + (i * this.stepWidth)), this.scale * (-this.plotHeight / 4 * s.props.network.data[this.index].chartPrediction[i]));
                }
                s.endShape();
            }
            if(s.props.network.data && s.props.network.data[this.index].chartOutput){
                if(this.side === 'L')
                    s.stroke(50,250,50,this.vis);
                else 
                    s.stroke(250,50,70, this.vis);
                s.noFill();
                s.beginShape();
                for(let i = 0; i < s.props.training.predictions; i++) {
                    if(this.side === 'L')
                        s.vertex(this.scale* ((-this.plotWidth / 2) + ((i + s.props.training.values) * this.stepWidth)), this.scale * (-this.plotHeight / 4 * s.props.network.data[this.index].chartOutput[i]));
                    else
                        s.vertex(this.scale* ((-this.plotWidth / 2) + ((i + s.props.training.values) * this.stepWidth)), this.scale * (-this.plotHeight / 4 * s.props.network.data[this.index].prediction[i]));
                }
                s.endShape();
            }
            s.pop();
        } else {
            if(this.index !== 2) {
                //return;
            }
            let detailStepWidth = this.stepWidth;
            s.push();
            s.translate(this.cx, this.cy);
            s.ellipseMode(s.CENTER)
            s.stroke(200, this.vis);
            s.strokeWeight(2 * this.scale)
            if(this.index===2)
                s.rect(0,0,this.plotWidth,this.plotHeight)
            s.stroke(54, this.vis);
            s.line(-this.plotWidth/2, 0, this.plotWidth / 2, 0);
            if(this.side === 'L')
                s.line((this.plotWidth / 2), -this.plotHeight/2 ,(this.plotWidth / 2),  this.plotHeight/2)
            else 
                s.line((-this.plotWidth / 2), -this.plotHeight/2 ,(-this.plotWidth / 2),this.plotHeight/2)
            s.strokeWeight(3 * this.scale)
            if(this.side === 'L' && s.props.network.data && s.props.network.data[this.index].chartPrediction){
                detailStepWidth = this.plotWidth / s.props.training.values;
                s.strokeWeight(2 * this.scale)
                s.stroke(150,this.vis);
                s.noFill();
                s.beginShape();
                for(let i = 0; i < s.props.training.values; i++) {
                    s.vertex( ((-this.plotWidth / 2) + (i * detailStepWidth)), (-this.plotHeight / 4 * s.props.network.data[this.index].chartPrediction[i]));
                }
                s.endShape();
                if(this.index <= 2 ){
                    s.strokeWeight(3 * this.scale)
                    s.stroke(50,70,250,this.vis);
                    s.noFill();
                    s.beginShape();
                    for(let i = 0; (i <= (this.index === 2 ? s.lstmStep : s.props.training.values)); i++) {
                        s.vertex( ((-this.plotWidth / 2) + (i * detailStepWidth)), (-this.plotHeight / 4 * s.props.network.data[this.index].chartPrediction[i]));
                    }
                    s.endShape();
                    
                    s.noStroke();
                    s.fill(50,70,250,this.vis);
                    for(let i = 0; (i <= (this.index === 2 ? s.lstmStep : s.props.training.values)); i++) {
                        s.ellipse( ((-this.plotWidth / 2) + (i * detailStepWidth)),  (-this.plotHeight / 4 * s.props.network.data[this.index].chartPrediction[i]),5);
                    }
                    if(this.index === 2)
                        s.ellipse( ((-this.plotWidth / 2) + (s.lstmStep * detailStepWidth)),  (-this.plotHeight / 4 * s.props.network.data[this.index].chartPrediction[s.lstmStep]),7);
                }
            }
            if(this.side === 'R' && s.props.network.data && s.props.network.data[this.index].chartOutput){
                detailStepWidth = this.plotWidth / s.props.training.predictions;
                let ratio  = this.s.lstmStep / this.s.props.training.values;
                if(this.index !== 2) {
                    ratio = 1;
                }
                s.stroke(250,50,70, this.vis);
                s.noFill();
                s.beginShape();
                for(let i = 0; i < s.props.training.predictions; i++) {
                    s.vertex(((-this.plotWidth / 2) + (i * detailStepWidth)),  (-this.plotHeight / 4 * s.props.network.data[this.index].prediction[i] * ratio));
                }
                s.endShape();
                s.noStroke();
                s.fill(250,50,70, this.vis);
                for(let i = 0; i < s.props.training.predictions; i++) {
                    s.ellipse( ((-this.plotWidth / 2) + (i * detailStepWidth)),  (-this.plotHeight / 4 * s.props.network.data[this.index].prediction[i]) * ratio,5);
                }
            }
            s.pop();
        }
    }
}