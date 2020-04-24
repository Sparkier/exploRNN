import {getNextIntroState} from '../../../../../../helpers/OnboardingState';

/**
 * This class represents a layer in the network model
 */
export class Layer {
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
        s.stroke(s.colors.overview);
        s.drawingContext.lineDashOffset = this.s.rev ?
          s.frameCount/2 : -s.frameCount/2;
        s.drawingContext.setLineDash([10, 10]);
      }
      s.rect(this.x, this.y+h/2, w * 1.4, h, 20);
      s.drawingContext.setLineDash([]);
      s.noStroke();
      s.fill(s.colors.darkbluegrey);
      if (this.hover) {
        s.fill(s.colors.bluegrey);
        s.cursor(s.HAND);
      }
      if (this.active) {
        s.fill(s.colors.overview);
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
        s.fill(s.colors.darkbluegrey);
        s.rect(s.mx, s.my + s.typography.tooltipoffset, 110, 25);
        s.fill(255);
        s.text(s.global.strings.tooltipCell, s.mx,
            s.my + s.typography.tooltipoffset);
      } else if (this.hover_right && this.s.props.network.layers > 1) {
        s.noStroke();
        s.fill(s.colors.red);
        s.rect(this.x + w/2 - this.clSize / 2, this.y - h/2 + this.clSize / 2,
            this.clSize, this.clSize);
        s.textAlign(s.CENTER, s.CENTER);
        s.fill(s.colors.darkbluegrey);
        s.rect(s.mx, s.my + s.typography.tooltipoffset, 120, 25);
        s.fill(255);
        s.textSize(this.clSize/2);
        s.text('X', this.x + w/2 - this.clSize / 2,
            this.y - h/2 + this.clSize / 2);
        s.textSize(s.typography.fontsize);
        s.text(s.global.strings.tooltipDelete, s.mx,
            s.my + s.typography.tooltipoffset);
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
          this.s.props.network.layers > 1);
      // If not yet allowed to go to detail
      const introEarly = [
        'input',
        'network',
        'startTraining',
        'output',
        undefined,
        '',
      ].includes(this.s.props.cookiesState.intro);
      if (introEarly && this.hover_left) {
        this.hover_left = false;
        this.hover = false;
      }
    } else {
      this.hover = this.hover_left = this.hover_right = false;
    }
  }

  /**
   * This function is called when the user clicks on the canvas, it then
   * checks if this layer is being clicked on
   */
  checkClick() {
    // Do not handle clicks for input and output layers
    if (this.layerType === 'input' || this.layerType === 'output') {
      return;
    }
    // If this layer is hovered, handle the click
    if (this.hover) {
      this.clicked = true;
      this.s.clickedBlock = this;
      // Clicked on the cell itself
      if (this.hover_left) {
        this.s.detail = true;
        this.s.props.actions.updateUI({...this.s.props.ui, detail: true,
          anim: this.s.props.training.running});
        this.s.props.actions.stopTraining(this.s.props.training);
        if (this.s.props.cookiesState.intro === 'cellTransition') {
          getNextIntroState(this.s.props.cookiesState.intro,
              this.s.props.cookiesState,
              this.s.props.actions.updateCookiesState);
        }
      // Clicked on cell removal icon with more than one cell
      } else if (this.s.props.network.layers > 1) {
        // Stop the training
        this.s.props.actions.stopTraining(this.s.props.training);
        // Update the network by removing a layer
        this.s.props.actions.updateNetwork({...this.s.props.network,
          layers: this.s.props.network.layers - 1});
        // Reset the training state
        this.s.props.actions.updateTraining({...this.s.props.training,
          reset: true});
      }
    } else {
      this.clicked = false;
    }
    this.hover = false;
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
   * Sets this layer to be active
   */
  activate() {
    this.active = true;
  }

  /**
   * Sets this layer to be active
   */
  deactivate() {
    this.active = false;
  }
}
