import {Heading} from '../Heading';
import {TextPlot} from './subplots/TextPlot';
import {FunctionPlot} from './subplots/FunctionPlot';
import {plotIncomingData} from './subplots/IncomingData';
import {plotDataExplanation} from './subplots/DataExplanation';

/**
 * This class represents the plots of the output side
 * of the network visualisation
 */
export class NetworkPlot {
  /**
   * The constructor function of the class plot
   *
   * @param {object} s the p5 js sketch
   */
  constructor(s) {
    this.s = s;
    this.cx = s.outProps.midX;
    this.cy = s.outProps.midY;
    this.scale = 1 - 0.5 * (Math.abs(s.height/2 - this.cy) / (s.height/2));
    this.plotWidth = s.outProps.width * s.outProps.horRatio;
    this.plotHeight = s.outProps.height * s.outProps.verRatio;
    if (!s.props) {
      return;
    }
    if (s.props.training.values + s.props.training.predictions === 0) {
      this.stepWidth = 2;
    } else {
      this.total = s.props.training.values + s.props.training.predictions;
      this.stepWidth = this.plotWidth / this.total;
    }
    this.heading = new Heading(this.s, this.s.outProps.left + 20,
        this.s.height * this.s.typography.titleOffsetRatio / 2, 'prediction');
    this.textPlot = new TextPlot();
    this.functionPlot = new FunctionPlot();
  }

  /**
   * Draws the heading of the output
   */
  plotHeading() {
    this.heading.draw(this.s.global.strings.headings[2].title);
  }

  /**
   * The drawing function of the plot class, responsible for drawing the plots
   * onto the network canvas
   */
  draw() {
    const s = this.s;
    if (!s.props) {
      return;
    }
    if (s.props.training.values + s.props.training.predictions === 0) {
      this.stepWidth = 2;
    } else {
      this.total = s.props.training.values + s.props.training.predictions;
      this.stepWidth = this.plotWidth / this.total;
    }
    this.in = s.props.training.values;
    this.out = s.props.training.predictions;
    this.total = this.in + this.out;
    this.halfW = this.plotWidth / 2;
    this.halfH = this.plotHeight / 2;
    if (this.stepWidth === 2 && this.total !== 0) {
      this.stepWidth = this.plotWidth / this.total;
    }
    if (this.s.props.training.inputType === 'Text Data') {
      plotIncomingData('text', s, this.halfH);
      this.plotHeading();
      this.textPlot.drawTextPlot.call(this, s);
      plotDataExplanation('text', s, this.halfH);
    } else {
      plotIncomingData('function', s, this.halfH);
      this.plotHeading();
      this.functionPlot.drawFunctionPlot.call(this, s);
      plotDataExplanation('function', s, this.halfH);
    }
  }

  /**
   * This function is being called by the p5 sketch if the user has moved
   * the cursor across the canvas and then updates the network accordingly
   *
   * @param {number} x the x position of the mouse cursor
   * @param {number} y the y position of the mouse cursor
   */
  mouseMoved(x, y) {
    this.heading.mouseMoved(x, y);
  }

  /**
   * This function is being called when the user clicks on the canvas
   */
  checkClick() {
    this.heading.checkClick();
  }
}
