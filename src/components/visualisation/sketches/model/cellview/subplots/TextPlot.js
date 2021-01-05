/**
 * Used for drawing the text plot in the overview.
 */
export class TextPlot {
  /**
   * Draws the plot with all calculated values
   *
   * @param {object} s the p5 js sketch
   */
  drawTextPlot(s) {
    let data;
    if (!s.props || !s.props.network.data) {
      return;
    }
    // prepare plot parameters
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
    const scanPlot = s.props.network.data.chartPrediction.concat(
        s.props.network.data.prediction
    );
    s.push();
    s.translate(s.cellPlotProps.midX - this.halfW, s.cellPlotProps.midY);

    // draw the scan box while animating
    if (s.cellAnim.forward) {
      s.noStroke();
      s.rectMode(s.CORNER);
      const left = -10 + s.cellAnim.predictionStep * this.stepWidth;
      const right = this.in * this.stepWidth;
      s.colors.lightgrey.setAlpha(120);
      s.fill(s.colors.lightgrey);
      s.colors.lightgrey.setAlpha(255);
      s.rect(left, -2 * s.typography.fontsize, right,
          4 * s.typography.fontsize, 10);
    }

    if (s.props.network.data &&
        s.props.network.data.chartPrediction &&
        s.props.network.data.chartOutput &&
        s.props.network.data.prediction) {
    // draw input part of the data
      s.textSize(s.typography.fontsize);
      s.fill(s.colors.black);
      for (let i = 0; i <= this.in; i++) {
        data = s.props.network.data.chartPrediction[i];
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

      // draw the test output part of the data
      s.fill(s.colors.grey);
      for (let i = 0; i < this.out; i++) {
        data = s.props.network.data.chartOutput[i];
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
      s.fill(s.colors.grey);
      s.textAlign(s.RIGHT, s.BOTTOM);
      s.text(s.global.strings.plotOutput,
          (this.out - 1 + this.in) * this.stepWidth + 10,
          -2 * s.typography.fontsize - 5);
      s.pop();
      // draw dots for all inputs
      const leftIndex = s.cellAnim.predictionStep;
      const rightIndex = s.cellAnim.predictionStep + s.cellAnim.inputStep;
      if (s.cellAnim.forward) {
      // draw the scanned points for that compute step in bold
        s.noStroke();
        s.fill(s.colors.darkbluegrey);
        s.textStyle(s.BOLD);
        for (let i = leftIndex; i <= rightIndex; i++) {
          data = s.props.network.data.chartPrediction[i];
          if (data) {
            if (Object.prototype.hasOwnProperty.call(
                s.props.textData, 'textString')) {
              data = s.props.textData.getFromOneHot(data);
              s.textSize(s.typography.fontsize);
              s.noStroke();
              s.text(data, i * this.stepWidth, 0);
            }
          }
        }
        s.textStyle(s.NORMAL);

        // Draw the vertical scan line
        const left = -10;
        s.stroke(s.colors.darkgrey);
        s.noFill();
        const buffX = left + ((rightIndex + 1) * this.stepWidth);
        s.strokeWeight(1);
        s.line(buffX, -1.5 * s.typography.fontsize, buffX,
            1.5 * s.typography.fontsize);
      }

      // Calculate the end index for the prediction
      const endIndex = s.cellAnim.forward ?
        this.in + s.cellAnim.predictionStep : this.total;
      s.noStroke();
      s.fill(s.colors.detail);
      // draw the predictions that thave already been made
      if (s.props.network.data &&
      s.props.network.data.chartOutput) {
        for (let i = this.in; i < endIndex; i++) {
          if (rightIndex >= i) {
            s.textStyle(s.BOLD);
          } else {
            s.textStyle(s.NORMAL);
          }
          data = scanPlot[i];
          if (data) {
            if (Object.prototype.hasOwnProperty.call(
                s.props.textData, 'textString')) {
              data = s.props.textData.getFromOneHot(data);
              s.text(data, i * this.stepWidth, s.typography.fontsize);
            }
          }
        }
        s.push();
        if (endIndex > this.in) {
        // draw word "prediction" at last prediction pos
          s.noStroke();
          s.textAlign(s.RIGHT, s.TOP);
          s.fill(s.colors.detail);
          s.text(s.global.strings.plotPrediction,
              (endIndex - 1) * this.stepWidth + 10,
              2 * s.typography.fontsize + 5);
        }
        s.pop();
      }
      s.textStyle(s.NORMAL);
    }
    s.pop();
  }
}
