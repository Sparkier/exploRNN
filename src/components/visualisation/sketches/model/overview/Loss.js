/**
 * This class represents the visual component for the error graph/loss graph
 * of the network
 */
export class Loss {
  /**
  * The constructor of this class
  *
  * @param {object} s the parent p5.js sketch
  */
  constructor(s) {
    this.s = s;
    this.width = s.lossProps.width;
    this.left = s.lossProps.left;
    this.right = s.lossProps.right;
    this.ctrX = this.left + this.width / 2;
    this.ctrY = s.height / 2;
    this.size = this.width / 2;
  }

  /**
   * Draw this graph
   */
  draw() {
    if (this.s.props.training.inputType !== 'Text Data') {
      const s = this.s;
      s.noStroke();
      if (s.netAnim && s.netFrame > s.netPredFrames &&
        s.netFrame < s.netPredFrames + s.netLossFrames) {
        s.fill(s.colors.bluegrey);
      } else {
        s.fill(s.colors.lightgrey);
      }
      s.rect(this.ctrX, this.ctrY, this.size, this.size);
      if (!s.netAnim || s.netFrame > s.netPredFrames) {
        let ratio = (s.netFrame - s.netPredFrames) / s.netLossFrames;
        let ratioTwo = (s.netFrame - s.netPredFrames - s.netLossFrames) /
          s.netTrainFrames;
        if (!s.netAnim) {
          ratio = 1;
          ratioTwo = 1;
        }
        s.noFill();
        s.strokeWeight(2);
        if (s.netAnim && s.netFrame > s.netPredFrames &&
        s.netFrame < s.netPredFrames + s.netLossFrames) {
          s.stroke(s.colors.lightgrey);
          s.fill(s.colors.lightgrey);
        } else {
          s.stroke(s.colors.bluegrey);
          s.fill(s.colors.bluegrey);
        }
        s.beginShape();
        let i = s.round(s.lossValues.length * ratioTwo);
        for (; i < s.lossValues.length * ratio; i++) {
          s.vertex(this.ctrX - this.size/2 + i / s.lossValues.length *
            this.size, this.ctrY - s.lossValues[i] * this.size / 4);
        }
        s.endShape();
      }
      const offset = s.height * s.typography.titleOffsetRatio;
      const titleH = s.typography.fontsize * 2;
      s.textAlign(s.CENTER, s.CENTER);
      s.rectMode(s.CENTER);
      s.fill(s.palette.tooltipBG);
      s.noStroke();
      s.rect(this.ctrX, offset / 2, 0.15 * s.height, titleH, 5);
      s.textSize(s.typography.fontsize);
      s.fill(s.palette.tooltipFG);
      s.noStroke();
      s.text(s.global.strings.lossTitle, this.ctrX, offset / 2);
    }
  }
}
