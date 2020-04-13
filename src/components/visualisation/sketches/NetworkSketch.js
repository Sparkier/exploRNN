import {LSTM} from './model/cellview/LSTM';
import {Network} from './model/overview/Network';
import {NetworkPlot} from './model/overview/NetworkPlot';
import {Input} from './model/overview/Input';
import {CellPlot} from './model/cellview/CellPlot';

import {getColors} from '../../constants/colors';
import {getCellAnimationValues} from '../../constants/animation';
import {getTypographyDefaults} from '../../constants/typography';

/**
 * This function represents the sketch in which the network with user
 * interaction functionality is being drawn
 *
 * @param {object} s the p5.js sketch
 */
export default function(s) {
  // the basic values needed throughout the drawing logic
  s.props = {};
  s.network = [];
  s.outputPlots = [];
  s.lossValues = [];
  s.constants = {};
  s.scaleImage = 5;
  s.detail = false;
  s.transition = 0;
  s.transitionSpeed = 7;
  s.clickedBlock = undefined;
  s.lstmAnim = true;
  s.currfps = 0;
  s.sideRatioLeft = 0.1;
  s.sideRatioLoss = 0.1;
  s.sideRatioRight = 0.3;
  s.detailRatio = 0.5;
  s.ctrRatio = 0.5;
  s.globalScale = 1;
  s.ready = false;
  s.setupDone = false;
  s.netAnim = {};
  s.mx = 0;
  s.my = 0;

  // the new format of the cell animation values
  s.cellAnim = getCellAnimationValues();
  // some typography values
  s.typography = getTypographyDefaults();
  // the scheme colors related to the global style of the application
  s.colors = getColors(s);

  /**
   * This function is called on the first time the parent component is
   * initialized. It creates a canvas element that is the basis for all
   * drawing commands of the sketch and its submodules.
   */
  s.setup = function() {
    const netDiv = document.getElementById('networkDiv');
    const valDiv = document.getElementById('valueDiv');
    const appDiv = document.getElementById('appDiv');
    const barDiv = document.getElementById('barDiv');
    // Create and initialize the canvas with its draw params
    s.cnv = s.createCanvas(netDiv.offsetWidth,
        appDiv.offsetHeight - valDiv.offsetHeight - barDiv.offsetHeight);
    s.initialize();
    // Register listeners for this canvas on this class
    s.cnv.mouseClicked(s.click);
    s.cnv.mouseMoved(s.move);
    s.updateMemory();
  };

  /**
   * Prepares all necessary sketch-global values and objects used in the
   * modules to render their components
   */
  s.initialize = function() {
    s.frameRate(60);
    s.textAlign(s.CENTER, s.BOTTOM);
    s.textSize(s.typography.fontsize);
    s.sideWidthLeft = s.sideRatioLeft * s.width;
    s.sideWidthRight = s.sideRatioRight * s.width;
    s.inProps = { // Properties for drawing the input to the network
      left: 0,
      right: s.sideRatioLeft * s.width,
      width: s.sideRatioLeft * s.width,
      midX: s.sideRatioLeft * s.width / 2,
      midY: s.height/2,
      height: s.height,
    };
    s.netProps = { // Properties for drawing the network
      left: s.inProps.right,
      right: s.inProps.right + s.width * s.ctrRatio,
      midX: s.sideWidthLeft + s.width * s.ctrRatio * 0.5,
      midY: s.height/2,
      width: s.width * s.ctrRatio,
      height: s.height,
    };
    s.outProps = { // Properties for drawing the output of the network
      left: s.netProps.right,
      right: s.width,
      midX: s.netProps.right + (s.width - s.netProps.right) / 2,
      midY: s.height/2,
      width: s.sideRatioRight * s.width,
      height: s.height,
      verRatio: 0.6,
      horRatio: 0.9,
    };
    s.lossProps = { // Properties for drawing the loss of the network
      left: s.netProps.right,
      right: s.netProps.right + s.width * s.sideRatioLoss,
      midX: s.sideWidthLeft + s.width * s.ctrRatio * 0.5,
      midY: s.height/2,
      width: s.width * s.sideRatioLoss,
      height: s.height,
    };
    s.detailProps = { // Properties for drawing the detail view
      left: 0,
      right: s.width * s.detailRatio,
      midX: s.detailRatio * s.width / 2,
      midY: s.height/2,
      width: s.width * s.detailRatio,
      height: s.height,
      verRatio: 0.7,
      horRatio: 0.55,
    };
    s.cellPlotProps = {// Properties for drawing the cell in the detail view
      left: s.detailProps.right,
      right: s.width,
      midX: s.width - s.width * (1 - s.detailRatio) / 2,
      midY: s.height/2,
      width: s.width * (1 - s.detailRatio),
      height: s.height,
      verRatio: 0.6,
      horRatio: 0.7,
    };
    s.net = new Network(s);
    s.cell = new LSTM(s);
    s.input = new Input(s);
    s.cellPlot = new CellPlot(s);
    s.pause = 0;
    s.netFrame = 0;
    s.netAnim = false;
    s.netPredFrames = 100;
    s.netLossFrames = 50;
    s.netTrainFrames = 100;
    s.MAX_NET_FRAMES = s.netPredFrames + s.netLossFrames + s.netTrainFrames;
    s.plotFrame = 0;
    s.plotAnim = false;
    s.plotMoveFrames = 100;
    s.plotScanFrames = 50;
    s.plotStayFrames = 110;
    s.netPause = s.plotMoveFrames / (s.props.network.layers + 2);
    s.MAX_PLOT_FRAMES = s.plotMoveFrames + s.plotScanFrames + s.plotStayFrames;
    s.imageMode(s.CENTER);
    s.rectMode(s.CENTER);
    s.outputPlots = [];
    for (let i = 0; i < 5; i++) {
      s.outputPlots.push(new NetworkPlot(i, s));
    }
    s.setupDone = true;
  };

  /**
   * This function is called once per frame. It handles the calling and
   * organisation of all drawing commands and submodules.
   */
  s.draw = function() {
    // Reset the canvas
    s.background(s.colors.white);
    s.cursor(s.ARROW);
    s.fill(0);
    // Check if the networksketch was correctly initialized
    if (!s.props) {
      return;
    }
    // Calculating a pause value to control the speed of the animations
    const timeDist = s.cellAnim.inputStep / s.props.training.values * Math.PI;
    const pauseMult = 1 - Math.sin(timeDist);
    s.pause = Math.round(10 * pauseMult) + 1;
    // Check if the application is in detail view and should animate
    if (s.detail && s.props.ui.anim) {
      // Forward the activation of the cell
      s.cell.update(false);
    }
    // Draw the individual components of the network sketch
    s.drawPlots();
    s.drawInput();
    s.drawNetwork();
    s.drawCell();
    s.drawCellPlot();
  };

  /**
   * This methd is called before the drawing starts and loads some important
   * images used in the sketch
   */
  s.preload = function() {
    s.receive = s.loadImage('./data/rec_black.png');
    s.add = s.loadImage('./data/input_black.png');
    s.save = s.loadImage('./data/rec_black.png');
    s.forget = s.loadImage('./data/del_black.png');
    s.cellImage = s.loadImage('./data/save_black.png');
    s.output = s.loadImage('./data/output_black.png');
  };

  /**
   * This function is called by the parent component when a change occurs in
   * the global redux state. All necessary values are updated or reset
   * according to the changes in the overall appication context
   *
   * @param {bool} start true, if the network animation should start
   */
  s.updateMemory = function(start) {
    // Check if the network is ready to be animated and interactive
    s.ready = (s.props !== undefined && s.setupDone);
    if (!s.ready) {
      return;
    }
    // Currently not in training mode
    if (!s.props.training.running) {
      // Add all the network layers
      s.network = [];
      s.network.push({size: 1, type: 'input'});
      for (let i = 0; i < s.props.network.layers; i++) {
        s.network.push({size: s.props.network.layerSize, type: 'hidden'});
      }
      s.network.push({size: 1, type: 'output'});
      // If an animation step should be done, forward the animation
      if (s.props.ui.animStep) {
        s.props = {...s.props, ui: {...s.props.ui, animStep: false}};
        s.cell.update(true);
      }
      // One training step should be done, animation needs to be set back
      if (s.props.training.step) {
        s.cellAnim = {
          maxSteps: 11,
          maxErrorSteps: 20,
          maxBackSteps: 62,
          frame: 0,
          step: 0,
          inputStep: 0,
          predictionStep: 0,
          errorStep: 0,
          backStep: 0,
          forward: true,
          error: false,
          back: false,
        };
      }
      // If the network is currently within an animation, do not reset it
      if (!s.netAnim) {
        s.net = new Network(s);
      }
    // If training, detail view is not on and the cell in detail should reset
    } else {
      s.detail = false;
      s.cell.reset();
    }
    // Detail of props can override p5 detail variable
    if (s.props.ui.detail !== s.detail) {
      s.detail = s.props.ui.detail;
    }
    // Start the animation of the cell for a training step
    if (start) {
      // prepare all values for the upcoming animation
      s.plotFrame = 0;
      s.plotAnim = true;
      s.netFrame = 0;
      s.netAnim = true;
      s.lossValues = [];
      // Get the prediction and ground truth for this training step
      const pred = s.props.ui.data[2].prediction;
      const out = s.props.ui.data[2].chartOutput;
      // If a prediction exists, calculate the loss
      if (pred) {
        for (let i = 0; i < pred.length; i++) {
          s.lossValues.push(pred[i] - out[i]);
        }
      }
      // Start the network animation and update the ui accordingly
      s.net.start();
      s.props.actions.updateUI({...s.props.ui, netAnim: true});
    }
    // Set the language for the UI
    s.global = s.constants[s.props.appState.language];
    // Check where in the training loop we are (forw., loss., backw.)
    for (let i = 0; i < s.props.ui.trigger.length; i++) {
      if (s.props.ui.trigger[i]) {
        // Forward, reset the cell to prepare the forward animation
        if (i === 0) {
          s.cellAnim.forward = true;
          s.cell.reset();
        // Loss, prepare the error calculation
        } else if (i === 1) {
          s.cellAnim.error = true;
          s.cell.prepareError();
        // Backward, prepare the backprop animation
        } else {
          s.cellAnim.back = true;
          s.cell.prepareBackprop();
        }
        // Update the UI to match the training loop progress
        s.props.actions.updateUI(
            {...s.props.ui,
              state: [s.cellAnim.forward, s.cellAnim.error, s.cellAnim.back],
              trigger: [false, false, false],
            }
        );
        break;
      }
    }
    // If one of the Cell explanations are to be shown, check for mouse moves
    if (!s.props.appState.cellDialog.includes(true)) {
      s.move();
    }
  };

  /**
   * Resets the animation values to their ground state to prepare an upcoming
   * animation process or to stop the animation
   */
  s.reset = function() {
    s.plotFrame = 0;
    s.plotAnim = false;
    s.netFrame = 0;
    s.netAnim = false;
    s.lossValues = [];
    s.cellAnim = {
      maxSteps: 11,
      maxErrorSteps: 20,
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
    s.initialize();
  };

  /**
   * This function handles the resetting of all dependent values when the
   * context window is resized
   */
  s.windowResized = function() {
    const netDiv = document.getElementById('networkDiv');
    const valDiv = document.getElementById('valueDiv');
    s.resizeCanvas(netDiv.offsetWidth,
        window.innerHeight - valDiv.offsetHeight - 50);
    if (!s.props.ui.ready) {
      s.props.actions.updateTraining({...s.props.training, step: true});
    }
    s.initialize();
  };

  /**
   * Handles the drawing of the input component of the netview
   */
  s.drawInput = function() {
    s.noStroke();
    s.fill(s.colors.white);
    s.rect(s.inLeft + s.sideWidthLeft / 2, s.height / 2, s.sideWidthLeft,
        s.height);
    s.input.draw();
  };

  /**
   * Handles the drawing of the error plot in the netview
   */
  s.drawLoss = function() {
    s.noStroke();
    s.loss.draw();
  };

  /**
   * Handles the drawing of the output plot(s) in the netview. Since the plot
   * is visualised with a moving in and out animation multiple plots have
   * to be stored and drawn
   */
  s.drawPlots = function() {
    s.push();
    const cb = {x: s.outProps.midX, y: s.outProps.midY};
    s.netScale = (100 + s.transition) / 100;
    const cx = cb.x + (cb.x - s.cellPlotProps.midX) * (s.transition / 100);
    const cy = cb.y + (cb.y - s.cellPlotProps.midY) * (s.transition / 100);
    s.translate(cx, cy);
    s.scale(s.netScale);
    s.translate(-cx, -cy);
    s.noStroke();
    s.fill(s.colors.white);
    s.rect(s.outLeft + s.sideWidthRight / 2, s.height / 2, s.sideWidthRight,
        s.height);
    for (const plot of s.outputPlots) {
      plot.draw();
    }
    if (s.plotAnim && s.props.training.running) {
      s.plotFrame++;
      if (s.plotFrame > s.MAX_PLOT_FRAMES) {
        s.plotAnim = false;
        s.plotFrame = 0;
        s.props.actions.updateUI({...s.props.ui, running: false, ready: true});
      }
    }
    s.pop();
  };

  /**
   * Handles the drawing of the cell in the detail view while also updating the
   * scaling of the drawing canvas to form the zoom animations
   */
  s.drawCell = function() {
    s.colors.white.setAlpha(s.cellAlpha);
    s.fill(s.colors.white);
    s.noStroke();
    s.rect(s.width/2, s.height/2, s.width, s.height);
    // Transition in and out of detail view
    if (s.detail) {
      if (s.transition < 100) {
        s.transition += s.transitionSpeed;
      }
    } else {
      if (s.transition > 0) {
        s.transition -= s.transitionSpeed;
      }
    }
    s.push();
    // Get the layer on which the zoom is to be done
    let cb = s.clickedBlock;
    if (!cb) {
      cb = s.net.layers[1];
    }
    // Get the current zoom state and zoom on the layer
    if (cb) {
      const cx = cb.x + (cb.x - s.detailProps.midX) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.detailProps.midY) * (s.transition / 100);
      s.translate(cx, cy);
    }
    // Scale the view according to the state of the transition
    s.scale(s.transition >= 100 ? 1 : s.transition / 100);
    if (cb) {
      const cx = cb.x + (cb.x - s.detailProps.midX) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.detailProps.midY) * (s.transition / 100);
      s.translate(-cx, -cy);
    }
    // Fade in the cell during the transition
    s.cellAlpha = 255 * s.transition / 100;
    s.cell.draw();
    s.pop();
    s.colors.white.setAlpha(255);
  };

  /**
   * Handles the drawing of the output plot in the detail view
   */
  s.drawCellPlot = function() {
    s.push();
    const cb = {x: s.outProps.midX, y: s.outProps.midY};
    const cx = cb.x + (cb.x - s.cellPlotProps.midX) * (s.transition / 100);
    const cy = cb.y + (cb.y - s.cellPlotProps.midY) * (s.transition / 100);
    s.translate(cx, cy);
    s.scale(s.transition >= 100 ? 1 : s.transition / 100);
    s.translate(-cx, -cy);
    s.cellPlot.draw();
    s.pop();
  };

  /**
   * Handles the drawing of the rnn overview in the net view
   */
  s.drawNetwork = function() {
    s.push();
    // Get the block if to be zoomed on one of those
    const cb = s.clickedBlock;
    s.netScale = (100 + s.transition) / 100;
    // handle correct scaling on zoom transition animation
    if (cb) {
      const cx = cb.x + (cb.x - s.detailProps.midX) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.detailProps.midY) * (s.transition / 100);
      s.translate(cx, cy);
    }
    s.scale(s.netScale);
    if (cb) {
      const cx = cb.x + (cb.x - s.detailProps.midX) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.detailProps.midY) * (s.transition / 100);
      s.translate(-cx, -cy);
    }
    // Training is running, advance the animation
    let sendTrainStep = 0;
    if (s.netAnim && s.props.training.running) {
      s.netFrame++;
      // If the animation has been finished, reset the network visualization
      if (s.netFrame > s.MAX_NET_FRAMES) {
        s.netAnim = false;
        s.netFrame = 0;
      }
    }
    // If we are still in the forward pass
    if (s.netFrame < s.netPredFrames) {
      sendTrainStep = 1;
    // Already in the loss calculation
    } else if (s.netFrame < s.netLossFrames + s.netPredFrames) {
      sendTrainStep = 2;
    // In backprop
    } else {
      sendTrainStep = 3;
    }
    // Update the UI if it does not match the animation progress
    if (s.props.training.running &&
        (sendTrainStep !== s.props.ui.trainingStep ||
        s.netAnim !== s.props.ui.netAnim)) {
      s.props.actions.updateUI(
          {...s.props.ui, trainingStep: sendTrainStep, netAnim: s.netAnim}
      );
    }
    s.net.draw();
    s.pop();
  };

  /**
   * Handles move events occuring when canvas is in focus
   */
  s.move = function() {
    // Only handle move events if p5 is ready
    if (s.ready) {
      // If we are in the help UI, ignore the mousemove events
      if (!s.props.ui.help) {
        s.mx = s.mouseX;
        s.my = s.mouseY;
        // Forward the mousemove events to the correct network view
        if (s.detail) {
          s.cell.mouseMoved(s.mx, s.my);
          s.cellPlot.mouseMoved(s.mx, s.my);
        } else {
          s.net.mouseMoved(s.mx, s.my);
          if (s.input) {
            s.input.mouseMoved(s.mx, s.my);
          }
          for (const plot of s.outputPlots) {
            plot.mouseMoved(s.mx, s.my);
          }
        }
      }
    }
  };

  /**
   * Handles click events when canvas is in focus
   */
  s.click = function() {
    // Only handle move events if p5 is ready
    if (s.ready) {
      // If we are in the help UI, ignore the mouseclick events
      if (!s.props.ui.help) {
        // If the mouse is not inside the canvas, return
        if (s.mx < 0 || s.my < 0 ||
            s.mx > s.width || s.my > s.height) {
          return;
        }
        // Forward the click to the correct network view
        if (s.detail) {
          s.detail = s.cell.checkClick();
          s.detail = s.cellPlot.checkClick() || s.detail;
          if (!s.detail) {
            s.props.actions.updateUI({...s.props.ui, detail: false});
          }
        } else {
          s.net.checkClick();
          s.input.checkClick();
          s.net.mouseMoved(s.mx, s.my);
          for (const plot of s.outputPlots) {
            plot.checkClick();
          }
        }
      }
    }
  };
}
