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
    s.noStroke();
    const left = (-this.halfW) + (s.lstmPred * this.stepWidth);
    s.colors.lightgrey.setAlpha(120);
    s.fill(s.colors.lightgrey);
    s.colors.lightgrey.setAlpha(255);
    s.rect(left + ((this.in - 1) * this.stepWidth) / 2, 0,
        ((this.in - 1) * this.stepWidth), 1.8 * this.halfH);
    const tween = (s.cellAnimStep + s.lstmStep * s.MAX_CELL_STEPS) /
      (s.MAX_CELL_STEPS * this.in);

    s.rect(left + (((this.in) * this.stepWidth) * tween / 2), 0,
        ((this.in) * this.stepWidth) * tween, 1.8 * this.halfH);
    s.strokeWeight(2);
    s.noFill();
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
      s.stroke(s.colors.grey);
      s.noFill();
      s.beginShape();
      for (let i = 0; i < this.total; i++) {
        data = groundTruth[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();

      // draw current prediction
      s.strokeWeight(2);
      s.noFill();
      s.stroke(s.colors.grey);
      for (let i = this.in; i <= (this.in + s.lstmPred - 1); i++) {
        data = scanPlot[i];
        truth = groundTruth[i];
        s.line(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data, -this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * truth);
        s.ellipse(-this.halfW + (i * detailStepWidth),
            (-this.halfH / 2 * truth), 4);
      }
      s.stroke(s.colors.orange);
      s.beginShape();
      for (let i = this.in; i <= (this.in + s.lstmPred - 1); i++) {
        data = scanPlot[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();

      // draw scanned points
      s.noStroke();
      s.fill(s.colors.orangedark);
      for (let i = s.lstmPred; i <= s.lstmPred + s.lstmStep; i++) {
        data = scanPlot[i];
        s.ellipse(-this.halfW + (i * detailStepWidth),
            (-this.halfH / 2 * data), 6);
      }
      if (s.lstmPred > 0) {
        data = scanPlot[this.in + (s.lstmPred - 1)];
        if (s.lstmStep === this.in - 1) {
          s.ellipse(-this.halfW + ((this.in + s.lstmPred - 1) *
              detailStepWidth), (-this.halfH / 2 * data), 12);
        } else {
          s.ellipse(-this.halfW + ((this.in + s.lstmPred - 1) *
              detailStepWidth), (-this.halfH / 2 * data), 10);
        }
      }
    }
    s.pop();
  }
}
