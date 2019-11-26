/**
 * This class represents the plots of the input and output sides
 * of the network visualisation
 */
export class Plot {
  /**
   * The constructor function of the class plot
   *
   * @param {number} index the index of the plot, 2 being the currently used
   * data by the network
   * @param {string} side either L or R, representing the left or right side
   * @param {object} s the p5 js sketch
   */
  constructor(index, side, s) {
    this.s = s;
    this.side = side;
    this.index = index;
    this.scale = 0.7;
    this.vis = 255 - Math.abs(2-index) * 110;
    if (side === 'L') {
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
    if (!s.props) {
      return;
    }
    if (s.props.training.values + s.props.training.predictions === 0) {
      this.stepWidth = 2;
    } else {
      this.total = s.props.training.values + s.props.training.predictions;
      this.stepWidth = this.plotWidth / this.total;
    }
  }

  /**
   * The drawing function of the plot class, responsible for drawing the plots
   * onto the network canvas
   */
  draw() {
    const s = this.s;
    if (!s.props) {
      return;
    }
    if (s.props.training.values + s.props.training.predictions === 0) {
      this.stepWidth = 2;
    } else {
      this.total = s.props.training.values + s.props.training.predictions;
      this.stepWidth = this.plotWidth / this.total;
    }
    this.in = s.props.training.values;
    this.out = s.props.training.predictions;
    this.total = this.in + this.out;
    this.halfW = this.plotWidth / 2;
    this.halfH = this.plotHeight / 2;
    let data;
    if (this.stepWidth === 2 && this.total !== 0) {
      this.stepWidth = this.plotWidth / this.total;
    }
    if (!s.props.ui.detail) {
      s.push();
      s.translate(this.cx, this.cy);
      s.ellipseMode(s.CENTER);
      s.stroke(200, this.vis);
      s.strokeWeight(2 * this.scale);
      if (this.index===2) {
        s.rect(0, 0, this.scale * this.plotWidth,
            this.scale * this.plotHeight);
      }
      s.stroke(54, this.vis);
      s.line(-this.halfW * this.scale, 0, this.halfW * this.scale, 0);
      s.line(this.scale * ((-this.halfW) + (this.in * this.stepWidth)),
          -this.halfH * this.scale,
          this.scale * (-this.halfW + (this.in * this.stepWidth)),
          this.scale * this.halfH
      );
      s.strokeWeight(3 * this.scale);
      if (s.props.ui.data &&
          s.props.ui.data.chartPrediction) {
        s.stroke(50, 70, 250, this.vis);
        s.noFill();
        s.beginShape();
        for (let i = 0; i < this.in; i++) {
          data = s.props.ui.data.chartPrediction[i];
          s.vertex(this.scale * (-this.halfW + i * this.stepWidth),
              this.scale * (-this.halfH / 2 * data));
        }
        s.endShape();
      }
      if (s.props.ui.data &&
          s.props.ui.data.chartOutput) {
        if (this.side === 'L') {
          s.stroke(50, 250, 50, this.vis);
        } else {
          s.stroke(250, 50, 70, this.vis);
        }
        s.noFill();
        s.beginShape();
        for (let i = 0; i < this.out; i++) {
          data = s.props.ui.data.chartPrediction[i];
          if (this.side === 'L') {
            data = s.props.ui.data.chartOutput[i];
            s.vertex(
                this.scale * (-this.halfW + ((i + this.in) * this.stepWidth)),
                this.scale * (-this.halfH / 2 * data));
          } else {
            if (s.props.ui.data.prediction) {
              data = s.props.ui.data.prediction[i];
              s.vertex(
                  this.scale * (-this.halfW + ((i + this.in) * this.stepWidth)),
                  this.scale * (-this.halfH / 2 * data));
            }
          }
        }
        s.endShape();
      }
      s.pop();
    } else {
      if (this.index !== 2) {
        // return;
      }
      let detailStepWidth = this.stepWidth;
      s.push();
      s.translate(this.cx, this.cy);
      s.ellipseMode(s.CENTER);
      s.stroke(200, this.vis);
      s.strokeWeight(2 * this.scale);
      if (this.index===2) {
        s.rect(0, 0, this.plotWidth, this.plotHeight);
      }
      s.stroke(54, this.vis);
      s.line(-this.plotWidth/2, 0, this.plotWidth / 2, 0);
      if (this.side === 'L') {
        s.line(this.halfW, -this.halfH, this.halfW, this.halfH);
      } else {
        s.line(-this.halfW, -this.halfH, -this.halfW, this.halfH);
      }
      s.strokeWeight(3 * this.scale);
      if (this.side === 'L' && s.props.network.data &&
          s.props.network.data[this.index].chartPrediction) {
        detailStepWidth = this.plotWidth / this.in;
        s.strokeWeight(2 * this.scale);
        s.stroke(150, this.vis);
        s.noFill();
        s.beginShape();
        for (let i = 0; i < this.in; i++) {
          data = s.props.network.data[this.index].chartPrediction[i];
          s.vertex(-this.halfW + (i * detailStepWidth),
              -this.halfH / 2 * data);
        }
        s.endShape();
        if (this.index <= 2 ) {
          s.strokeWeight(3 * this.scale);
          s.stroke(50, 70, 250, this.vis);
          s.noFill();
          s.beginShape();
          const max = this.index === 2 ? s.lstmStep : this.in;
          for (let i = 0; i <= max; i++) {
            data = s.props.network.data[this.index].chartPrediction[i];
            s.vertex(-this.halfW + (i * detailStepWidth),
                -this.halfH / 2 * data);
          }
          s.endShape();
          s.noStroke();
          s.fill(50, 70, 250, this.vis);
          for (let i = 0; i <= max; i++) {
            data = s.props.network.data[this.index].chartPrediction[i];
            s.ellipse(-this.halfW + (i * detailStepWidth),
                (-this.halfH / 2 * data), 5);
          }
          if (this.index === 2) {
            const step = s.lstmStep;
            data = s.props.network.data[this.index].chartPrediction[step];
            s.ellipse(-this.halfW + (s.lstmStep * detailStepWidth),
                -this.halfH / 2 * data, 7);
          }
        }
      }
      if (this.side === 'R' && s.props.network.data &&
          s.props.network.data[this.index].chartOutput) {
        detailStepWidth = this.plotWidth / this.out;
        let ratio = this.s.lstmStep / this.in;
        if (this.index !== 2) {
          ratio = 1;
        }
        if (s.props.network.data[this.index].prediction) {
          s.stroke(250, 50, 70, this.vis);
          s.noFill();
          s.beginShape();
          for (let i = 0; i < s.props.training.predictions; i++) {
            data = s.props.network.data[this.index].prediction[i];
            s.vertex((-this.halfW + (i * detailStepWidth)),
                -this.halfH / 2 * data * ratio);
          }
          s.endShape();

          s.noStroke();
          s.fill(250, 50, 70, this.vis);
          for (let i = 0; i < s.props.training.predictions; i++) {
            data = s.props.network.data[this.index].prediction[i];
            s.ellipse((-this.halfW + (i * detailStepWidth)),
                -this.halfH / 2 * data * ratio, 5);
          }
        }
      }
      s.pop();
    }
  }
}
