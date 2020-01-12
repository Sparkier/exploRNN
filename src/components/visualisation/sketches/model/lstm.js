/**
 * This class represents the model for a LSTM cell in the sketch canvas
 * of the network
 */
export class LSTM {
  /**
   * This is the constructor for the LSTM cell model, initialising all
   * components and connections within the cell
   *
   * @param {object} s the p5 sketch
   * @param {boolean} hasPrev true, if this LSTM layer has a previous layer
   * @param {boolean} hasNext true, if this LSTM layer has a next layer
   */
  constructor(s, hasPrev, hasNext) {
    // defining general global values
    this.s = s;
    this.items = [];
    this.connections = [];
    this.hasPrev = hasPrev;
    this.hasNext = hasNext;
    this.height = s.detailProps.height * s.detailProps.verRatio;
    this.width = s.detailProps.width * s.detailProps.horRatio;
    const left = s.detailProps.left +
        ((1 - s.detailProps.horRatio) * s.detailProps.width) / 2;
    const top = ((1 - s.detailProps.verRatio) * s.detailProps.height) / 2;
    const horBuf = (1/6) * this.width;
    const verBuf = (1/3) * this.height;
    s.clickedItem = undefined;
    this.anim = 0;
    this.animMax = 5;
    const cell = {
      s: s,
      hasPrev: hasPrev,
      hasNext: hasNext,
      horBuf: horBuf,
      verBuf: verBuf,
      left: left,
      top: top,
      height: this.height,
      width: this.width,
    };

    // creating the cell components of the lstm cell
    this.items.push(
        this.receive =
          new Item(cell, 'rec', 'Layer Input', 1, 1, 2, 1)
    );
    this.items.push(
        this.add =
          new Item(cell, 'add', 'Input Gate', 2, 1, 1, 2)
    );
    this.items.push(
        this.save =
          new Item(cell, 'sav', 'Cell State Update', 3, 1, 2, 3)
    );
    this.items.push(
        this.forget =
          new Item(cell, 'los', 'Forget Gate', 4, 1, 2, 2)
    );
    this.items.push(
        this.output =
          new Item(cell, 'out', 'Output Gate', 5, 1, 2, 5)
    );
    this.items.push(
        this.cell =
          new Item(cell, 'cel', 'Cell State', 3, 2, 1, 4)
    );
    this.items.push(
        this.crossInput =
          new Item(cell, 'crs', '', 2, 0.5, 1, -1)
    );
    this.items.push(
        this.crossForget =
          new Item(cell, 'crs', '', 4, 0.5, 1, -1)
    );
    this.items.push(
        this.crossOutput =
          new Item(cell, 'crs', '', 5, 0.5, 1, -1)
    );
    this.items.push(
        this.crossCell =
          new Item(cell, 'crs', '', 4.5, 1, 1, -1)
    );
    this.items.push(
        this.ghostFirst =
          new Item(cell, 'gft', '', -1, 1, 1, 0)
    );
    this.items.push(
        this.ghostLast =
          new Item(cell, 'glt', '', 7, 1, 1, 0)
    );

    // setting uo the connections between the lstm cell items
    this.connections.push(
        this.ghostInput =
          new Connection([
            {x: this.ghostFirst.x, y: this.ghostFirst.y},
            {x: this.receive.x, y: this.receive.y}], [this.receive], s));
    this.connections.push(
        this.bus =
          new Connection([
            {x: this.receive.x, y: this.receive.y},
            {x: this.receive.x, y: this.crossOutput.y},
            {x: this.crossOutput.x, y: this.crossOutput.y}], [], s));
    this.connections.push(
        this.toInput =
          new Connection([
            {x: this.crossInput.x, y: this.crossInput.y},
            {x: this.add.x, y: this.add.y}], [this.add], s));
    this.connections.push(
        this.toForget =
          new Connection([
            {x: this.crossForget.x, y: this.crossForget.y},
            {x: this.forget.x, y: this.forget.y}], [this.forget], s));
    this.connections.push(
        this.toOutput =
          new Connection([
            {x: this.crossOutput.x, y: this.crossOutput.y},
            {x: this.output.x, y: this.output.y}], [this.output], s));
    this.connections.push(
        this.addToSave =
          new Connection([
            {x: this.add.x, y: this.add.y},
            {x: this.save.x, y: this.save.y}], [this.save], s));
    this.connections.push(
        this.forgetToSave =
          new Connection([
            {x: this.forget.x, y: this.forget.y},
            {x: this.save.x, y: this.save.y}], [this.save], s));
    this.connections.push(
        this.saveToCell =
          new Connection([
            {x: this.save.x, y: this.save.y},
            {x: this.cell.x, y: this.cell.y}], [this.cell], s));
    this.connections.push(
        this.cellOut =
          new Connection([
            {x: this.cell.x, y: this.cell.y},
            {x: this.crossCell.x, y: this.cell.y},
            {x: this.crossCell.x, y: this.crossCell.y}], [], s));
    this.connections.push(
        this.cellToForget =
          new Connection([
            {x: this.crossCell.x, y: this.crossCell.y},
            {x: this.forget.x, y: this.forget.y}], [this.forget], s));
    this.connections.push(
        this.cellToOutput =
          new Connection([
            {x: this.crossCell.x, y: this.crossCell.y},
            {x: this.output.x, y: this.output.y}], [this.output], s));
    this.connections.push(
        this.recurrent =
          new Connection([
            {x: this.output.x, y: this.output.y},
            {x: this.output.x, y: top + 2.5 * verBuf},
            {x: this.receive.x, y: top + 2.5 * verBuf},
            {x: this.receive.x, y: this.receive.y}], [this.receive], s));

    this.connections.push(
        this.ghostOutput =
          new Connection([
            {x: this.output.x, y: this.output.y},
            {x: this.ghostLast.x, y: this.ghostLast.y}], [this.ghostLast], s));

    // defining which items have which outgoing connections
    this.ghostFirst.connections.push(this.ghostInput);
    this.receive.connections.push(this.bus);
    this.receive.connections.push(this.crossInput);
    this.receive.connections.push(this.crossForget);
    this.receive.connections.push(this.crossOutput);
    this.receive.connections.push(this.toInput);
    this.receive.connections.push(this.toForget);
    this.receive.connections.push(this.toOutput);
    this.add.connections.push(this.addToSave);
    this.save.connections.push(this.saveToCell);
    this.forget.connections.push(this.forgetToSave);
    this.cell.connections.push(this.cellOut);
    this.cell.connections.push(this.crossCell);
    this.cell.connections.push(this.cellToForget);
    this.cell.connections.push(this.cellToOutput);
    this.output.connections.push(this.ghostOutput);
    this.output.connections.push(this.recurrent);
    this.ghostLast.connections.push(this.ghostFirst);

    // activating some items to start of the animation sequence
    this.ghostFirst.addActiveInput();
    this.recurrent.addActiveInput();
    this.forget.addActiveInput();
  }

