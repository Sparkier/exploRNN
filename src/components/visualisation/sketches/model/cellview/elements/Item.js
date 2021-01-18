/**
 * This class represents all the items in a lstm cell model
 */
export class Item {
  /**
   * The constructor function of the item class
   *
   * @param {object} cell the constant cell values
   * @param {string} type the item type represented as a string
   * @param {number} x realtive x position of this item
   * @param {number} y the relative y position of this item
   * @param {number} ingoing the amount of ingoing connections
   * @param {number} step the corresponding description step
   * @param {number} id the corresponding item id used for dialog handling
   */
  constructor(cell, type, x, y, ingoing, step, id) {
    this.s = cell.s;
    this.type = type;
    this.cell = cell;
    this.x = cell.left + x * cell.horBuf;
    this.y = cell.top + y * cell.verBuf;
    this.step = step;
    this.id = id;
    this.hover = false;
    this.clicked = false;
    this.active = false;
    this.negativeActivation = false;
    this.connections = [];
    this.maxIngoingConnections = ingoing;
    this.currentActivatedConnecions = 0;

    switch (type) {
      case 'fst':
      case 'lst':
      case 'sav':
      case 'rec':
        this.r = (cell.width)/20;
        break;
      case 'glt':
      case 'gft':
        this.r = (cell.width)/30;
        break;
      case 'crs':
        this.r = (cell.width)/50;
        break;
      default:
        this.r = (cell.width)/10;
    }
  }

  /**
   * This function is responsible for drawing the item on the
   * drawing canvas
   */
  draw() {
    const s = this.s;
    let size = this.r;
    let imgSize = 0.6 * this.r;
    if (this.active || (s.cellAnim.back && this.negativeActivation)) {
      size = this.r * 1.2;
      imgSize = 0.6 * this.r * 1.2;
    }
    this.s.fill(s.colors.lightgrey);
    if (this.type === 'gft' || this.type === 'glt') {
      this.s.fill(s.colors.grey);
    }
    this.s.noStroke();
    if (this.active || (s.cellAnim.back && this.negativeActivation)) {
      s.fill(s.colors.detail);
    } else if (this.currentActivatedConnecions !== 0) {
      s.fill(s.colors.detail);
    }
    if (this.hover &&
        !(this.type === 'fst' || this.type === 'lst' || this.type === 'crs' ||
        this.type === 'gft' || this.type === 'glt')) {
      s.fill(s.colors.detaillight);
      s.cursor(s.HAND);
    }
    if (this.s.props.cookiesState.intro === 'detailCellMemory') {
      if (this.type === 'cel') {
        s.fill(s.colors.detaillight);
      } else {
        s.fill(s.colors.lightgrey);
      }
    }
    if (this.s.props.cookiesState.intro === 'detailCellGates') {
      if (this.type === 'los' || this.type === 'add' || this.type === 'out') {
        s.fill(s.colors.detaillight);
      } else {
        s.fill(s.colors.lightgrey);
      }
    }
    const layer = s.clickedBlock;
    const hasPrev = layer ? (layer.i !== 1) : false;
    const hasNext = layer ? (layer.i !== layer.layers) : false;
    if ((this.type === 'gft' && hasPrev) ||
        (this.type === 'glt' && hasNext)) {
      const w = 0.05 * s.width;
      const h = 0.8 * w;
      s.noStroke();
      if (this.active || (s.cellAnim.back && this.negativeActivation)) {
        s.fill(s.colors.detail);
      } else {
        s.fill(s.colors.darkgrey);
      }
      s.rect(this.x, this.y, w, h);
      s.noStroke();
      s.fill(s.colors.white);
      const left = this.x - w/2;
      const top = this.y - h/2;
      for (let i = 0; i < 5; i++) {
        s.ellipse(left + (i+1) * w / 6, top + h / 3,
            w / (i === 0 || i === 2 ? 20 : 10));
      }
      s.rect(left + (3) * w / 6, top + 2 * h / 3, w / (10), w / (10));
    } else if (this.type === 'cel') {
      this.s.rect(this.x, this.y, size, size);
    } else {
      this.s.ellipse(this.x, this.y, size);
    }
    switch (this.type) {
      case 'rec':
        this.s.image(this.s.receive, this.x, this.y, imgSize*2, imgSize*2);
        break;
      case 'add':
        this.s.image(this.s.add, this.x, this.y, imgSize, imgSize);
        break;
      case 'sav':
        this.s.image(this.s.save, this.x, this.y, imgSize*2, imgSize*2);
        break;
      case 'los':
        this.s.image(this.s.forget, this.x, this.y, imgSize, imgSize);
        break;
      case 'cel':
        this.s.image(this.s.cellImage, this.x, this.y, imgSize, imgSize);
        break;
      case 'out':
        this.s.image(this.s.output, this.x, this.y, imgSize, imgSize);
        break;
      default:
    }
    if (this.hover &&
        !(this.type === 'fst' || this.type === 'lst' || this.type === 'crs' ||
        this.type === 'gft' || this.type === 'glt')) {
      s.textAlign(s.CENTER, s.CENTER);
      s.fill(0, 150);
      s.rect(s.mx, s.my + s.typography.tooltipoffset, 110, 30);
      s.fill(255);
      s.text(this.s.global.strings.lstmGates[this.id].title,
          s.mx, s.my + s.typography.tooltipoffset
      );
    }
    s.stroke(s.colors.lightgrey);
    s.strokeWeight(2);
    s.line(s.detailProps.right, 0, s.detailProps.right, s.detailProps.height);
  }

