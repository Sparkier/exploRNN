import {Layer} from './Layer';
import {FakeLayer} from './FakeLayer';

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
      s.stroke(s.colors.overview);
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
    const offset = s.height * s.typography.titleOffsetRatio;
    s.textAlign(s.LEFT, s.CENTER);
    s.textSize(s.typography.fontsize);
    s.fill(s.colors.darkgrey);
    s.noStroke();
    s.text(s.global.strings.networkTitle, s.netProps.left + 20, offset / 2);
    s.stroke(s.colors.lightgrey);
    s.line(s.netProps.right, 0, s.netProps.right, s.netProps.height);
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
