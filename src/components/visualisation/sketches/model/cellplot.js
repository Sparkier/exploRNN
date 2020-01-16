/**
 * This class represents the Plot of the Detail View
 */
export class CellPlot {
  /**
     * The constructor function of the class CellPlot
     *
     * @param {object} s the p5 js sketch
     */
  constructor(s) {
    this.s = s;
    this.dataIndex = 2;
    this.plotWidth = s.cellPlotProps.width * s.cellPlotProps.horRatio;
    this.plotHeight = s.cellPlotProps.height * s.cellPlotProps.verRatio;
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
   * Draw a plot with its specified data
   */
  draw() {
    let data;
    let truth;
    let from;
    let to;
    const s = this.s;
    if (!s.props || !s.props.ui.data) {
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
    const groundTruth = s.props.ui.data[this.dataIndex].chartPrediction.concat(
        s.props.ui.data[this.dataIndex].chartOutput
    );
    const scanPlot = s.props.ui.data[this.dataIndex].chartPrediction.concat(
        s.props.ui.data[this.dataIndex].prediction
    );
    // draw plot structure
    s.push();
    s.translate(s.cellPlotProps.midX, s.cellPlotProps.midY);
    s.ellipseMode(s.CENTER);
    // draw the scan box while animating
    if (s.cellAnim.forward) {
      s.noStroke();
      const left = (-this.halfW) + (s.cellAnim.predictionStep * this.stepWidth);
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

    if (s.props.ui.data &&
        s.props.ui.data[this.dataIndex].chartPrediction &&
        s.props.ui.data[this.dataIndex].chartOutput &&
        s.props.ui.data[this.dataIndex].prediction) {
      // draw input and ground truth output
      s.strokeWeight(1);
      s.stroke(s.colors.darkgrey);
      s.noFill();
      s.beginShape();
      for (let i = 0; i <= this.in; i++) {
        data = groundTruth[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();
      s.stroke(s.colors.grey);
      s.beginShape();
      for (let i = this.in; i < this.total; i++) {
        data = groundTruth[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();
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
      s.stroke(s.colors.orangelight);
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
      s.stroke(s.colors.orange);
      s.strokeWeight(3);
      s.noFill();
      s.beginShape();
      for (let i = this.in; i <= endIndex; i++) {
        data = scanPlot[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();

      // draw scanned points
      if (s.cellAnim.forward) {
        s.noStroke();
        s.fill(s.colors.orangedark);
        const leftIndex = s.cellAnim.predictionStep;
        const rightIndex = s.cellAnim.predictionStep + s.cellAnim.inputStep;
        for (let i = leftIndex; i <= rightIndex; i++) {
          data = scanPlot[i];
          if (i < this.in) {
            s.fill(s.colors.darkgrey);
          } else {
            s.fill(s.colors.orangedark);
          }
          s.ellipse(-this.halfW + (i * detailStepWidth),
              (-this.halfH / 2 * data), 6);
        }
        if (s.cellAnim.predictionStep > 0) {
          data = scanPlot[this.in + (s.cellAnim.predictionStep - 1)];
          if (s.cellAnim.inputStep === this.in - 1) {
            s.fill(s.colors.orangedark);
            s.ellipse(-this.halfW + (endIndex * detailStepWidth),
                (-this.halfH / 2 * data), 12);
          } else {
            s.fill(s.colors.orange);
            s.ellipse(-this.halfW + (endIndex * detailStepWidth),
                (-this.halfH / 2 * data), 10);
          }
        }
      }
    }

    // legend
    s.noStroke();
    s.rectMode(s.CORNER);
    s.textAlign(s.CENTER, s.CENTER);
    s.fill(s.colors.darkgrey);
    s.rect(-this.halfW, -this.halfH, this.in * this.stepWidth * 0.6,
        this.halfH * 0.2, 5);
    s.fill(s.colors.orange);
    s.rect(-this.halfW + this.in * this.stepWidth, -this.halfH,
        this.in * this.stepWidth * 0.6, this.halfH * 0.2, 5);
    s.fill(s.colors.grey);
    s.rect(-this.halfW + this.in * this.stepWidth,
        -this.halfH + this.halfH * 0.2, this.in * this.stepWidth * 0.6,
        this.halfH * 0.2, 5);
    s.fill(s.colors.white);
    s.text(s.global.strings.plotInput,
        -this.halfW + this.in * this.stepWidth * 0.3,
        -this.halfH + this.halfH * 0.1);
    s.text(s.global.strings.plotPrediction,
        -this.halfW + this.in * this.stepWidth * 1.3,
        -this.halfH + this.halfH * 0.1);
    s.text(s.global.strings.plotOutput,
        -this.halfW + this.in * this.stepWidth * 1.3,
        -this.halfH + this.halfH * 0.3);
    s.pop();
  }
}
