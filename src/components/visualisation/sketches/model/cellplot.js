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
   * Draw the plot
   */
  draw() {
    let data;
    const s = this.s;

    if (!s.props) {
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
    s.stroke(250, 150, 70);
    const left = (-this.halfW) + (s.lstmPred * this.stepWidth);
    s.fill(250, 150, 70, 20);
    s.rect(left + ((this.in - 1) * this.stepWidth) / 2, 0,
        ((this.in - 1) * this.stepWidth), 1.8 * this.halfH);
    s.strokeWeight(3 * this.scale);
    s.stroke(200);
    s.strokeWeight(2);
    s.noFill();
    // s.rect(0, 0, this.plotWidth, this.plotHeight);

    s.stroke(54);
    s.line(-this.halfW, 0, this.halfW, 0);
    s.line((-this.halfW) + (this.in * this.stepWidth), -this.halfH,
        -this.halfW + (this.in * this.stepWidth), this.halfH
    );
    if (s.props.ui.data &&
        s.props.ui.data[this.dataIndex].chartPrediction &&
        s.props.ui.data[this.dataIndex].chartOutput &&
        s.props.ui.data[this.dataIndex].prediction) {
      s.strokeWeight(1);
      s.stroke(150);
      s.noFill();

      s.beginShape();
      for (let i = 0; i < this.total; i++) {
        data = groundTruth[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();

      s.strokeWeight(2);
      s.stroke(250, 180, 50);
      s.noFill();
      s.beginShape();
      for (let i = s.lstmPred; i < s.lstmPred + this.in; i++) {
        data = scanPlot[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();
      s.noStroke();
      s.stroke(250, 180, 50);
      for (let i = s.lstmPred; i <= s.lstmPred + s.lstmStep; i++) {
        data = scanPlot[i];
        s.ellipse(-this.halfW + (i * detailStepWidth),
            (-this.halfH / 2 * data), 4);
      }
      if (s.lstmPred > 0) {
        data = scanPlot[this.in + (s.lstmPred - 1)];
        s.ellipse(-this.halfW + ((this.in + s.lstmPred - 1) * detailStepWidth),
            (-this.halfH / 2 * data), 4);
      }
    }

    const tween = (s.cellAnimStep + s.lstmStep * s.MAX_CELL_STEPS) /
      (s.MAX_CELL_STEPS * this.in);

    data = s.props.ui.data[this.dataIndex].prediction[(s.lstmPred)];
    data = -2 + 2 * tween + (tween) * data;
    let error = Math.abs(data - s.props.ui.data[this.dataIndex].chartOutput[
        (s.lstmPred)
    ]);
    s.noStroke();
    s.fill(100 + error * 100, 200 - error * 80, 50);
    s.ellipse(-this.halfW + ((s.lstmPred + this.in) * detailStepWidth),
        -this.halfH / 2 * data, 8);
    for (let i = (s.lstmPred + this.in + 1); i < this.total; i++) {
      error = Math.abs(-2 - scanPlot[i]);
      s.noStroke();
      s.fill(100 + error * 100, 200 - error * 80, 50);
      s.ellipse(-this.halfW + (i * detailStepWidth),
          -this.halfH / 2 * (-2), 4);
    }

    s.pop();
  }
}
