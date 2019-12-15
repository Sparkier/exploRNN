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
      s.fill(s.palette.secondaryContrast);
    } else {
      s.fill(s.palette.contrast);
    }
    s.rect(this.ctrX, this.ctrY, this.size, this.size);
    s.stroke(s.palette.secondary);
    s.strokeWeight(1);
    s.line(this.ctrX - this.size/2, this.ctrY,
        this.ctrX + this.size/2, this.ctrY);
    if (!s.netAnim || s.netFrame > s.netPredFrames) {
      let ratio = (s.netFrame - s.netPredFrames) / s.netLossFrames;
      if (!s.netAnim) {
        ratio = 1;
      }
      s.noFill();
      s.strokeWeight(2);
      s.stroke(s.palette.error);
      s.beginShape();
      for (let i = 0; i < s.lossValues.length * ratio; i++) {
        s.vertex(this.ctrX - this.size/2 + i / s.lossValues.length * this.size,
            this.ctrY - s.lossValues[i] * this.size / 4);
      }
      s.endShape();
    }
    s.fill(0);
    s.noStroke();
    s.text('Error', this.ctrX, this.ctrY - 0.7 * this.size);
  }
}
