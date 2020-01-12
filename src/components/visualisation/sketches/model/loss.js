/**
 *
 */
export class Loss {
  /**
  * efeefefe
  *
  * @param {object} s the p5.js sketch
  */
  constructor(s) {
    this.s = s;
    this.width = s.width * s.sideRatioLoss;
    this.left = s.ctrRight;
    this.right = s.ctrRight + this.width;
    this.ctrX = this.left + this.width / 2;
    this.ctrY = s.height / 2;
    this.size = this.width / 2;
  }

  /**
   * draw input options
   */
  draw() {
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
        s.vertex(this.ctrX - this.size/2 + i / s.lossValues.length * this.size,
            this.ctrY - s.lossValues[i] * this.size / 4);
      }
      s.endShape();
    }
    s.textAlign(s.CENTER, s.BOTTOM);
    s.textSize(16);
    s.fill(0);
    s.noStroke();
    s.text('Loss', this.ctrX, this.ctrY - 0.55 * this.size);
  }
}
