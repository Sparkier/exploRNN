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
    s.rect(0, 0, this.plotWidth, this.plotHeight);

    s.stroke(54);
    s.line(-this.halfW, 0, this.halfW, 0);
    s.line((-this.halfW) + (this.in * this.stepWidth), -this.halfH,
        -this.halfW + (this.in * this.stepWidth), this.halfH
    );
    s.strokeWeight(3);
    if (s.props.ui.data &&
        s.props.ui.data[this.dataIndex].chartPrediction &&
        s.props.ui.data[this.dataIndex].chartOutput &&
        s.props.ui.data[this.dataIndex].prediction) {
      s.strokeWeight(2);
      s.stroke(150);
      s.noFill();

      s.beginShape();
      for (let i = 0; i < this.in; i++) {
        data = s.props.ui.data[this.dataIndex].chartPrediction[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      if (s.lstmPred > 0) {
        data = s.props.ui.data[this.dataIndex].chartOutput[0];
        s.vertex(-this.halfW + (this.in * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();

      s.strokeWeight(3);
      s.stroke(50, 70, 250);
      s.noFill();
      s.beginShape();
      for (let i = 0; i <= s.lstmPred + s.lstmStep && i <= this.in; i++) {
        data = s.props.ui.data[this.dataIndex].chartPrediction[i];
        s.vertex(-this.halfW + (i * detailStepWidth),
            -this.halfH / 2 * data);
      }
      s.endShape();
      s.noStroke();
      s.fill(50, 70, 250);
      for (let i = s.lstmPred; i <= s.lstmPred + s.lstmStep &&
            i <= this.in; i++) {
        data = s.props.ui.data[this.dataIndex].chartPrediction[i];
        s.ellipse(-this.halfW + (i * detailStepWidth),
            (-this.halfH / 2 * data), 5);
      }
      if (s.lstmStep + s.lstmPred < this.in) {
        const step = s.lstmStep + s.lstmPred;
        data = s.props.ui.data[this.dataIndex].chartPrediction[step];
        s.ellipse(-this.halfW + (step * detailStepWidth),
            -this.halfH / 2 * data, 7);
      }
    }


    const ratio = 1; // remove?
    s.stroke(50, 250, 70);
    s.noFill();
    s.beginShape();
    for (let i = 0; i < s.lstmPred; i++) {
      data = s.props.ui.data[this.dataIndex].chartOutput[i];
      s.vertex((-this.halfW + ((i + this.in) * detailStepWidth)),
          -this.halfH / 2 * data * ratio);
    }
    s.endShape();

    s.noStroke();
    s.fill(50, 250, 70);
    if (s.lstmPred > 0) {
      data = s.props.ui.data[this.dataIndex].chartOutput[(s.lstmPred - 1)];
      s.ellipse(-this.halfW + ((s.lstmPred - 1 + this.in) * detailStepWidth),
          -this.halfH / 2 * data, 9);
    }

    s.stroke(250, 50, 70);
    s.noFill();
    s.beginShape();
    for (let i = 0; i < s.lstmPred; i++) {
      data = s.props.ui.data[this.dataIndex].prediction[i];
      s.vertex((-this.halfW + ((i + this.in) * detailStepWidth)),
          -this.halfH / 2 * data * ratio);
    }
    s.endShape();

    s.noStroke();
    s.fill(250, 50, 70);
    for (let i = 0; i < s.lstmPred; i++) {
      data = s.props.ui.data[this.dataIndex].prediction[i];
      s.ellipse((-this.halfW + ((i + this.in) * detailStepWidth)),
          -this.halfH / 2 * data * ratio, 5);
    }
    if (s.lstmStep + s.lstmPred >= this.in) {
      const step = s.lstmStep + s.lstmPred - this.in;
      data = s.props.ui.data[this.dataIndex].prediction[step];
      s.ellipse(-this.halfW + ((step + this.in) * detailStepWidth),
          -this.halfH / 2 * data, 7);
    }
    if (s.lstmPred > 0) {
      data = s.props.ui.data[this.dataIndex].prediction[(s.lstmPred - 1)];
      s.ellipse(-this.halfW + ((s.lstmPred - 1 + this.in) * detailStepWidth),
          -this.halfH / 2 * data, 9);
    }
    s.pop();
  }
}
