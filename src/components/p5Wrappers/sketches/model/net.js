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
    s.blue = s.color(100, 150, 255);
    s.orange = s.color(255, 200, 100);
    s.white = s.color(54);
    this.layers = [];
    this.fakeLayers = [];
    const layercount = s.network.length;
    let nodes = s.network[0];
    this.layers.push(new Layer(s, layercount, -1, nodes));
    this.fakeLayers.push(new FakeLayer(s, layercount, 0.5));
    for (let i = 1; i < layercount - 1; i++) {
      nodes = s.network[i];
      this.layers.push(new Layer(s, layercount, i, nodes));
      this.fakeLayers.push(new FakeLayer(s, layercount, i + 0.5));
    }
    nodes = s.network[layercount-1];
    this.layers.push(new Layer(s, layercount, -1, nodes));
  }

  /**
   * This functions is responsible for drawing the network model
   * onto the dedicated canvas
   */
  draw() {
    const s = this.s;
    s.strokeWeight(2 * s.netScale);
    if (s.props.training.running) {
      s.stroke(s.blue);
      s.drawingContext.lineDashOffset = -s.frameCount/2;
      s.drawingContext.setLineDash([10, 10]);
    } else {
      s.stroke(s.white);
    }
    this.s.noFill();
    this.s.line(s.ctrLeft, this.s.height/2, this.s.ctrRight, this.s.height/2);
    s.drawingContext.setLineDash([]);
    for (const l of this.layers) {
      l.draw();
    }
    for (const l of this.fakeLayers) {
      l.draw();
    }
  }

  /**
   * This function is being called by the p5 sketch if the user has moved
   * the cursor across the canvas and then updates the network accordingly
   *
   * @param {number} x the x position of the mouse cursor
   * @param {number} y the y position of the mouse cursor
   */
  update(x, y) {
    for (const l of this.layers) {
      l.update(x, y);
    }
    for (const l of this.fakeLayers) {
      l.update(x, y);
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
    this.hover = false;
    this.hover_left = false;
    this.hover_right = false;
    this.clicked = false;
    this.x = s.ctrLeft + s.ctrWidth * (this.i)/(this.layers + 1);
    this.y = s.height/2;
    this.w = s.ctrWidth/(2*this.layers + 1)*0.8;
    this.h = this.w * 0.8;
  }

  /**
   * This function is responsible of drawing the current layer onto
   * the p5 canvas
   */
  draw() {
    if (!(this.layerType === 'input' || this.layerType === 'output')) {
      const s = this.s;
      s.fill(0, 100);
      s.noStroke();
      s.rect(this.x+5, this.y+5, this.w, this.h);
      s.fill(250, this.s.netAlpha);
      let w = this.w;
      let h = this.h;
      if (s.props.training.running) {
        s.stroke(s.white, this.s.netAlpha);
      } else {
        s.stroke(s.white, this.s.netAlpha);
      }
      if (this.hover) {
        s.stroke(100, this.s.netAlpha);
        s.cursor(s.HAND);
        w = 1.2 * this.w;
        h = 1.2 * this.h;
      }
      s.rect(this.x, this.y, w, h);
      s.noStroke();
      if (s.props.training.running) {
        s.fill(s.blue, this.s.netAlpha);
      } else {
        s.fill(s.white, this.s.netAlpha);
      }
      s.strokeWeight(2);
      const left = this.x - w/2;
      const top = this.y - h/2;
      for (let i = 0; i < 5; i++) {
        s.ellipse(left + (i+1) * w / 6, top + h / 3,
            w / (i === 0 || i === 2 ? 20 : 10));
      }
      s.rect(left + (3) * w / 6, top + 2 * h / 3, w / (10), w / (10));
      if (this.hover_left) {
        s.noStroke();
        s.fill(50, 250, 100, 240);
        s.rect(this.x - w/4, this.y, w/2, h);
        s.fill(150, 20, 20, 100);
        s.rect(this.x + w/4, this.y, w/2, h);
        s.textAlign(s.CENTER, s.CENTER);
        s.fill(0, 150);
        s.rect(s.mouseX, s.mouseY+40, 85, 25);
        s.fill(255);
        s.text('Click for detail', s.mouseX, s.mouseY + 40);
      } else if (this.hover_right && this.s.props.network.layers > 1 ) {
        s.noStroke();
        s.fill(225, 50, 50, 240);
        s.rect(this.x + w/4, this.y, w/2, h);
        s.fill(20, 150, 50, 100);
        s.rect(this.x - w/4, this.y, w/2, h);
        s.textAlign(s.CENTER, s.CENTER);
        s.fill(0, 150);
        s.rect(s.mouseX, s.mouseY+40, 85, 25);
        s.fill(255);
        s.text('Remove Layer', s.mouseX, s.mouseY + 40);
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
  update(x, y) {
    if (x > this.x - this.w/2 && x < this.x + this.w/2 &&
        y > this.y - this.h/2 && y < this.y + this.h/2) {
      this.hover = true;
      this.hover_left = !(this.hover_right = (x > this.x));
    } else {
      this.hover = this.hover_left = this.hover_right = false;
    }
  }

  /**
   * This function is called when the user clicks on the canvas, it then
   * checks if this layer is being clicked on
   */
  checkClick() {
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
    this.x = s.ctrLeft + s.ctrWidth * (this.i)/(this.layers + 1);
    this.y = s.height/2;
    this.w = s.ctrWidth/(2*this.layers + 1)*0.25;
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
    const d = s.dist(s.mouseX, s.mouseY, this.x, this.y);
    let alpha = (2*this.w - d) / (this.w) * 255;
    if (alpha > 255) {
      alpha = 255;
    } else if (alpha <= 0) {
      alpha = 0;
    }
    s.fill(250, alpha);
    s.stroke(54, alpha);
    if (this.hover) {
      s.stroke(50, 150, 50, alpha);
      s.cursor(s.HAND);
    }
    s.ellipse(this.x, this.y, this.w, this.h);
    if (this.hover) {
      s.textAlign(s.CENTER, s.CENTER);
      s.fill(0, 150);
      s.noStroke();
      s.rect(s.mouseX, s.mouseY+40, 85, 25);
      s.fill(255);
      s.text('Add Layer', s.mouseX, s.mouseY + 40);
    }
  }

  /**
   * This functions checks if the mouse cursor is near the fake layer
   * and will draw the fake layer more visible if the cursor is closer
   * to it
   *
   * @param {number} x the x position of the cursor
   * @param {number} y the y position of the cursor
   */
  update(x, y) {
    if (x > this.x - this.w/2 && x < this.x + this.w/2 &&
        y > this.y - this.h/2 && y < this.y + this.h/2) {
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
