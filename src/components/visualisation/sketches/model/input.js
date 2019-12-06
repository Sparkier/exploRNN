/**
 *
 */
export class Input {
  /**
  * efeefefe
  *
  * @param {object} s the p5.js sketch
  */
  constructor(s) {
    this.s = s;
    this.dist = 0.15 * s.height;
    this.buttons = [];
    this.steps = 30;
    this.noises = [];
    for (let i = 0; i < this.steps; i++) {
      this.noises.push(-0.2 + 0.4 * Math.random());
    }
    this.buttons.push(new Button(s, 'sin', 1, this.dist, this.steps, this.noises));
    this.buttons.push(new Button(s, 'saw', 2, this.dist, this.steps, this.noises));
    this.buttons.push(new Button(s, 'sqr', 3, this.dist, this.steps, this.noises));
    this.buttons.push(new Button(s, 'sinc', 4, this.dist, this.steps, this.noises));
  }

  /**
   * draw input options
   */
  draw() {
    const s = this.s;
    for (const b of this.buttons) {
      b.draw();
    }
    const dist = this.dist;
    s.textAlign(s.CENTER);
    s.fill(0);
    s.noStroke();
    s.text('Input', s.sideWidthLeft / 2, s.height / 2 - 2 * dist);
  }

  /**
   *
   */
  checkClick() {
    for (const b of this.buttons) {
      b.checkClick();
    }
  }

  /**
   *
   * @param {*} mx
   * @param {*} my
   */
  mouseMoved(mx, my) {
    for (const b of this.buttons) {
      b.mouseMoved(mx, my);
    }
  }
}
/**
 *
 */
class Button {
  /**
   *
   * @param {object} s
   * @param {String} type
   * @param {number} pos
   * @param {number} dist
   * @param {number} steps
   * @param {number[]} noises
   */
  constructor(s, type, pos, dist, steps, noises) {
    this.s = s;
    this.type = type;
    this.pos = pos;
    this.x = s.sideWidthLeft / 2;
    this.y = s.height / 2 - 1.5 * dist + (pos - 1) * dist;
    this.size = dist * 0.8;
    this.left = this.x - this.size / 2;
    this.right = this.x + this.size/2;
    this.top = this.y - this.size / 2;
    this.bot = this.y + this.size/2;
    this.active = (type === s.props.training.dataType);
    this.steps = steps;
    this.noises = noises;
  }

  /**
   *
   */
  draw() {
    const s = this.s;
    s.fill(255);
    s.stroke(0);
    s.strokeWeight(2);
    this.active = (this.type === s.props.training.dataType);
    if (this.active) {
      s.stroke(100, 255, 150);
    }
    if (this.hover) {
      s.stroke(150);
    }
    s.rect(this.x, this.y, this.size, this.size);
    const range = Math.PI * 2;
    const ratio = this.size / range;
    const startX = this.x - this.size/2;
    const startY = this.y;
    s.noFill();
    s.stroke(50, 150, 255);
    s.beginShape();
    let noiseVal;
    for (let i = 0; i < this.steps; i++) {
      noiseVal = this.noises[i] * (this.s.props.training.noise/100);
      const x = i / this.steps * range;
      const x_ = (i - s.frameCount/8) / this.steps * range;
      const y = this.dataFunc((this.active && s.netAnim) ? x_ : x, this.type) + noiseVal;
      s.vertex(startX + this.size - x * ratio, startY + y * this.size / 4);
    }
    s.endShape();
  }

  /**
   * A helper function that represents the currently chosen input function
   *
   * @param {number} x the current input value
   * @param {string} type the type of function that should be applied to
   *  the input values
   * @return {number} y = type(x)
   */
  dataFunc(x, type) {
    let y = Math.sin(x);
    if (type === 'sinc') {
      y = Math.sin((x+Math.PI) % 4) / ((x+Math.PI) % 4);
    }
    if (type === 'saw') {
      y = -1 + x % 2;
    }
    if (type === 'sqr') {
      y = Math.sin(2*x) >= 0 ? 1 : -1;
    }
    return y;
  }

  /**
   *
   */
  checkClick() {
    const mx = this.s.mouseX;
    const my = this.s.mouseY;
    if (mx > this.left && mx < this.right && my > this.top && my < this.bot) {
      this.s.props.actions.updateTraining({...this.s.props.training, dataType: this.type});
    }
  }

  /**
   *
   * @param {*} mx
   * @param {*} my
   */
  mouseMoved(mx, my) {
    if (mx > this.left && mx < this.right && my > this.top && my < this.bot) {
      this.hover = true;
    } else {
      this.hover = false;
    }
  }
}
