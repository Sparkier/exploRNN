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
    if (s.netAnim && s.netFrame > s.netPredFrames &&
        s.netFrame < s.netPredFrames + s.netLossFrames) {
      s.fill(255);
      s.stroke(50, 150, 255);
    } else {
      s.fill(255);
      s.stroke(0);
    }
    s.rect(this.ctrX, this.ctrY, this.size, this.size);
    s.stroke(0);
    s.line(this.ctrX - this.size/2, this.ctrY,
        this.ctrX + this.size/2, this.ctrY);
    if (!s.netAnim || s.netFrame > s.netPredFrames) {
      let ratio = (s.netFrame - s.netPredFrames) / s.netLossFrames;
      if (!s.netAnim) {
        ratio = 1;
      }
      s.noFill();
      s.stroke(255, 100, 50);
      s.beginShape();
      for (let i = 0; i < s.lossValues.length * ratio; i++) {
        s.vertex(this.ctrX - this.size/2 + i / s.lossValues.length * this.size, this.ctrY - s.lossValues[i] * this.size / 4);
      }
      s.endShape();
    }
    s.fill(0);
    s.noStroke();
    s.text('Error', this.ctrX, this.ctrY - 0.7 * this.size);

  }
}

