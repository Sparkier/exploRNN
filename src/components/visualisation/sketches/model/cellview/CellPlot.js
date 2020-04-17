import {Heading} from '../Heading';
import {drawTextPlot} from './subplots/TextPlot';
import {drawFunctionPlot} from './subplots/FunctionPlot';

/**
 * This class represents the Plot of the Detail View
 */
export class CellPlot {
  /**
   * The constructor function of the class CellPlot
   *
   * @param {object} s the p5 js sketch
   */
  constructor(s) {
    this.s = s;
    this.dataIndex = 2;
    this.plotWidth = s.cellPlotProps.width * s.cellPlotProps.horRatio;
    this.plotHeight = s.cellPlotProps.height * s.cellPlotProps.verRatio;
    if (!s.props) {
      return;
    }
    if (s.props.training.values + s.props.training.predictions === 0) {
      this.stepWidth = 2;
    } else {
      this.total = s.props.training.values + s.props.training.predictions;
      this.stepWidth = this.plotWidth / this.total;
    }
    this.heading = new Heading(this.s, this.s.cellPlotProps.left + 20,
        this.s.height * this.s.typography.titleOffsetRatio / 2, 'cellPlot');
  }

  /**
   * Draw a plot with its specified data
   */
  draw() {
    const s = this.s;
    if (this.s.props.training.inputType === 'Text Data') {
      drawTextPlot.call(this, s);
    } else {
      drawFunctionPlot.call(this, s);
    }
    this.heading.draw(s.global.strings.cellPlotTitle);
  }

  /**
   * A function that gets called if the user moves the mouse over the canvas
   * and sends the trigger to all interactable items on the screen
   *
   * @param {number} x the x position of the mouse cursor
   * @param {number} y the y position of the mouse cursor
   */
  mouseMoved(x, y) {
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
    return this.heading.checkClick();
  }
}
