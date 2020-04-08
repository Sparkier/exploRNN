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
    this.vis = 255 - Math.abs(2-index) * 130;
    this.cx = s.outProps.midX;
    this.cy = s.outProps.midY;
    this.scale = 1 - 0.5 * (Math.abs(s.height/2 - this.cy) / (s.height/2));
    this.plotWidth = s.outProps.width * s.outProps.horRatio;
    this.plotHeight = s.outProps.height * s.outProps.verRatio;
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
   * Plots an animation for incoming data.
   *
   * @param {String} type the type of data that we need to plot for
   */
  plotIncomingData(type) {
    const s = this.s;
    let height = this.halfH;
    if (type === 'text') {
      height = 2 * s.typography.fontsize;
    }
    const originX = s.outProps.left;
    const originY = s.outProps.midY;
    s.push();

    // Draw background color
    s.colors.lightgrey.setAlpha(100);
    s.fill(s.colors.lightgrey);
    s.colors.lightgrey.setAlpha(255);
    for (let i = -1; i < 2; i=i+2) {
      s.beginShape();
      s.vertex(originX, originY);
      s.bezierVertex(originX+80, originY, originX+20, originY+i*height,
          originX+100, originY+i*height);
      s.vertex(originX+100, originY);
      s.endShape(s.CLOSE);
    }
    s.rectMode(s.CORNER);
    s.rect(originX+100, originY-height, s.outProps.right-s.outProps.left-100,
        2*height);

    // Draw animated curves
    s.noFill();
    if (s.netAnim) {
      s.stroke(s.colors.overview);
      s.drawingContext.lineDashOffset = this.s.rev ?
        s.frameCount/2 : -s.frameCount/2;
      s.drawingContext.setLineDash([10, 10]);
    } else {
      s.stroke(s.colors.bluegrey);
    }
    for (let i = -1; i < 2; i=i+2) {
      s.bezier(originX, originY, originX+80, originY, originX+20,
          originY+i*height, originX+100, originY+i*height);
    }
    s.pop();
  }

  /**
   * Draws the text output of the network
   */
  plotText() {
    let data = '';
    const s = this.s;
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
  }

  /**
   * Draws the plot with all calculated values
   */
  plotFunction() {
    let data;
    const s = this.s;
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

      // draw input for validation
      s.strokeWeight(1 * this.scale);
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
      if (this.index === 2) {
        this.plotIncomingData('text');
        this.plotHeading();
      }
      this.plotText();
    } else {
      if (this.index === 2) {
        this.plotIncomingData('function');
        this.plotHeading();
      }
      this.plotFunction();
    }
  }
}
