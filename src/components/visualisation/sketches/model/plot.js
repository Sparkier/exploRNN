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
    this.vis = 255 - Math.abs(2-index) * 110;
    this.cx = s.outProps.midX;
    this.cy = ((index - 1) + 0.5) * (s.outProps.height / 3);
    this.scale = 1 - 0.5 * (Math.abs(s.height/2 - this.cy) / (s.height/2));
    this.plotWidth = s.outProps.width * 0.8;
    this.plotHeight = s.outProps.height * 0.3;
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
   *
   */
  overview() {
    let data;
    const s = this.s;
    let yOff = 0;
    let showSteps = this.in + this.out;
    if (s.plotAnim && s.plotFrame < s.plotMoveFrames) {
      // calc the position of a moving plot
      yOff = -s.outProps.height/3 * (1 - (s.plotFrame / s.plotMoveFrames));
    }
    if (s.plotAnim && s.plotFrame > s.plotMoveFrames &&
        s.plotFrame < s.plotMoveFrames + s.plotScanFrames && this.index === 2) {
      // calc the amount of plot values to show
      showSteps = ((s.plotFrame - s.plotMoveFrames) / s.plotScanFrames) *
        this.total;
    }
    if (showSteps > this.in + this.out) {
      showSteps = this.in + this.out;
    }
    this.scale = 1 - 0.5 * (Math.abs(s.outProps.midY - this.cy - yOff) /
        s.outProps.midY);
    this.vis = 255 - 255 * Math.abs(this.cy + yOff - s.outProps.midY) /
      (s.height/4);
    s.push();
    s.translate(this.cx, this.cy + yOff);
    s.strokeWeight(2 * this.scale);
    s.colors.darkbluegrey.setAlpha(this.vis);
    s.stroke(s.colors.darkbluegrey);
    s.colors.darkbluegrey.setAlpha(255);
    s.line(-this.halfW * this.scale, 0, this.halfW * this.scale, 0);
    s.line(this.scale * ((-this.halfW) + (this.in * this.stepWidth)),
        -this.halfH * this.scale,
        this.scale * (-this.halfW + (this.in * this.stepWidth)),
        this.scale * this.halfH
    );
    // draw the scan box while animating
    if (s.plotAnim && s.plotFrame > s.plotMoveFrames &&
      s.plotFrame < s.plotMoveFrames + s.plotScanFrames && this.index === 2) {
      const right = (-this.halfW) + (showSteps * this.stepWidth);
      let left = right - (this.in * this.stepWidth);
      if (left < -this.halfW) {
        left = -this.halfW;
      }
      s.noStroke();
      s.colors.lightgrey.setAlpha(100);
      s.fill(s.colors.lightgrey);
      s.colors.lightgrey.setAlpha(255);
      s.rect(left + (right - left) / 2, 0, this.scale * (right-left),
          1.8 * this.scale * this.halfH, 10);
    }
    s.strokeWeight(1 * this.scale);
    // draw input for validation
    if (s.props.ui.data &&
          s.props.ui.data[this.index].chartPrediction) {
      s.colors.bluegrey.setAlpha(this.vis);
      s.stroke(s.colors.bluegrey);
      s.colors.bluegrey.setAlpha(255);
      s.noFill();
      s.beginShape();
      for (let i = 0; i <= this.in; i++) {
        data = s.props.ui.data[this.index].chartPrediction[i];
        s.vertex(this.scale * (-this.halfW + i * this.stepWidth),
            this.scale * (-this.halfH / 2 * data));
      }
      data = s.props.ui.data[this.index].chartOutput[0];
      s.vertex(
          this.scale * (-this.halfW + ((this.in) * this.stepWidth)),
          this.scale * (-this.halfH / 2 * data));
      s.endShape();
      s.strokeWeight(3 * this.scale);
      if (s.plotAnim === true && s.plotFrame > s.plotMoveFrames) {
        s.palette.ovPrimary.setAlpha(this.vis);
        s.stroke(s.palette.ovPrimary);
        s.palette.ovPrimary.setAlpha(255);
        s.beginShape();
        for (let i = Math.round(showSteps) - this.in;
          i <= showSteps && i <= this.in;
          i++
        ) {
          if (i < 0) {
            i = 0;
          }
          data = s.props.ui.data[this.index].chartPrediction[i];
          s.vertex(this.scale * (-this.halfW + i * this.stepWidth),
              this.scale * (-this.halfH / 2 * data));
        }
        if (showSteps > this.in) {
          data = s.props.ui.data[this.index].prediction[0];
          s.vertex(
              this.scale * (-this.halfW + ((this.in) * this.stepWidth)),
              this.scale * (-this.halfH / 2 * data));
        }
        s.endShape();
      }
    }
    // draw the test output for validation
    s.strokeWeight(1 * this.scale);
    if (s.props.ui.data &&
      s.props.ui.data[this.index].chartOutput) {
      s.colors.bluegrey.setAlpha(this.vis);
      s.stroke(s.colors.bluegrey);
      s.colors.bluegrey.setAlpha(255);
      s.noFill();
      s.beginShape();
      for (let i = 0; i < this.out; i++) {
        data = s.props.ui.data[this.index].chartOutput[i];
        s.vertex(
            this.scale * (-this.halfW + ((i + this.in) * this.stepWidth)),
            this.scale * (-this.halfH / 2 * data));
      }
      s.endShape();
    }
    // draw net prediction for validation
    s.strokeWeight(3 * this.scale);
    if (s.props.ui.data &&
      s.props.ui.data[this.index].prediction && (this.index > 2 ||
        (this.index === 2 && (s.plotAnim === false || (s.plotAnim === true &&
          s.plotFrame > s.plotMoveFrames))))) {
      s.palette.ovPrimary.setAlpha(this.vis);
      s.stroke(s.palette.ovPrimary);
      s.palette.ovPrimary.setAlpha(255);
      s.noFill();
      s.beginShape();
      for (let i = 0; i < this.out && i < showSteps - this.in; i++) {
        if (s.props.ui.data[this.index].prediction) {
          data = s.props.ui.data[this.index].prediction[i];
          s.vertex(
              this.scale * (-this.halfW + ((i + this.in) * this.stepWidth)),
              this.scale * (-this.halfH / 2 * data));
        }
      }
      s.endShape();
    }
    s.pop();
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
    if (this.stepWidth === 2 && this.total !== 0) {
      this.stepWidth = this.plotWidth / this.total;
    }
    this.overview();
    if (this.index === 2) {
      const offset = s.height * s.typography.titleOffsetRatio;
      const titleH = s.typography.fontsize * 2;
      s.textAlign(s.CENTER, s.CENTER);
      s.rectMode(s.CENTER);
      s.fill(s.palette.tooltipBG);
      s.noStroke();
      s.rect(this.cx, offset / 2, 0.2 * s.netProps.height, titleH, 5);
      s.textSize(s.typography.fontsize);
      s.fill(s.palette.tooltipFG);
      s.noStroke();
      s.text(s.global.strings.predictionTitle, this.cx, offset / 2);
    }
  }
}