  /**
   * This function increases the amount of active inputs by one, if the
   * maximum amount of input activtaions is reached this item will fire
   * an activation trigger in the next update cycle
   */
  addActiveInput() {
    this.currentActivatedConnecions += 1;
  }

  /**
   * This function sets the negativeActivation parameter to true, meaning it
   * will be displayed as active in the backprop animation
   */
  addNegativeInput() {
    this.negativeActivation = true;
  }

  /**
   * Removes the current activations
   */
  deactivate() {
    this.active = false;
    this.negativeActivation = false;
    this.currentActivatedConnecions = 0;
  }

  /**
   * This funtion will send an activation call to all outgoing connections
   * if the item has enough activation inputs
   */
  sendActivations() {
    const s = this.s;
    if (this.active && this.connections && this.connections.length > 0) {
      if (this.type === 'glt') {
        s.cellAnim.inputStep++;
        if (s.cellAnim.inputStep === this.s.props.training.values) {
          s.cellAnim.inputStep = 0;
          s.cellAnim.predictionStep++;
          if (s.cellAnim.predictionStep >= this.s.props.training.predictions) {
            s.cellAnim.predictionStep = 0;
            s.cellAnim.error = true;
            s.cellAnim.forward = false;
            this.s.props = {...this.s.props, ui: {...this.s.props.ui,
              state: [false, true, false]}};
          }
        }
      }
      for (const c of this.connections) {
        if (c) {
          c.addActiveInput();
        }
      }
    }
  }

  /**
   * This function makes sure that the item is always correctly labeled
   * active or inactive and gets called at the end of each update cycle
   */
  updateActivation() {
    const s = this.s;
    if (this.active) {
      this.active = false;
      this.currentActivatedConnecions = 0;
    } else {
      if (this.currentActivatedConnecions >= this.maxIngoingConnections) {
        this.active = true;
        if (this.step >= 0) {
          this.s.props = {...this.s.props, ui: {...this.s.props.ui,
            lstmStep: this.step}};
        }
        if (this.type === 'gft') {
          s.cellAnim.step = 0;
        } else {
          s.cellAnim.step++;
        }
      }
    }
  }

  /**
   * This function is called if the user has moved the mouse across the
   * canvas and checks if this item is being hovered over
   *
   * @param {number} x the x position of the mouse cursor
   * @param {number} y the y position of the mouse cursor
   */
  mouseMoved(x, y) {
    if (this.s.dist(x, y, this.x, this.y) < this.r/2) {
      this.hover = true;
    } else {
      this.hover = false;
    }
    if (this.type === 'gft' || this.type === 'glt') {
      this.hover = false;
    }
    for (const c of this.connections) {
      c.hover = this.hover;
    }
  }

  /**
   * This function is called when the user clicks on the canvas and checks
   * if the current item is being clicked on
   *
   * @return {boolean} true, if this item is being clicked on
   */
  checkClick() {
    if (this.hover) {
      this.s.clickedItem = this;
      const dialogs = [false, false, false, false, false, false];
      dialogs[this.id] = true;
      this.s.props.actions.updateAppState(
          {...this.s.props.appState, cellDialog: dialogs}
      );
    }
    return this.clicked = this.hover;
  }
}
