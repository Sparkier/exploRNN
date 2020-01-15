/**
 * This class represents the network model to be drawn on the drawing canvas
 */
export class Network {
  /**
   * The constructor function of the network class
   *
   * @param {object} s the p5 sketch
   */
  constructor(s) {
    this.s = s;
    this.layers = [];
    this.fakeLayers = [];
    this.loss = false;
    this.s.rev = false;
    const layercount = s.network.length;
    if (layercount === 0) {
      return;
    }
    let nodes = s.network[0];
    this.active = false;
    this.layers.push(new Layer(s, layercount, 0, nodes));
    this.fakeLayers.push(new FakeLayer(s, layercount, 0.5));
    for (let i = 1; i < layercount - 1; i++) {
      nodes = s.network[i];
      this.layers.push(new Layer(s, layercount, i, nodes));
      this.fakeLayers.push(new FakeLayer(s, layercount, i + 0.5));
    }
    nodes = s.network[layercount-1];
    this.layers.push(new Layer(s, layercount, layercount - 1, nodes));
  }

  /**
   * This functions is responsible for drawing the network model
   * onto the dedicated canvas
   */
  draw() {
    const s = this.s;
    s.strokeWeight(2 * s.netScale);
    if (s.netAnim) {
      s.stroke(s.colors.cyan);
      s.drawingContext.lineDashOffset = this.s.rev ?
        s.frameCount/2 : -s.frameCount/2;
      s.drawingContext.setLineDash([10, 10]);
    } else {
      s.stroke(s.colors.bluegrey);
    }
    this.s.noFill();
    this.s.line(s.netProps.left, s.netProps.midY, s.netProps.right,
        s.netProps.midY);
    s.drawingContext.setLineDash([]);
    this.updatePause = Math.round(s.netPredFrames /
      (this.layers.length));
    this.updatePauseRev = Math.round(s.netTrainFrames /
      (this.layers.length));
    this.s.rev = s.netFrame > s.netPredFrames + s.netLossFrames;

    if (!this.s.rev && s.netAnim && s.props.training.running &&
        s.netFrame % this.updatePause === 0) {
      this.update();
    }
    if (this.s.rev && s.netAnim && s.props.training.running &&
        (s.netFrame - (s.netPredFrames + s.netLossFrames)) %
        this.updatePauseRev === 0) {
      this.update();
    }
    for (const l of this.layers) {
      l.draw();
    }
    for (const l of this.fakeLayers) {
      l.draw();
    }
    s.textAlign(s.CENTER, s.BOTTOM);
    s.textSize(16);
    s.fill(0);
    s.noStroke();
    s.text('Network', s.netProps.midX, 100);
  }

  /**
   * This function is being called by the p5 sketch if the user has moved
   * the cursor across the canvas and then updates the network accordingly
   *
   * @param {number} x the x position of the mouse cursor
   * @param {number} y the y position of the mouse cursor
   */
  mouseMoved(x, y) {
    for (const l of this.layers) {
      l.mouseMoved(x, y);
    }
    for (const l of this.fakeLayers) {
      l.mouseMoved(x, y);
    }
  }

  /**
   * This function is being called when the user clicks on the canvas
   */
  checkClick() {
    for (const l of this.layers) {
      l.checkClick();
    }
    for (const l of this.fakeLayers) {
      l.checkClick();
    }
  }

  /**
   * This function is being called as a means to create an animated network
   */
  update() {
    const s = this.s;
    let next = -1;
    let buff = 0;
    for (const l of this.layers) {
      buff = l.update();
      if (buff > next) {
        next = buff;
      }
    }
    if (!s.rev && next >= 0 && next < this.layers.length) {
      this.layers[next].activate();
    } else if (s.rev && next >= 2 && next <= this.layers.length) {
      this.layers[next - 2].activate();
    } else {
      this.layers[this.layers.length - 1].activate();
    }
  }

  /**
   * Initializes the animation of the network
   */
  start() {
    for (const l of this.layers) {
      l.deactivate();
    }
    this.s.rev = false;
    this.layers[1].activate();
  }
}

/**
 * This class represents a layer in the network model
 */
class Layer {
  /**
   * The construcor function of the layer class
   *
   * @param {object} s the p5 sketch
   * @param {number} layers the amount of layers in the network
   * @param {number} i the index of this layer
   * @param {object} nodes an object containing the type and size of this layer
   */
  constructor(s, layers, i, nodes) {
    this.s = s;
    this.i = i;
    this.layers = layers - 2;
    this.layerwidth = nodes.size;
    this.nodes = [];
    this.layerType = nodes.type;
    this.active = false;
    this.hover = false;
    this.hover_left = false;
    this.hover_right = false;
    this.clicked = false;
    this.x = s.netProps.left + s.netProps.width * (this.i)/(this.layers + 1);
    this.y = s.netProps.midY;
    this.w = s.netProps.width / (2 * this.layers + 1) * 0.8;
    this.h = this.w * 0.8;
    this.clSize = this.w * 0.3;
  }

