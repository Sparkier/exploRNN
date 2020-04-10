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
    this.dist = 0.18 * s.inProps.height;
    this.buttons = [];
    this.steps = 30; // needed for the buttons' visual calculations
    this.noises = [];
    for (let i = 0; i < this.steps; i++) {
      this.noises.push(-0.2 + 0.4 * Math.random());
    }
    if (s.props.training.inputType === 'Text Data') {
      this.buttons.push(new Button(s, 'text', 1, 2, this.dist, 0, 0, 'abab'));
      this.buttons.push(new Button(s, 'text', 2, 2, this.dist, 0, 0, 'lorem'));
    } else {
      this.buttons.push(new Button(s, 'sin', 1, 4, this.dist, this.steps,
          this.noises));
      this.buttons.push(new Button(s, 'saw', 2, 4, this.dist, this.steps,
          this.noises));
      this.buttons.push(new Button(s, 'sqr', 3, 4, this.dist, this.steps,
          this.noises));
      this.buttons.push(new Button(s, 'sinc', 4, 4, this.dist, this.steps,
          this.noises));
    }
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
    s.textAlign(s.LEFT, s.CENTER);
    s.textSize(s.typography.fontsize);
    s.fill(s.colors.darkgrey);
    s.noStroke();
    s.text(s.global.strings.inputTitle,
        s.inProps.left + 20, offset / 2);
    s.stroke(s.colors.lightgrey);
    s.line(s.inProps.right, 0, s.inProps.right, s.inProps.height);
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
   * @param {number} maxPos the maximum position for all buttons
   * @param {number} dist the distance between two buttons
   * @param {number} steps the amount of function steps used for the button
   * image in this button
   * @param {number[]} noises an array of random noise values to be added
   * to the button image
   * @param {String} textType the type of text input
   */
  constructor(s, type, pos, maxPos, dist, steps = 0, noises = 0,
      textType = '') {
    this.s = s;
    this.type = type;
    this.pos = pos;
    this.maxPos = maxPos;
    this.x = s.inProps.midX;
    this.y = s.inProps.midY + (pos - 1) * dist - (maxPos / 2.0 - 0.5) * dist;
    this.size = dist * 0.8;
    this.left = this.x - this.size / 2;
    this.right = this.x + this.size/2;
    this.top = this.y - this.size / 2;
    this.bot = this.y + this.size/2;
    this.active = (s.props.training.dataTypes.includes(type));
    this.steps = steps;
    this.noises = noises;
    this.textType = textType;
  }

  /**
   * Draws a single input button on the canvas
   */
  draw() {
    const s = this.s;
    s.fill(s.colors.lightgrey);
    s.noStroke();
    s.strokeWeight(2);
    this.active = (s.props.training.dataTypes.includes(this.type) ||
      s.props.training.dataTypes.includes(this.textType));
    if (this.active) {
      s.noFill();
      if (s.netAnim && !this.s.rev) {
        s.stroke(s.colors.overview);
        s.drawingContext.lineDashOffset = -s.frameCount/2;
        s.drawingContext.setLineDash([10, 10]);
      } else {
        s.stroke(s.colors.bluegrey);
      }
      s.bezier(this.x + this.size / 2.0, this.y, s.inProps.right - 20, this.y,
          this.x + this.size / 2.0 + 20, s.inProps.height / 2.0,
          s.inProps.right, s.inProps.height / 2.0);
      s.noStroke();
      s.drawingContext.setLineDash([]);
      s.fill(s.colors.overview);
    }
    if (this.hover) {
      s.fill(s.colors.bluegrey);
      if (this.active) {
        s.fill(s.colors.overviewdark);
      }
      s.cursor(s.HAND);
    }
    s.rect(this.x, this.y, this.size, this.size);
    const startX = this.x - this.size/2;
    const startY = this.y;
    s.noFill();
    if (this.type === 'text') {
      s.fill(s.colors.white);
      s.textSize(30);
      s.textAlign(s.CENTER, s.CENTER);
      s.text(this.textType, startX + this.size/2, startY);
      s.textSize(s.typography.fontsize);
    } else {
      const range = Math.PI * 2;
      const ratio = this.size / range;
      s.stroke(s.colors.white);
      s.beginShape();
      let noiseVal;
      for (let i = 0; i < this.steps; i++) {
        noiseVal = this.noises[i] * (this.s.props.training.noise / 100);
        const x = i / this.steps * range;
        const x_ = (i + s.frameCount/8) / this.steps * range;
        const y = this.dataFunc((this.active && s.netAnim) ? x_ : x,
            this.type) + noiseVal;
        s.vertex(startX + this.size - x * ratio, startY + y * this.size / 4);
      }
      s.endShape();
    }
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
    let reset = false;
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
      } else if (this.type === 'text' && !oldTypes.includes(this.textType)) {
        if (this.s.props.network.iteration === 0) {
          newTypes = [this.textType];
          reset = true;
        } else {
          this.s.props.actions.updateAlertSnack({open: true,
            message: 'This change can only be made after a Network Reset.'});
          newTypes = oldTypes;
        }
      } else {
        oldTypes.push(this.type);
        newTypes = oldTypes;
      }
      this.s.props.actions.updateTraining(
          {...this.s.props.training, dataTypes: newTypes, reset: reset}
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
