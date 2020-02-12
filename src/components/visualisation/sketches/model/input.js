/**
 * This class represents the visual component of the input selection for
 * the network
 */
export class Input {
  /**
  * The constructor of this class
  *
  * @param {object} s the p5.js sketch
  */
  constructor(s) {
    this.s = s;
    this.dist = 0.15 * s.inProps.height;
    this.buttons = [];
    this.steps = 30;
    this.noises = [];
    for (let i = 0; i < this.steps; i++) {
      this.noises.push(-0.2 + 0.4 * Math.random());
    }
    this.buttons.push(new Button(s, 'sin', 1,
        this.dist, this.steps, this.noises));
    this.buttons.push(new Button(s, 'saw', 2,
        this.dist, this.steps, this.noises));
    this.buttons.push(new Button(s, 'sqr', 3,
        this.dist, this.steps, this.noises));
    this.buttons.push(new Button(s, 'sinc', 4,
        this.dist, this.steps, this.noises));
  }

  /**
   * Draw input options
   */
  draw() {
    const s = this.s;
    for (const b of this.buttons) {
      b.draw();
    }
    const offset = s.height * s.typography.titleOffsetRatio;
    const titleH = s.typography.fontsize * 2;
    s.textAlign(s.CENTER, s.CENTER);
    s.rectMode(s.CENTER);
    s.fill(s.palette.tooltipBG);
    s.noStroke();
    s.rect(s.inProps.midX, offset / 2, 0.15 * s.inProps.height, titleH, 5);
    s.textSize(s.typography.fontsize);
    s.fill(s.palette.tooltipFG);
    s.noStroke();
    s.text(s.global.strings.inputTitle, s.inProps.midX, offset / 2);
  }

  /**
   * Check if a mouse click interacts with an input button
   */
  checkClick() {
    for (const b of this.buttons) {
      b.checkClick();
    }
  }

  /**
   * Check if a mouse movement occurs over an input button
   *
   * @param {number} mx the x position of the cursor
   * @param {number} my the y position of the cursor
   */
  mouseMoved(mx, my) {
    for (const b of this.buttons) {
      b.mouseMoved(mx, my);
    }
  }
}

/**
 * This class represents a single input button
 */
class Button {
  /**
   * The constructor of this class
   *
   * @param {object} s the parent p5.js sketch
   * @param {string} type the function type of this button
   * @param {number} pos the position of this button
   * @param {number} dist the distance between two buttons
   * @param {number} steps the amount of function steps used for the button
   * image in this button
   * @param {number[]} noises an array of random noise values to be added
   * to the button image
   */
  constructor(s, type, pos, dist, steps, noises) {
    this.s = s;
    this.type = type;
    this.pos = pos;
    this.x = s.inProps.midX;
    this.y = s.inProps.midY - 1.5 * dist + (pos - 1) * dist;
    this.size = dist * 0.8;
    this.left = this.x - this.size / 2;
    this.right = this.x + this.size/2;
    this.top = this.y - this.size / 2;
    this.bot = this.y + this.size/2;
    this.active = (s.props.training.dataTypes.includes(type));
    this.steps = steps;
    this.noises = noises;
  }

  /**
   * Draws a single input button on the canvas
   */
  draw() {
    const s = this.s;
    s.fill(s.palette.contrast);
    s.noStroke();
    s.strokeWeight(2);
    this.active = (s.props.training.dataTypes.includes(this.type));
    if (this.active) {
      s.fill(s.palette.ovPrimary);
    }
    if (this.hover) {
      s.fill(s.palette.secondaryContrast);
      if (this.active) {
        s.fill(s.palette.ovSecondary);
      }
      s.cursor(s.HAND);
    }
    s.rect(this.x, this.y, this.size, this.size);
    const range = Math.PI * 2;
    const ratio = this.size / range;
    const startX = this.x - this.size/2;
    const startY = this.y;
    s.noFill();
    s.stroke(s.palette.primary);
    s.beginShape();
    let noiseVal;
    for (let i = 0; i < this.steps; i++) {
      noiseVal = this.noises[i] * (this.s.props.training.noise/100);
      const x = i / this.steps * range;
      const x_ = (i + s.frameCount/8) / this.steps * range;
      const y = this.dataFunc((this.active && s.netAnim) ? x_ : x, this.type) +
        noiseVal;
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
      y = (Math.sin(1.5*x) + Math.sin(4.5 * x)) / 1.5;
    }
    if (type === 'saw') {
      y = -1 + 2 * ((x % Math.PI) / Math.PI);
    }
    if (type === 'sqr') {
      y = Math.sin((Math.PI/2)*x) >= 0 ? 1 : -1;
    }
    return y;
  }

  /**
   * Checks if a mouse click interacts with this button
   */
  checkClick() {
    const mx = this.s.mx;
    const my = this.s.my;
    if (mx > this.left && mx < this.right && my > this.top && my < this.bot) {
      const oldTypes = this.s.props.training.dataTypes;
      let newTypes = [];
      if (oldTypes.includes(this.type) && oldTypes.length > 1) {
        for (const item of oldTypes) {
          if (item !== this.type) {
            newTypes.push(item);
          }
        }
      } else if (oldTypes.includes(this.type) && oldTypes.length === 1) {
        newTypes = oldTypes;
      } else {
        oldTypes.push(this.type);
        newTypes = oldTypes;
      }
      this.s.props.actions.updateTraining(
          {...this.s.props.training, dataTypes: newTypes}
      );
    }
  }

  /**
   * Check if a mouse movement occurs over this specific input button
   *
   * @param {number} mx the x position of the cursor
   * @param {number} my the y position of the cursor
   */
  mouseMoved(mx, my) {
    if (mx > this.left && mx < this.right && my > this.top && my < this.bot) {
      this.hover = true;
    } else {
      this.hover = false;
    }
  }
}