  /**
   * the drawing function of the lstm model that gets called every frame
   * the lstm cell should be visible on the p5 sketch canvas
   */
  draw() {
    const s = this.s;
    s.rectMode(s.CENTER);
    s.fill(s.colors.white);
    s.stroke(s.colors.lightgrey);
    s.strokeWeight(15);
    s.rect(s.detailProps.midX, s.detailProps.midY,
        s.detailProps.width * s.detailProps.horRatio,
        s.detailProps.height * s.detailProps.verRatio, 20);
    for (const c of this.connections) {
      c.draw();
    }
    for (const i of this.items) {
      i.draw();
    }
    if (s.clickedItem) {
      this.anim++;
      if (this.anim >= this.animMax) {
        this.anim = this.animMax;
      }
      s.tint(255, 245);
      let img = undefined;
      switch (s.clickedItem.type) {
        case 'rec':
          img = s.recdesc;
          break;
        case 'add':
          img = s.adddesc;
          break;
        case 'sav':
          img = s.savdesc;
          break;
        case 'los':
          img = s.losdesc;
          break;
        case 'cel':
          img = s.celdesc;
          break;
        case 'out':
          img = s.outdesc;
          break;
        default:
      }
      if (!img) {
        return;
      }
      const ratio = img.width / img.height;
      const newW = s.width * 0.5 * (this.anim/this.animMax);
      const newH = newW / ratio;
      const newX = s.clickedItem.x;
      const newY = s.clickedItem.y;
      s.image(img, newX, newY, newW, newH);
    } else {
      this.anim = 0;
    }
  }

