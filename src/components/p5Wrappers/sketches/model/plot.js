export class Plot {
    constructor(index, side, s) {
        this.s = s;
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
        this.plotWidth = s.sideWidth*0.7;
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
        s.push();
        s.translate(this.cx, this.cy);
        s.ellipseMode(s.CENTER)
        s.stroke(54, this.vis);
        s.strokeWeight(2 * this.scale)
        s.rect(this.l,0,s.sideWidth,s.height)
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
            s.stroke(50,250,50,this.vis);
            s.noFill();
            s.beginShape();
            for(let i = 0; i < s.props.training.predictions; i++) {
                s.vertex(this.scale* ((-this.plotWidth / 2) + ((i + s.props.training.values) * this.stepWidth)), this.scale * (-this.plotHeight / 4 * s.props.network.data[this.index].chartOutput[i]));
            }
            s.endShape();
        }
        s.pop();
    }
}