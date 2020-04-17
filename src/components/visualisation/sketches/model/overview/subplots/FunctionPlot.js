/* eslint-disable no-invalid-this */
/**
 * Draws the plot with all calculated values
 *
 * @param {object} s the p5 js sketch
 */
export function drawFunctionPlot(s) {
  let data;
  let offset = 1;
  let showSteps = this.in + this.out;

  // only draw the current and the previous plot
  if (this.index === 2 || this.index === 3) {
    if (s.plotAnim && s.plotFrame < s.plotMoveFrames) {
    // calc the offset of a transitioning plot
      offset = s.plotFrame / s.plotMoveFrames;
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
    // old plot is less big and more transparent (index != 2)
    let xOffset = 0;
    if (this.index === 2) {
      this.scale = offset;
      this.vis = offset * 255;
      xOffset = -this.halfW * (1-offset);
    } else if (this.index === 3) {
      this.scale = 1 - offset;
      this.vis = 255 - offset * 255;
      xOffset = this.halfW * offset;
    }

    // actually draw stuff
    s.push();
    s.translate(this.cx + xOffset, this.cy);

    // draw the scan box while animating
    if (s.plotAnim && s.plotFrame > s.plotMoveFrames &&
    s.plotFrame < s.plotMoveFrames + s.plotScanFrames && this.index === 2) {
      const right = (-this.halfW) + (showSteps * this.stepWidth);
      let left = right - (this.in * this.stepWidth);
      if (left < -this.halfW) {
        left = -this.halfW;
      }
      s.noStroke();
      s.colors.lightgrey.setAlpha(200);
      s.fill(s.colors.lightgrey);
      s.colors.lightgrey.setAlpha(255);
      s.rect(left + (right - left) / 2, 0, this.scale * (right-left),
          1.8 * this.scale * this.halfH, 10);
    }

    // draw the plot axes
    s.strokeWeight(2 * this.scale);
    s.colors.darkbluegrey.setAlpha(this.vis);
    s.stroke(s.colors.darkbluegrey);
    s.colors.darkbluegrey.setAlpha(255);
    s.line(-this.halfW * this.scale, 0, this.halfW * this.scale, 0);
    s.line(this.scale * ((-this.halfW) + (this.in * this.stepWidth)),
        -(this.halfH-20) * this.scale,
        this.scale * (-this.halfW + (this.in * this.stepWidth)),
        this.scale * (this.halfH-20)
    );

    if (s.props.ui.data &&
        s.props.ui.data[this.index].chartPrediction) {
      s.colors.darkgrey.setAlpha(this.vis);
      s.stroke(s.colors.darkgrey);
      s.colors.darkgrey.setAlpha(255);
      s.noFill();
      s.beginShape();
      // draw input for validation
      s.strokeWeight(2 * this.scale);
      for (let i = 0; i <= this.in; i++) {
        data = s.props.ui.data[this.index].chartPrediction[i];
        // draw the word "input" to the left
        if (this.index === 2) {
          if (i === 0) {
            s.push();
            s.noStroke();
            s.textAlign(s.RIGHT, s.BOTTOM);
            s.textStyle(s.BOLD);
            s.fill(s.colors.darkgrey);
            s.text(this.s.global.strings.plotInput, -this.halfW - 5,
                -this.halfH / 2 * data);
            s.pop();
          }
        }
        s.vertex(this.scale * (-this.halfW + i * this.stepWidth),
            this.scale * (-this.halfH / 2 * data));
      }
      data = s.props.ui.data[this.index].chartOutput[0];
      s.vertex(
          this.scale * (-this.halfW + ((this.in) * this.stepWidth)),
          this.scale * (-this.halfH / 2 * data));
      s.endShape();

      // draw prediction
      s.strokeWeight(2 * this.scale);
      if (s.plotAnim === true && s.plotFrame > s.plotMoveFrames) {
        s.colors.overview.setAlpha(this.vis);
        s.stroke(s.colors.overview);
        s.colors.overview.setAlpha(255);
        s.beginShape();
        for (let i = Math.round(showSteps) - this.in;
          i <= showSteps && i <= this.in; i++) {
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
        if (showSteps >= this.in && this.index === 2) {
          // draw word "prediction" at last prediction pos
          data = s.props.ui.data[this.index].prediction[Math.round(
              showSteps) - this.in];
          s.push();
          s.noStroke();
          s.textAlign(s.LEFT, s.TOP);
          s.textStyle(s.BOLD);
          s.fill(s.colors.overview);
          s.text(s.global.strings.plotPrediction,
              -this.halfW + showSteps * this.stepWidth + 5,
              -this.halfH / 2 * data);
          s.pop();
        }
        s.endShape();
      }
    }

    // draw the test output for validation
    s.strokeWeight(1 * this.scale);
    if (s.props.ui.data &&
    s.props.ui.data[this.index].chartOutput) {
      s.colors.bluegrey.setAlpha(this.vis);
      s.stroke(s.colors.grey);
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
      // draw word "target" to the right
      if (this.index === 2) {
        s.push();
        s.noStroke();
        s.fill(s.colors.grey);
        s.textAlign(s.LEFT, s.BOTTOM);
        s.text(s.global.strings.plotOutput,
            -this.halfW + (this.total * this.stepWidth),
            -this.halfH / 2 * data + 5);
        s.pop();
      }
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

    // Draw the error bars for training
    if (this.s.netFrame > this.s.netPredFrames + this.s.netLossFrames) {
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
}