  /**
   * This functions sends an update trigger to all items and connections
   * to check if one of them needs to forward their activation
   */
  update() {
    for (const c of this.connections) {
      c.sendActivations();
    }
    for (const i of this.items) {
      i.sendActivations();
    }
    for (const c of this.connections) {
      c.updateActivation();
    }
    for (const i of this.items) {
      i.updateActivation();
    }
    this.s.props.actions.updateUI({...this.s.props.ui});
  }

  /**
   * Resets all activations to 0 and sets the starting items to 1
   */
  reset() {
    this.s.lstmStep = 0;
    this.s.lstmPred = 0;
    for (const c of this.connections) {
      c.deactivate();
    }
    for (const i of this.items) {
      i.deactivate();
    }
    // activating some items to start of the animation sequence
    this.ghostFirst.addActiveInput();
    this.recurrent.addActiveInput();
    this.forget.addActiveInput();
    for (const c of this.connections) {
      c.updateActivation();
    }
    for (const i of this.items) {
      i.updateActivation();
    }
  }

  /**
   * A function that gets called if the user moves the mouse over the canvas
   * and sends the trigger to all interactable items on the screen
   *
   * @param {number} x the x position of the mouse cursor
   * @param {number} y the y position of the mouse cursor
   */
  mouseMoved(x, y) {
    for (const i of this.items) {
      i.mouseMoved(x, y);
    }
  }

  /**
   * This function gets called if the user has clicked on the screen, it
   * then looks if the user has clicked on an interactable item and if so
   * activates the according following functions
   *
   * @return {boolean} true, if the user has clicked on an item
   */
  checkClick() {
    let ret = false;
    const s = this.s;
    if (s.clickedItem) {
      s.clickedItem = undefined;
      ret = true;
    }
    for (const i of this.items) {
      ret = i.checkClick() || ret;
    }
    if (!ret) {
      s.clickedItem = undefined;
    }
    return ret;
  }
}

/**
 * This class represents a connection between two or more items
 * in the lstm cell model
 */
class Connection {
  /**
   * The constructor function of the connection
   *
   * @param {array} verts the vertices of the connection line
   * @param {Item} goesTo the item this connection connects to
   * @param {object} s the p5 sketch
   */
  constructor(verts, goesTo, s) {
    this.verts = verts;
    this.next = goesTo;
    this.s = s;
    this.active = false;
    this.hover = false;
    this.activeInputs = 0;
  }

  /**
   * the drawing function of connection class, responsible for drawing
   * the connection line according to the set values
   */
  draw() {
    const s = this.s;
    s.noFill();
    s.stroke(54);
    s.strokeWeight(1);
    if (this.active) {
      s.stroke(s.colors.orange);
      s.strokeWeight(4);
      s.drawingContext.lineDashOffset = -s.frameCount/2;
      s.drawingContext.setLineDash([10, 10]);
    }
    if (this.hover) {
      s.stroke(s.colors.cyan);
      s.drawingContext.lineDashOffset = -s.frameCount/2;
      s.drawingContext.setLineDash([10, 10]);
    }
    s.beginShape();
    for (const v of this.verts) {
      s.vertex(v.x, v.y);
    }
    s.endShape();
    s.drawingContext.setLineDash([]);
    this.s.fill(0);
  }

  /**
   * Increases the amount of active inputs, since connections only can
   * have one active input this function is equal to setting the connection
   * to active
   */
  addActiveInput() {
    this.activeInputs += 1;
  }

  /**
   * Removes the current activations
   */
  deactivate() {
    this.active = false;
    this.activeInputs = 0;
  }

  /**
   * If this current connection is active it will activate all following
   * items, meaning all items this connection connects to
   */
  sendActivations() {
    if (this.active && this.next && this.next.length > 0) {
      for (const n of this.next) {
        n.addActiveInput();
      }
    }
  }

  /**
   * this function is responsible for always keeping the activation status
   * of this connection up to date, getting called at the end of each updating
   * cycle to make sure no connection stays active/inactive when it
   * shouldn't be
   */
  updateActivation() {
    if (this.active) {
      this.active = false;
      this.activeInputs = 0;
    } else {
      if (this.activeInputs !== 0) {
        this.active = true;
      }
    }
  }
}

