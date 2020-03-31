/**
 * This class represents the plots of the output side
 * of the network visualisation
 */
export class NetworkPlot {
  /**
   * The constructor function of the class plot
   *
   * @param {number} index the index of the plot, 2 being the currently used
   * data by the network
   * @param {object} s the p5 js sketch
   */
  constructor(index, s) {
    this.s = s;
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
   * Draws the heading of the output
   */
  plotHeading() {
    const s = this.s;
    if (this.index === 2) {
      const offset = s.height * s.typography.titleOffsetRatio;
      s.textAlign(s.LEFT, s.CENTER);
      s.textSize(s.typography.fontsize);
      s.fill(s.colors.darkgrey);
      s.noStroke();
      s.text(s.global.strings.predictionTitle, s.outProps.left + 20,
          offset / 2);
    }
  }

  /**
   * Draws the text output of the network
   */
  plotText() {
    let data = '';
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
    // Plots far from the center are less big and more transparent (index != 2)
    this.scale = 1 - 0.5 * (Math.abs(s.outProps.midY - this.cy - yOff) /
        s.outProps.midY);
    this.vis = 255 - 255 * Math.abs(this.cy + yOff - s.outProps.midY) /
      (s.height/4);
    s.push();
    s.translate(this.cx - this.halfW, this.cy + yOff);
    // Draw the Box
    s.textAlign(s.CENTER, s.CENTER);
    s.rectMode(s.CENTER);
    s.colors.darkbluegrey.setAlpha(this.vis);
    s.fill(s.colors.darkbluegrey);
    s.noStroke();
    s.colors.darkbluegrey.setAlpha(255);
    // s.rect(-this.halfW * this.scale, 0, 0.5 * s.netProps.height, titleH, 5);

    // draw the scan box while animating
    if (s.plotAnim && s.plotFrame > s.plotMoveFrames &&
      s.plotFrame < s.plotMoveFrames + s.plotScanFrames && this.index === 2) {
      const right = showSteps * this.stepWidth;
      let left = right - (this.in * this.stepWidth);
      if (left < 0) {
        left = 0;
      }
      s.noStroke();
      s.colors.lightgrey.setAlpha(100);
      s.fill(s.colors.lightgrey);
      s.colors.lightgrey.setAlpha(255);
      s.rect(left + (right - left) / 2, 0, this.scale * (right-left),
          3*s.typography.fontsize, 10);
    }
    s.strokeWeight(1 * this.scale);

    // draw input for validation
    if (s.props.ui.data && s.props.ui.data[this.index].chartPrediction) {
      s.colors.bluegrey.setAlpha(this.vis);
      s.textSize(s.typography.fontsize);
      s.fill(s.colors.bluegrey);
      s.colors.bluegrey.setAlpha(255);
      for (let i = 0; i <= this.in; i++) {
        data = s.props.ui.data[this.index].chartPrediction[i];
        if (data) {
          if (Object.prototype.hasOwnProperty.call(
              s.props.textData, 'textString')) {
            data = s.props.textData.getFromOneHot(data);
            s.textSize(s.typography.fontsize);
            s.noStroke();
            s.text(data, i * this.stepWidth, 0);
          }
        } else {
          data = '';
        }
      }
    }
    // draw the test output for validation
    if (s.props.ui.data &&
      s.props.ui.data[this.index].chartOutput) {
      for (let i = 0; i < this.out; i++) {
        data = s.props.ui.data[this.index].chartOutput[i];
        if (data) {
          if (Object.prototype.hasOwnProperty.call(
              s.props.textData, 'textString')) {
            data = s.props.textData.getFromOneHot(data);
            s.text(data, (i + this.in) * this.stepWidth,
                -s.typography.fontsize);
          }
        }
      }
    }
    // draw net prediction for validation
    if (s.props.ui.data &&
      s.props.ui.data[this.index].prediction && (this.index > 2 ||
        (this.index === 2 && (s.plotAnim === false || (s.plotAnim === true &&
          s.plotFrame > s.plotMoveFrames))))) {
      s.colors.overview.setAlpha(this.vis);
      s.fill(s.colors.overview);
      s.colors.overview.setAlpha(255);
      for (let i = 0; i < this.out && i < showSteps - this.in; i++) {
        if (s.props.ui.data[this.index].prediction) {
          data = s.props.ui.data[this.index].prediction[i];
          if (data) {
            if (Object.prototype.hasOwnProperty.call(
                s.props.textData, 'textString')) {
              data = s.props.textData.getFromOneHot(data);
              s.text(data, (i + this.in) * this.stepWidth,
                  s.typography.fontsize);
            }
          }
        }
      }
      s.endShape();
    }
    s.pop();
  }

  /**
   * Draws the plot with all calculated values
   */
  plotFunction() {
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
    // Plots far from the center are less big and more transparent (index != 2)
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
        s.colors.overview.setAlpha(this.vis);
        s.stroke(s.colors.overview);
        s.colors.overview.setAlpha(255);
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
      s.colors.overview.setAlpha(this.vis);
      s.stroke(s.colors.overview);
      s.colors.overview.setAlpha(255);
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
    if (this.s.netFrame > this.s.netPredFrames + this.s.netLossFrames) {
      // Draw the error bars for training
      if (s.props.ui.data &&
      s.props.ui.data[this.index].prediction && (this.index > 2 ||
        (this.index === 2 && (s.plotAnim === false || (s.plotAnim === true &&
          s.plotFrame > s.plotMoveFrames))))) {
        s.colors.overviewlight.setAlpha(this.vis);
        s.stroke(s.colors.overviewlight);
        s.colors.overview.setAlpha(255);
        for (let i = 0; i < this.out; i++) {
          if (s.props.ui.data[this.index].prediction) {
            const dataPred = s.props.ui.data[this.index].prediction[i];
            const dataOut = s.props.ui.data[this.index].chartOutput[i];
            const from = -this.halfH / 2 * dataPred;
            const to = -this.halfH / 2 * dataOut;
            const ratio = (this.s.netFrame - (this.s.netPredFrames +
              this.s.netLossFrames)) / this.s.netTrainFrames;
            s.line(
                this.scale * (-this.halfW + ((i + this.in) * this.stepWidth)),
                this.scale * from,
                this.scale * (-this.halfW + ((i + this.in) * this.stepWidth)),
                this.scale * (from + (to - from) * ratio));
          }
        }
        s.noStroke();
      }
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
    if (this.s.props.training.inputType === 'Text Data') {
      this.plotText();
      this.plotHeading();
    } else {
      this.plotFunction();
      this.plotHeading();
    }
  }
}