  /**
   * This function is responsible of drawing the current layer onto
   * the p5 canvas
   */
  draw() {
    if (!(this.layerType === 'input' || this.layerType === 'output')) {
      const s = this.s;
      // draw layer with correct parameters
      let w = this.w;
      let h = this.h;
      s.textAlign(s.CENTER, s.CENTER);
      s.noFill();
      s.stroke(s.colors.bluegrey);
      if (s.netAnim) {
        s.stroke(s.colors.cyan);
        s.drawingContext.lineDashOffset = this.s.rev ?
          -s.frameCount/2 : s.frameCount/2;
        s.drawingContext.setLineDash([10, 10]);
      }
      s.rect(this.x, this.y-h/2, w * 1.4, h, 20);
      s.drawingContext.setLineDash([]);
      s.noStroke();
      s.fill(s.colors.darkbluegrey);
      if (this.hover) {
        s.fill(s.colors.bluegrey);
        s.cursor(s.HAND);
      }
      if (this.active) {
        s.fill(s.colors.cyan);
        w = 1.2 * this.w;
        h = 1.2 * this.h;
      }
      s.rect(this.x, this.y, w, h);
      // draw inside of layer block
      s.noStroke();
      s.fill(s.colors.white);
      s.strokeWeight(2);
      const left = this.x - w/2;
      const top = this.y - h/2;
      for (let i = 0; i < 5; i++) {
        s.ellipse(left + (i+1) * w / 6, top + h / 3,
            w / (i === 0 || i === 2 ? 20 : 10));
      }
      s.rect(left + (3) * w / 6, top + 2 * h / 3, w / (10), w / (10));
      // draw hover info
      if (this.hover_left) {
        s.noStroke();
        if (this.s.props.network.layers > 1) {
          s.stroke(s.colors.red);
          s.fill(s.colors.red);
          s.textSize(this.clSize/2);
          s.text('X', this.x + w/2 - this.clSize / 2,
              this.y - h/2 + this.clSize / 2);
          s.textSize(s.typography.fontsize);
        }
        s.noStroke();
        s.colors.bluegrey.setAlpha(170);
        s.fill(s.colors.bluegrey);
        s.colors.bluegrey.setAlpha(255);
        s.rect(s.mouseX, s.mouseY + s.typography.tooltipoffset, 110, 25);
        s.fill(255);
        s.text('Click for detail', s.mouseX,
            s.mouseY + s.typography.tooltipoffset);
      } else if (this.hover_right && this.s.props.network.layers > 1 ) {
        s.noStroke();
        s.fill(s.colors.red);
        s.rect(this.x + w/2 - this.clSize / 2, this.y - h/2 + this.clSize / 2,
            this.clSize, this.clSize);
        s.textAlign(s.CENTER, s.CENTER);
        s.colors.bluegrey.setAlpha(170);
        s.fill(s.colors.bluegrey);
        s.colors.bluegrey.setAlpha(255);
        s.rect(s.mouseX, s.mouseY + s.typography.tooltipoffset, 110, 25);
        s.fill(255);
        s.textSize(this.clSize/2);
        s.text('X', this.x + w/2 - this.clSize / 2,
            this.y - h/2 + this.clSize / 2);
        s.textSize(s.typography.fontsize);
        s.text('Remove Layer', s.mouseX, s.mouseY + s.typography.tooltipoffset);
      }
    }
  }

  /**
   * This function gets called if the mouse has been moved and checks
   * if this current layer is being hovered over
   *
   * @param {number} x the x position of the cursor
   * @param {number} y the y position of the cursor
   */
  mouseMoved(x, y) {
    if (this.layerType === 'input' || this.layerType === 'output') {
      return;
    }
    if (x > this.x - this.w / 2 && x < this.x + this.w / 2 &&
        y > this.y - this.h / 2 && y < this.y + this.h / 2) {
      this.hover = true;
      const w = this.w;
      const h = this.h;
      this.hover_left = !(this.hover_right =
          (x > this.x + w / 2 - this.clSize &&
          y < this.y - h / 2 + this.clSize) &&
          this.s.props.network.layers > 1 );
    } else {
      this.hover = this.hover_left = this.hover_right = false;
    }
  }