/**
 * This class represents all the items in a lstm cell model
 */
class Item {
  /**
   * The constructor function of the item class
   *
   * @param {object} cell the constant cell values
   * @param {string} type the item type represented as a string
   * @param {string} name the name to be displayed when hovering over this item
   * @param {number} x realtive x position of this item
   * @param {number} y the relative y position of this item
   * @param {number} ingoing the amount of ingoing connections
   * @param {number} step the corresponding description step
   */
  constructor(cell, type, name, x, y, ingoing, step) {
    this.type = type;
    this.name = name;
    this.cell = cell;
    this.x = cell.left + x * cell.horBuf;
    this.y = cell.top + y * cell.verBuf;
    this.s = cell.s;
    this.step = step;
    this.hover = false;
    this.clicked = false;
    this.active = false;
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
    if (this.active) {
      size = this.r * 1.2;
      imgSize = 0.6 * this.r * 1.2;
    }
    this.s.fill(54);
    this.s.noStroke();
    if (this.active) {
      s.fill(s.colors.orange);
    } else if (this.currentActivatedConnecions !== 0) {
      s.fill(s.colors.orange);
    }
    if (this.hover && !this.clicked &&
        !(this.type === 'fst' || this.type === 'lst' || this.type === 'crs' ||
        this.type === 'gft' || this.type === 'glst')) {
      s.fill(s.colors.cyan);
      s.cursor(s.HAND);
    }
    const layer = s.clickedBlock;
    const hasPrev = layer ? (layer.i !== 1) : false;
    const hasNext = layer ? (layer.i !== layer.layers) : false;
    if ((this.type === 'gft' && hasPrev) ||
        (this.type === 'glt' && hasNext)) {
      const w = 0.05 * s.width;
      const h = 0.8 * w;
      s.fill(0, 100);
      s.noStroke();
      s.rect(this.x+5, this.y+5, w, h);
      s.strokeWeight(2);
      s.fill(250, this.s.netAlpha);
      if (s.props.training.running) {
        s.stroke(s.colors.white, this.s.netAlpha);
      } else {
        s.stroke(s.colors.white, this.s.netAlpha);
      }
      if (this.hover) {
        s.stroke(100, this.s.netAlpha);
        s.cursor(s.HAND);
      }
      s.rect(this.x, this.y, w, h);
      s.noStroke();
      if (this.active) {
        s.fill(s.colors.orange, this.s.netAlpha);
      } else {
        s.fill(s.colors.white, this.s.netAlpha);
      }
      s.strokeWeight(2);
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
    if (this.hover && !this.clicked &&
        !(this.type === 'fst' || this.type === 'lst' || this.type === 'crs' ||
        this.type === 'gft' || this.type === 'glt')) {
      s.textAlign(s.CENTER, s.CENTER);
      s.fill(0, 150);
      s.rect(s.mouseX, s.mouseY+40, 100, 30);
      s.fill(255);
      s.text(this.name, s.mouseX, s.mouseY + 40);
    }
  }

  /**
   * this function increases the amount of active inputs by one, if the
   * maximum amount of input activtaions is reached this item will fire
   * an activation trigger in the next update cycle
   */
  addActiveInput() {
    this.currentActivatedConnecions += 1;
  }

  /**
   * Removes the current activations
   */
  deactivate() {
    this.active = false;
    this.currentActivatedConnecions = 0;
  }

  /**
   * This funtion will send an activation call to all outgoing connections
   * if the item has enough activation inputs
   */
  sendActivations() {
    if (this.active && this.connections && this.connections.length > 0) {
      if (this.type === 'glt') {
        this.s.lstmStep++;
        if (this.s.lstmStep === this.s.props.training.values) {
          this.s.lstmStep = 0;
          this.s.lstmPred++;
          console.log('SEND', this.s.lstmStep, this.s.lstmPred,
              this.s.props.training.predictions);
          if (this.s.lstmPred >= this.s.props.training.predictions) {
            this.s.lstmPred = 0;
            this.s.props.actions.updateTraining(
                {...this.s.props.training, step: true});
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
          this.s.cellAnimStep = 0;
        } else {
          this.s.cellAnimStep++;
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
    }
    return this.clicked = this.hover;
  }
}
