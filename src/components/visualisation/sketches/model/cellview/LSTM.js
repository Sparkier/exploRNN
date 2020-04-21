import {Heading} from '../Heading';
import {Connection} from './elements/Connection';
import {Item} from './elements/Item';

/**
 * This class represents the model for a LSTM cell in the sketch canvas
 * of the network
 *
 * An idea for future work could be outsourcing the cell structure to a json
 * file and writing a generation and parsing logic to handle different
 * RNN structures more efficiently
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
    this.items.push(this.receive = new Item(cell, 'rec', 1, 1, 2, 0, 0));
    this.items.push(this.add = new Item(cell, 'add', 2, 1, 1, 2, 1));
    this.items.push(this.save = new Item(cell, 'sav', 3, 1, 2, 2, 4));
    this.items.push(this.forget = new Item(cell, 'los', 4, 1, 2, 1, 2));
    this.items.push(this.output = new Item(cell, 'out', 5, 1, 2, 3, 3));
    this.items.push(this.cell = new Item(cell, 'cel', 3, 2, 1, 2, 5));
    this.items.push(this.crossInput = new Item(cell, 'crs', 2, 0.5, 1, -1));
    this.items.push(this.crossForget = new Item(cell, 'crs', 4, 0.5, 1, -1));
    this.items.push(this.crossOutput = new Item(cell, 'crs', 5, 0.5, 1, -1));
    this.items.push(this.crossCell = new Item(cell, 'crs', 4.5, 1, 1, -1));
    this.items.push(this.ghostFirst = new Item(cell, 'gft', -1, 1, 1, 0));
    this.items.push(this.ghostLast = new Item(cell, 'glt', 7, 1, 1, 0));

    // setting up the connections between the lstm cell items
    this.connections.push(this.ghostInput = new Connection([
      {x: this.ghostFirst.x, y: this.ghostFirst.y},
      {x: this.receive.x, y: this.receive.y}], [this.receive], s));
    this.connections.push(this.bus = new Connection([
      {x: this.receive.x, y: this.receive.y},
      {x: this.receive.x, y: this.crossOutput.y},
      {x: this.crossOutput.x, y: this.crossOutput.y}], [], s));
    this.connections.push(this.toInput = new Connection([
      {x: this.crossInput.x, y: this.crossInput.y},
      {x: this.add.x, y: this.add.y}], [this.add], s));
    this.connections.push(this.toForget = new Connection([
      {x: this.crossForget.x, y: this.crossForget.y},
      {x: this.forget.x, y: this.forget.y}], [this.forget], s));
    this.connections.push(this.toOutput = new Connection([
      {x: this.crossOutput.x, y: this.crossOutput.y},
      {x: this.output.x, y: this.output.y}], [this.output], s));
    this.connections.push(this.addToSave = new Connection([
      {x: this.add.x, y: this.add.y},
      {x: this.save.x, y: this.save.y}], [this.save], s));
    this.connections.push(this.forgetToSave = new Connection([
      {x: this.forget.x, y: this.forget.y},
      {x: this.save.x, y: this.save.y}], [this.save], s));
    this.connections.push(this.saveToCell = new Connection([
      {x: this.save.x, y: this.save.y},
      {x: this.cell.x, y: this.cell.y}], [this.cell], s));
    this.connections.push(this.cellOut = new Connection([
      {x: this.cell.x, y: this.cell.y},
      {x: this.crossCell.x, y: this.cell.y},
      {x: this.crossCell.x, y: this.crossCell.y}], [], s));
    this.connections.push(this.cellToForget = new Connection([
      {x: this.crossCell.x, y: this.crossCell.y},
      {x: this.forget.x, y: this.forget.y}], [this.forget], s));
    this.connections.push(this.cellToOutput = new Connection([
      {x: this.crossCell.x, y: this.crossCell.y},
      {x: this.output.x, y: this.output.y}], [this.output], s));
    this.connections.push(this.recurrent = new Connection([
      {x: this.output.x, y: this.output.y},
      {x: this.output.x, y: top + 2.5 * verBuf},
      {x: this.receive.x, y: top + 2.5 * verBuf},
      {x: this.receive.x, y: this.receive.y}], [this.receive], s));
    this.connections.push(this.ghostOutput = new Connection([
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

    // activating some items to start off the animation sequence
    this.ghostFirst.addActiveInput();
    this.recurrent.addActiveInput();
    this.forget.addActiveInput();

    this.heading = new Heading(this.s, this.s.detailProps.left + 20,
        this.s.height * this.s.typography.titleOffsetRatio / 2, 'cell');
  }

  /**
   * The drawing function of the lstm model that gets called every frame
   * the lstm cell should be visible on the p5 sketch canvas
   */
  draw() {
    const s = this.s;
    s.rectMode(s.CENTER);
    s.fill(s.colors.darkgrey);
    s.rect(s.detailProps.midX, s.detailProps.midY,
        s.detailProps.width * s.detailProps.horRatio,
        s.detailProps.height * s.detailProps.verRatio, 10);
    for (const c of this.connections) {
      c.draw();
    }
    for (const i of this.items) {
      i.draw();
    }
    this.heading.draw(s.global.strings.cellTitle);
  }

  /**
   * This function sends an update trigger to all items and connections
   * to check if one of them needs to forward their activation
   *
   * @param {boolean} forced true, if the update should be done independently
   * from the framecount
   */
  update(forced) {
    const s = this.s;
    if (s.cellAnim.forward) {
      s.cellAnim.frame++;
    }
    if (s.cellAnim.forward && (s.cellAnim.frame % s.pause === 0 || forced)) {
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
    } else if (s.cellAnim.error && (s.frameCount % 2 === 0 || forced)) {
      // animate error calculation
      s.cellAnim.errorStep++;
      if (s.cellAnim.errorStep >= this.s.cellAnim.maxErrorSteps) {
        s.cellAnim.errorStep = 0;
        s.cellAnim.error = false;
        s.cellAnim.back = true;
        this.showBackStep(0);
        this.s.props = {...this.s.props, ui: {...this.s.props.ui,
          state: [false, false, true]}};
      }
    } else if (s.cellAnim.back && (s.frameCount % 5 === 0 || forced)) {
      // animate BPTT
      s.cellAnim.backStep++;
      this.showBackStep(s.cellAnim.backStep);
      if (s.cellAnim.backStep > s.cellAnim.maxBackSteps) {
        s.cellAnim.backStep = 0;
        s.cellAnim.back = false;
        this.s.props = {
          ...this.s.props,
          ui: {
            ...this.s.props.ui,
            state: [true, false, false],
          },
        };
        this.s.props.actions.updateTraining(
            {...this.s.props.training, step: true}
        );
      }
    }
    this.s.props.actions.updateUI({...this.s.props.ui});
  }

  /**
   * Since activations can currently only be sent in one direction the
   * backpropagation has to be worked around. This function determines for
   * the current backprop step which elements/data flow lines have to be
   * active to create the right animation.
   *
   * @param {number} step the current step in the backprop animation
   */
  showBackStep(step) {
    for (const c of this.connections) {
      c.deactivate();
    }
    for (const i of this.items) {
      i.deactivate();
    }
    // special cases
    if (step === 0) {
      this.ghostLast.addNegativeInput();
      return;
    }
    if (step === 1) {
      this.ghostOutput.addNegativeInput();
      return;
    }
    if (step === 2) {
      this.output.addNegativeInput();
      return;
    }
    if (step === 3) {
      this.cellOut.addNegativeInput();
      this.cellToOutput.addNegativeInput();
      this.crossCell.addNegativeInput();
      this.toOutput.addNegativeInput();
      return;
    }
    if (step === this.s.cellAnim.maxBackSteps) {
      this.ghostFirst.addNegativeInput();
      return;
    }
    step -= 2;
    // the bptt animation logic
    switch (step % 12) {
      case 0:
        this.output.addNegativeInput();
        this.ghostFirst.addNegativeInput();
        this.forget.addNegativeInput();
        break;
      case 1:
        this.cellOut.addNegativeInput();
        this.cellToOutput.addNegativeInput();
        this.cellToForget.addNegativeInput();
        this.crossCell.addNegativeInput();
        this.toOutput.addNegativeInput();
        break;
      case 2:
        this.cell.addNegativeInput();
        this.crossOutput.addNegativeInput();
        break;
      case 3:
        this.saveToCell.addNegativeInput();
        this.crossOutput.addNegativeInput();
        break;
      case 4:
        this.save.addNegativeInput();
        this.crossOutput.addNegativeInput();
        break;
      case 5:
        this.addToSave.addNegativeInput();
        this.forgetToSave.addNegativeInput();
        this.crossOutput.addNegativeInput();
        break;
      case 6:
        this.add.addNegativeInput();
        this.forget.addNegativeInput();
        this.crossOutput.addNegativeInput();
        break;
      case 7:
        if (this.s.cellAnim.maxBackSteps - 12 > step) {
          this.forget.addNegativeInput();
        }
        this.toInput.addNegativeInput();
        this.toForget.addNegativeInput();
        this.crossOutput.addNegativeInput();
        break;
      case 8:
        if (this.s.cellAnim.maxBackSteps - 12 > step) {
          this.forget.addNegativeInput();
        }
        this.crossOutput.addNegativeInput();
        this.crossInput.addNegativeInput();
        this.crossForget.addNegativeInput();
        break;
      case 9:
        if (this.s.cellAnim.maxBackSteps - 12 > step) {
          this.forget.addNegativeInput();
        }
        this.bus.addNegativeInput();
        break;
      case 10:
        this.receive.addNegativeInput();
        if (this.s.cellAnim.maxBackSteps - 12 > step) {
          this.forget.addNegativeInput();
        }
        break;
      case 11:
        if (this.s.cellAnim.maxBackSteps - 12 > step) {
          this.forget.addNegativeInput();
          this.recurrent.addNegativeInput();
        }
        this.ghostInput.addNegativeInput();
        break;
      default:
    }
  }

  /**
   * Resets the animation object with the necessary values to then animate
   * the backpropagation
   */
  prepareBackprop() {
    const s = this.s;
    s.cellAnim = {
      maxSteps: 11,
      maxErrorSteps: 50,
      maxBackSteps: 62,
      step: 0,
      frame: 0,
      inputStep: 0,
      predictionStep: 0,
      errorStep: 0,
      backStep: 0,
      forward: false,
      error: false,
      back: true,
    };
    s.pause = 10;
    this.showBackStep(0);
  }

  /**
   * Resets the animation object with the necessary values to then animate
   * the error calculation
   */
  prepareError() {
    const s = this.s;
    s.cellAnim = {
      maxSteps: 11,
      maxErrorSteps: 50,
      maxBackSteps: 62,
      step: 0,
      frame: 0,
      inputStep: 0,
      predictionStep: 0,
      errorStep: 0,
      backStep: 0,
      forward: false,
      error: true,
      back: false,
    };
    s.pause = 1;
    for (const c of this.connections) {
      c.deactivate();
    }
    for (const i of this.items) {
      i.deactivate();
    }
    for (const c of this.connections) {
      c.updateActivation();
    }
    for (const i of this.items) {
      i.updateActivation();
    }
  }

  /**
   * Resets all activations to 0 and sets the starting items to 1
   */
  reset() {
    const s = this.s;
    s.cellAnim = {
      maxSteps: 11,
      maxErrorSteps: 50,
      maxBackSteps: 62,
      step: 0,
      frame: 0,
      inputStep: 0,
      predictionStep: 0,
      errorStep: 0,
      backStep: 0,
      forward: true,
      error: false,
      back: false,
    };
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
    this.heading.mouseMoved(x, y);
  }

  /**
   * This function gets called if the user has clicked on the screen, it
   * then checks if the user has clicked on an interactable item and if so
   * activates the according following functions
   *
   * @return {boolean} true, if the user has clicked on an item
   */
  checkClick() {
    let ret = false;
    const s = this.s;
    if (s.clickedItem) {
      s.clickedItem = undefined;
    }
    for (const i of this.items) {
      ret = i.checkClick() || ret;
    }
    if (!ret) {
      s.clickedItem = undefined;
    }
    ret = this.heading.checkClick() || ret;
    return ret;
  }
}