  /**
   * This function is called when the user clicks on the canvas, it then
   * checks if this layer is being clicked on
   */
  checkClick() {
    if (this.layerType === 'input' || this.layerType === 'output') {
      return;
    }
    if (this.hover && !this.clicked) {
      this.s.clickedBlock = this;
      if (this.hover_left) {
        this.s.detail = true;
        this.s.props.actions.stopTraining(this.s.props.training);
        this.s.props.actions.updateUI({...this.s.props.ui, detail: true});
      } else if (this.s.props.network.layers > 1) {
        this.s.props.actions.stopTraining(this.s.props.training);
        this.s.props.actions.updateNetwork({...this.s.props.network,
          layers: this.s.props.network.layers - 1});
      }
    }
    this.clicked = this.hover;
  }

  /**
   * Deactivates the current layer if needed and reports back which index
   * layer should be activated next
   *
   * @return {number} the next index
   */
  update() {
    if (this.active) {
      this.active = false;
      return this.i + 1;
    } else {
      return -1;
    }
  }

  /**
   * sets this layer to be active
   */
  activate() {
    this.active = true;
  }

  /**
   * sets this layer to be active
   */
  deactivate() {
    this.active = false;
  }
}

/**
 * This class represents a so called fake layer, meaning a layer
 * that is not currently in the network but can be added to the network
 * if the user clicks on it
 */
class FakeLayer {
  /**
   * The constructor function of the fake layer class
   *
   * @param {object} s the p5 sketch
   * @param {number} layers the total amount of layers in the network
   * @param {number} i the index of this fake layer, not necessarily an integer
   */
  constructor(s, layers, i) {
    this.s = s;
    this.i = i;
    this.layers = layers - 2;
    this.layerwidth = 1;
    this.nodes = [];
    this.hover = false;
    this.clicked = false;
    this.x = s.netProps.left + s.netProps.width * (this.i) / (this.layers + 1);
    this.y = s.netProps.midY;
    this.w = s.netProps.width / (2 * this.layers + 1) * 0.25;
    this.h = this.w;
  }

  /**
   * This function will draw the fake layer object onto th canvas
   */
  draw() {
    if (this.s.props.network.layers >= 7) {
      return;
    }
    const s = this.s;
    s.textAlign(s.CENTER, s.CENTER);
    const d = s.dist(s.mouseX, s.mouseY, this.x, this.y);
    let alpha = (2 * this.w - d) / (this.w) * 255;
    if (alpha > 255) {
      alpha = 255;
    } else if (alpha <= 0) {
      alpha = 0;
    }
    s.fill(255, alpha);
    if (this.hover) {
      s.fill(s.colors.bluegrey);
      s.cursor(s.HAND);
    }
    s.ellipse(this.x, this.y, this.w, this.h);
    if (this.hover) {
      s.fill(s.colors.white);
      s.textSize(this.w);
      s.text('+', this.x, this.y);
      s.cursor(s.HAND);
    } else {
      s.colors.darkbluegrey.setAlpha(alpha);
      s.fill(s.colors.darkbluegrey);
      s.textSize(this.w);
      s.text('+', this.x, this.y);
    }
    s.noStroke();
    s.textSize(s.typography.fontsize);
    s.colors.darkbluegrey.setAlpha(255);
    if (this.hover) {
      s.colors.bluegrey.setAlpha(170);
      s.fill(s.colors.bluegrey);
      s.colors.bluegrey.setAlpha(255);
      s.noStroke();
      s.rect(s.mouseX, s.mouseY + s.typography.tooltipoffset, 85, 25);
      s.fill(255);
      s.text('Add Layer', s.mouseX, s.mouseY + s.typography.tooltipoffset);
    }
  }

  /**
   * This functions checks if the mouse cursor is near the fake layer
   * and will cause the draw function to draw the fake layer more visible
   * if the cursor is closer to it
   *
   * @param {number} x the x position of the cursor
   * @param {number} y the y position of the cursor
   */
  mouseMoved(x, y) {
    if (x > this.x - this.w / 2 && x < this.x + this.w / 2 &&
        y > this.y - this.h / 2 && y < this.y + this.h / 2) {
      this.hover = true;
    } else {
      this.hover = false;
    }
  }

  /**
   * This function checks if the current fake layer component has been
   * clicked on
   */
  checkClick() {
    if (this.hover && !this.clicked && this.s.props.network.layers < 7) {
      this.s.props.actions.stopTraining(this.s.props.training);
      this.s.props.actions.updateNetwork({...this.s.props.network,
        layers: this.s.props.network.layers + 1});
    }
    this.clicked = this.hover;
  }
}
