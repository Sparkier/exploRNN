/**
 * Used for drawing the function plot in the overview.
 */
export class FunctionPlot {
  /**
   * Draws the plot with all calculated values
   *
   * @param {object} s the p5 js sketch
   */
  drawFunctionPlot(s) {
    let data;
    let truth;
    let from;
    let to;
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

    const detailStepWidth = this.stepWidth;
    const groundTruth = s.props.network.data.chartPrediction.concat(
        s.props.network.data.chartOutput
    );
    const scanPlot = s.props.network.data.chartPrediction.concat(
        s.props.network.data.prediction
    );
    // draw plot structure
    s.push();
    s.translate(s.cellPlotProps.midX, s.cellPlotProps.midY);
    s.ellipseMode(s.CENTER);
    // draw the scan box while animating
    if (s.cellAnim.forward) {
      s.noStroke();
      const left = (-this.halfW) + (s.cellAnim.predictionStep *
          this.stepWidth);
      const right = left + ((this.in - 1) * this.stepWidth);
      s.colors.lightgrey.setAlpha(120);
      s.fill(s.colors.lightgrey);
      s.colors.lightgrey.setAlpha(255);
      s.rect(left + ((this.in - 1) * this.stepWidth) / 2, 0,
          ((this.in - 1) * this.stepWidth), 1.2 * this.halfH);
      const tween =
        (s.cellAnim.step + s.cellAnim.inputStep * s.cellAnim.maxSteps) /
        (s.cellAnim.maxSteps * this.in);
      s.stroke(s.colors.darkgrey);
      s.noFill();
      let buffX = left + (this.in * this.stepWidth * tween);
      if (buffX > right) {
        buffX = right;
      }
      s.strokeWeight(1);
      s.line(buffX, -0.6 * this.halfH, buffX, 0.6 * this.halfH);
    }
    // draw graph lines
    s.noFill();
    s.strokeWeight(2);
    s.stroke(s.colors.darkgrey);
    s.line(-this.halfW, 0, this.halfW, 0);
    s.line((-this.halfW) + (this.in * this.stepWidth), -this.halfH,
        -this.halfW + (this.in * this.stepWidth), this.halfH
    );

    if (s.props.network.data &&
        s.props.network.data.chartPrediction &&
        s.props.network.data.chartOutput &&
        s.props.network.data.prediction) {
    // draw input function part
      s.beginShape();
      for (let i = 0; i <= this.in; i++) {
        data = groundTruth[i];
        // draw the word "input" to the left
        if (i === 0) {
          s.noStroke();
          s.textAlign(s.RIGHT, s.BOTTOM);
          s.textStyle(s.BOLD);
          s.fill(s.colors.darkgrey);
          s.text(s.global.strings.plotInput,
              -this.halfW - 5,
              -this.halfH / 2 * data);
          s.noFill();
          s.strokeWeight(2);
          s.stroke(s.colors.darkgrey);
          s.textStyle(s.NORMAL);
        }
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();
      // draw ground truth function part
      s.beginShape();
      s.stroke(s.colors.grey);
      s.strokeWeight(1);
      for (let i = this.in; i < this.total; i++) {
        data = groundTruth[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();
      // draw word "target" to the right
      s.noStroke();
      s.fill(s.colors.grey);
      s.textAlign(s.LEFT, s.BOTTOM);
      s.text(s.global.strings.plotOutput,
          -this.halfW + (this.total * detailStepWidth),
          -this.halfH / 2 * data + 5);
      // draw dots for all inputs
      s.noStroke();
      s.fill(s.colors.darkgrey);
      for (let i = 0; i < this.in; i++) {
        data = groundTruth[i];
        s.ellipse(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data, 4);
      }

      // draw current prediction with error bars
      s.strokeWeight(1);
      s.noFill();
      s.stroke(s.colors.detaillight);
      const endIndex = s.cellAnim.forward ?
        (this.in + s.cellAnim.predictionStep - 1) : this.total;
      for (let i = this.in; i <= endIndex; i++) {
        data = scanPlot[i];
        truth = groundTruth[i];
        s.line(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data, -this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * truth);
      }
      s.noStroke();
      s.fill(s.colors.grey);
      for (let i = this.in; i <= endIndex; i++) {
        data = groundTruth[i];
        s.ellipse(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data, 4);
      }
      if (!s.cellAnim.forward) {
        let errorRatio = s.cellAnim.errorStep / s.cellAnim.maxErrorSteps;
        if (s.cellAnim.back) {
          errorRatio = 1 - s.cellAnim.backStep / s.cellAnim.maxBackSteps;
        }
        s.stroke(s.colors.darkgrey);
        s.strokeWeight(1);
        for (let i = this.in; i <= this.total; i++) {
          data = scanPlot[i];
          truth = groundTruth[i];
          from = -this.halfH / 2 * data;
          to = -this.halfH / 2 * truth;
          if (s.cellAnim.back) {
            const buff = from;
            from = to;
            to = buff;
          }
          s.line(-this.halfW + (i * detailStepWidth), from,
              -this.halfW + (i * detailStepWidth),
              from + (to - from) * errorRatio);
        }
        s.noStroke();
        s.fill(s.colors.grey);
        for (let i = this.in; i <= endIndex; i++) {
          data = groundTruth[i];
          s.ellipse(-this.halfW + (i * detailStepWidth),
              -this.halfH / 2 * data, 4);
        }
      }
      s.stroke(s.colors.detail);
      s.strokeWeight(2);
      s.noFill();
      s.beginShape();
      for (let i = this.in; i <= endIndex; i++) {
        data = scanPlot[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();
      if (endIndex >= this.in) {
      // draw word "prediction" at last prediction pos
        s.noStroke();
        s.textAlign(s.LEFT, s.TOP);
        s.textStyle(s.BOLD);
        s.fill(s.colors.detail);
        s.text(s.global.strings.plotPrediction,
            -this.halfW + endIndex * detailStepWidth + 5,
            -this.halfH / 2 * data);
      }
      // draw scanned points
      if (s.cellAnim.forward) {
        s.noStroke();
        s.fill(s.colors.detaildark);
        const leftIndex = s.cellAnim.predictionStep;
        const rightIndex = s.cellAnim.predictionStep + s.cellAnim.inputStep;
        for (let i = leftIndex; i <= rightIndex; i++) {
          data = scanPlot[i];
          if (i < this.in) {
            s.fill(s.colors.darkgrey);
          } else {
            s.fill(s.colors.detaildark);
          }
          s.ellipse(-this.halfW + (i * detailStepWidth),
              (-this.halfH / 2 * data), 6);
        }
        if (s.cellAnim.predictionStep > 0) {
          data = scanPlot[this.in + (s.cellAnim.predictionStep - 1)];
          if (s.cellAnim.inputStep === this.in - 1) {
            s.fill(s.colors.detaildark);
            s.ellipse(-this.halfW + (endIndex * detailStepWidth),
                (-this.halfH / 2 * data), 12);
          } else {
            s.fill(s.colors.detail);
            s.ellipse(-this.halfW + (endIndex * detailStepWidth),
                (-this.halfH / 2 * data), 10);
          }
        }
      }
    }

    s.pop();
  }
}
