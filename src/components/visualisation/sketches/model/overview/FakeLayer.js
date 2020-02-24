/**
 * This class represents a so called fake layer, meaning a layer
 * that is not currently in the network but can be added to the network
 * if the user clicks on it
 */
export class FakeLayer {
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
    const d = s.dist(s.mx, s.my, this.x, this.y);
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
      s.fill(s.colors.darkbluegrey);
      s.noStroke();
      s.rect(s.mx, s.my + s.typography.tooltipoffset, 100, 25);
      s.fill(255);
      s.text(s.global.strings.tooltipAdd, s.mx,
          s.my + s.typography.tooltipoffset);
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
      // Stop the training
      this.s.props.actions.stopTraining(this.s.props.training);
      // Update the network by adding a layer
      this.s.props.actions.updateNetwork({...this.s.props.network,
        layers: this.s.props.network.layers + 1});
      // Reset the training state
      this.s.props.actions.updateTraining({...this.s.props.training,
        reset: true});
    }
    this.clicked = this.hover;
  }
}
