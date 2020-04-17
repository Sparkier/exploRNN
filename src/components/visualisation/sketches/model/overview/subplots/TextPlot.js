/* eslint-disable no-invalid-this */
/**
 * Draws the text output of the network
 *
 * @param {object} s the p5 js sketch
 */
export function drawTextPlot(s) {
  let data = '';
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
    let yOffset = 0;
    if (this.index === 2) {
      this.scale = offset;
      this.vis = offset * 255;
      yOffset = -s.typography.fontsize * 3 * (1-offset);
    } else if (this.index === 3) {
      this.scale = 1 - offset;
      this.vis = 255 - offset * 255;
      yOffset = s.typography.fontsize * 3 * offset;
    }

    // actually draw stuff
    s.push();
    s.translate(this.cx - this.halfW, this.cy + yOffset);

    // draw the scan box while animating
    if (s.plotAnim && s.plotFrame > s.plotMoveFrames &&
      s.plotFrame < s.plotMoveFrames + s.plotScanFrames && this.index === 2) {
      const right = showSteps * this.stepWidth;
      let left = right - (this.in * this.stepWidth);
      if (left < 0) {
        left = 0;
      }
      s.noStroke();
      s.colors.lightgrey.setAlpha(200);
      s.fill(s.colors.lightgrey);
      s.colors.lightgrey.setAlpha(255);
      s.rect(left + (right - left) / 2, 0, this.scale * (right-left),
          4*s.typography.fontsize, 10);
    }
    s.strokeWeight(1 * this.scale);

    // draw input for validation
    if (s.props.ui.data && s.props.ui.data[this.index].chartPrediction) {
      s.textSize(s.typography.fontsize);
      s.colors.black.setAlpha(this.vis);
      s.fill(s.colors.black);
      s.colors.black.setAlpha(255);
      for (let i = 0; i <= this.in; i++) {
        data = s.props.ui.data[this.index].chartPrediction[i];
        if (data) {
        // draw the word "input" to the left
          if (i === 0) {
            s.push();
            s.noStroke();
            s.textAlign(s.LEFT, s.BOTTOM);
            s.text(s.global.strings.plotInput, 0,
                -2 * s.typography.fontsize - 5);
            s.pop();
          }
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
      s.colors.grey.setAlpha(this.vis);
      s.fill(s.colors.grey);
      s.colors.grey.setAlpha(255);
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
      // draw word "target" to the right
      s.push();
      s.noStroke();
      s.textAlign(s.RIGHT, s.BOTTOM);
      s.text(s.global.strings.plotOutput,
          (this.out - 1 + this.in) * this.stepWidth + 10,
          -2 * s.typography.fontsize - 5);
      s.pop();
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
      s.push();
      if (showSteps - this.in > 0) {
        // draw word "prediction" at last prediction pos
        s.noStroke();
        s.textAlign(s.RIGHT, s.TOP);
        s.text(s.global.strings.plotPrediction,
            (showSteps - 1) * this.stepWidth + 10,
            2 * s.typography.fontsize + 5);
      }
      s.pop();
    }
    s.pop();
  }
}
