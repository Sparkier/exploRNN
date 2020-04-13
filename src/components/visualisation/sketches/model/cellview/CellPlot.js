import {Heading} from '../Heading';

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
    this.heading = new Heading(this.s, this.s.cellPlotProps.left + 20,
        this.s.height * this.s.typography.titleOffsetRatio / 2, 'cellPlot');
  }

  /**
   * Draw a plot for the output if the data comes from a function
   */
  drawFunctionPlot() {
    const s = this.s;
    let data;
    let truth;
    let from;
    let to;
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
    const groundTruth = s.props.ui.data[
        this.dataIndex].chartPrediction.concat(
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

    // legend
    s.noStroke();
    s.textAlign(s.LEFT, s.CENTER);
    s.fill(s.colors.darkgrey);
    s.text(s.global.strings.plotInput,
        -this.halfW,
        -this.halfH + this.halfH * 0.1);
    s.fill(s.colors.detail);
    s.text(s.global.strings.plotPrediction,
        -this.halfW + this.in * this.stepWidth * 1.1,
        -this.halfH + this.halfH * 0.1);
    s.fill(s.colors.grey);
    s.text(s.global.strings.plotOutput,
        -this.halfW + this.in * this.stepWidth * 1.1,
        -this.halfH + this.halfH * 0.3);
    s.pop();
  }

  /**
   * Draw the result plot when we process text data.
   */
  drawTextPlot() {
    const s = this.s;
    let data;
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
    const scanPlot = s.props.ui.data[this.dataIndex].chartPrediction.concat(
        s.props.ui.data[this.dataIndex].prediction
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

    if (s.props.ui.data &&
        s.props.ui.data[this.dataIndex].chartPrediction &&
        s.props.ui.data[this.dataIndex].chartOutput &&
        s.props.ui.data[this.dataIndex].prediction) {
      // draw input part of the data
      s.textSize(s.typography.fontsize);
      s.fill(s.colors.lightbluegrey);
      for (let i = 0; i <= this.in; i++) {
        data = s.props.ui.data[this.dataIndex].chartPrediction[i];
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

      // draw the test output part of the data
      for (let i = 0; i < this.out; i++) {
        data = s.props.ui.data[this.dataIndex].chartOutput[i];
        if (data) {
          if (Object.prototype.hasOwnProperty.call(
              s.props.textData, 'textString')) {
            data = s.props.textData.getFromOneHot(data);
            s.text(data, (i + this.in) * this.stepWidth,
                -s.typography.fontsize);
          }
        }
      }
      const leftIndex = s.cellAnim.predictionStep;
      const rightIndex = s.cellAnim.predictionStep + s.cellAnim.inputStep;
      if (s.cellAnim.forward) {
        // draw the scanned points for that compute step in bold
        s.noStroke();
        s.fill(s.colors.darkbluegrey);
        s.textStyle(s.BOLD);
        for (let i = leftIndex; i <= rightIndex; i++) {
          data = s.props.ui.data[this.dataIndex].chartPrediction[i];
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
      if (s.props.ui.data &&
      s.props.ui.data[this.dataIndex].chartOutput) {
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
      }
      s.textStyle(s.NORMAL);
    }
    s.pop();
  }

  /**
   * Draw a plot with its specified data
   */
  draw() {
    const s = this.s;
    if (this.s.props.training.inputType === 'Text Data') {
      this.drawTextPlot();
    } else {
      this.drawFunctionPlot();
    }
    this.heading.draw(s.global.strings.cellPlotTitle);
  }

  /**
   * A function that gets called if the user moves the mouse over the canvas
   * and sends the trigger to all interactable items on the screen
   *
   * @param {number} x the x position of the mouse cursor
   * @param {number} y the y position of the mouse cursor
   */
  mouseMoved(x, y) {
    this.heading.mouseMoved(x, y);
  }

  /**
   * This function gets called if the user has clicked on the screen, it
   * then checks if the user has clicked on an interactable item and if so
   * activates the according following functions
   *
   * @return {boolean} true, if the user has clicked on an item
   */
  checkClick() {
    return this.heading.checkClick();
  }
}
