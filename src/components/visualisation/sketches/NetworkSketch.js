import {LSTM} from './model/lstm';
import {Network} from './model/net';
import {Plot} from './model/plot';
import {Input} from './model/input';
import {Loss} from './model/loss';
import {CellPlot} from './model/cellplot';

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
  s.update = false;
  s.scaleImage = 5;
  s.detail = false;
  s.transition = 0;
  s.transitionSpeed = 7;
  s.clickedBlock = undefined;
  s.lstmAnim = true;
  s.currfps = 0;
  s.sideRatioLeft = 0.1;
  s.sideRatioLoss = 0.1;
  s.sideRatioRight = 0.2;
  s.detailRatio = 0.6;
  s.ctrRatio = 0.5;
  s.globalScale = 1;
  s.ready = false;
  s.setupDone = false;
  s.netAnim = {};
  s.mx = 0;
  s.my = 0;

  // the new format of the cell animation values
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
  // some typography values
  s.typography = {
    fontsize: 16,
    fontsizelarge: 20,
    fontsizesmall: 12,
    tooltipoffset: 60,
    titleOffsetRatio: 0.1,
  };
  // the scheme colors related to the global style of the application
  s.colors = {
    white: s.color(255),
    grey: s.color('#9e9e9e'),
    lightgrey: s.color('#eeeeee'),
    darkgrey: s.color('#212121'),
    black: s.color(0),
    bluegrey: s.color('#455a64'),
    lightbluegrey: s.color('#b0bec5'),
    darkbluegrey: s.color('#263238'),
    red: s.color(255, 50, 50),
    cyan: s.color('#00acc1'),
    cyanlight: s.color('#26c6da'),
    cyandark: s.color('#00838f'),
    orange: s.color('#fb8c00'),
    orangelight: s.color('#ffa726'),
    orangedark: s.color('#ef6c00'),
  };
  // the color scheme for the visual component
  s.palette = {
    primary: s.colors.white,
    secondary: s.colors.darkbluegrey,
    contrast: s.colors.lightgrey,
    secondaryContrast: s.colors.bluegrey,
    error: s.colors.red,
    bg: s.colors.white,
    bgNet: s.colors.white,
    bgIn: s.colors.white,
    bgLoss: s.colors.white,
    bgOut: s.colors.white,
    bgCell: s.colors.white,
    bgCellplot: s.colors.white,
    ovPrimary: s.colors.cyan,
    ovSecondary: s.colors.cyandark,
    ovContrast: s.colors.cyanlight,
    cvPrimary: s.colors.orange,
    cvSecondary: s.colors.orangedark,
    cvContrast: s.colors.orangelight,
    tooltipBG: s.colors.darkbluegrey,
    tooltipFG: s.colors.white,
  };

  /**
   * This function is called on the first time the parent component is
   * initialized. It creates a canvas element that is the basis for all
   * drawing commands of the sketch and its submodules.
   */
  s.setup = function() {
    const netDiv = document.getElementById('networkDiv');
    const valDiv = document.getElementById('valueDiv');
    s.cnv = s.createCanvas(netDiv.offsetWidth,
        window.innerHeight - valDiv.offsetHeight - 50);
    s.initialize();
    s.cnv.mouseClicked(s.click);
    s.cnv.mouseMoved(s.move);
    s.updateMemory();
  };

  /**
   * This function is called once per frame. It handles the calling and
   * organisation of all drawing commands and submodules.
   */
  s.draw = function() {
    s.background(s.palette.bg);
    s.cursor(s.ARROW);
    s.fill(0);
    if (!s.props) {
      return;
    }
    // calculating a pause value to control the speed of the animations
    const timeDist = s.cellAnim.inputStep / s.props.training.values * Math.PI;
    const pauseMult = 1 - Math.sin(timeDist);
    s.pause = Math.round(10 * pauseMult) + 1;
    if (s.detail && s.props.ui.anim) {
      s.cell.update(false);
    }
    s.drawLoss();
    s.drawPlots();
    s.drawInput();
    s.drawNetwork();
    s.drawCell();
    s.drawCellPlot();
  };

  /**
   * Prepares all necessary sketch-global values and objects used in the
   * modules to render their components
   */
  s.initialize = function() {
    s.frameRate(60);
    s.textAlign(s.CENTER, s.BOTTOM);
    s.textSize(16);
    s.sideWidthLeft = s.sideRatioLeft * s.width;
    s.sideWidthRight = s.sideRatioRight * s.width;
    s.inProps = {
      left: 0,
      right: s.sideRatioLeft * s.width,
      width: s.sideRatioLeft * s.width,
      midX: s.sideRatioLeft * s.width / 2,
      midY: s.height/2,
      height: s.height,
    };
    s.outProps = {
      left: s.width - s.sideRatioRight * s.width,
      right: s.width,
      midX: s.width - s.sideRatioRight * s.width + (s.sideRatioRight *
          s.width) / 2,
      midY: s.height/2,
      width: s.sideRatioRight * s.width,
      height: s.height,
    };
    s.netProps = {
      left: s.inProps.right,
      right: s.inProps.right + s.width * s.ctrRatio,
      midX: s.sideWidthLeft + s.width * s.ctrRatio * 0.5,
      midY: s.height/2,
      width: s.width * s.ctrRatio,
      height: s.height,
    };
    s.lossProps = {
      left: s.netProps.right,
      right: s.netProps.right + s.width * s.sideRatioLoss,
      midX: s.sideWidthLeft + s.width * s.ctrRatio * 0.5,
      midY: s.height/2,
      width: s.width * s.sideRatioLoss,
      height: s.height,
    };
    s.detailProps = {
      left: 0,
      right: s.width * s.detailRatio,
      midX: s.detailRatio * s.width / 2,
      midY: s.height/2,
      width: s.width * s.detailRatio,
      height: s.height,
      verRatio: 0.7,
      horRatio: 0.55,
    };
    s.cellPlotProps = {
      left: s.detailProps.right,
      right: s.width,
      midX: s.width - s.width * (1 - s.detailRatio) / 2,
      midY: s.height/2,
      width: s.width * (1 - s.detailRatio),
      height: s.height,
      verRatio: 0.6,
      horRatio: 0.9,
    };
    s.net = new Network(s);
    s.cell = new LSTM(s);
    s.input = new Input(s);
    s.loss = new Loss(s);
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
      s.outputPlots.push(new Plot(i, s));
    }
    s.setupDone = true;
  };

  /**
   * This methd is called before the drawing starts and loads some important
   * images used in the sketch
   */
  s.preload = function() {
    s.receive = s.loadImage('./data/rec_black.png');
    s.add = s.loadImage('./data/save_black.png');
    s.save = s.loadImage('./data/rec_black.png');
    s.forget = s.loadImage('./data/del_black.png');
    s.cellImage = s.loadImage('./data/memory_black.png');
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
    s.ready = (s.props !== undefined && s.setupDone);
    if (!s.ready) {
      return;
    }
    if (!s.props.training.running) {
      // keep the network sketch updated while no animation is running
      s.network = [];
      s.network.push({size: 1, type: 'input'});
      for (let i = 0; i < s.props.network.layers; i++) {
        s.network.push({size: s.props.network.layerSize, type: 'hidden'});
      }
      s.network.push({size: 1, type: 'output'});
      if (s.props.ui.animStep) {
        s.props = {...s.props, ui: {...s.props.ui, animStep: false}};
        s.cell.update(true);
      }
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
      if (!s.netAnim) {
        s.net = new Network(s);
      }
    } else {
      s.detail = false;
      s.cell.reset();
    }
    if (s.props.ui.detail !== s.detail) {
      s.detail = s.props.ui.detail;
    }
    if (start) {
      // prepare all values for the upcoming animation
      s.plotFrame = 0;
      s.plotAnim = true;
      s.netFrame = 0;
      s.netAnim = true;
      s.lossValues = [];
      const pred = s.props.ui.data[2].prediction;
      const out = s.props.ui.data[2].chartOutput;
      if (pred) {
        for (let i = 0; i < pred.length; i++) {
          s.lossValues.push(pred[i] - out[i]);
        }
      }
      s.net.start();
      s.props.actions.updateUI({...s.props.ui, netAnim: true});
    }
    s.update = true;
    s.global = s.constants[s.props.appState.language];
    for (let i = 0; i < s.props.ui.trigger.length; i++) {
      if (s.props.ui.trigger[i]) {
        if (i === 0) {
          s.cellAnim.forward = true;
          s.cell.reset();
        } else if (i === 1) {
          s.cellAnim.error = true;
          s.cell.prepareError();
        } else {
          s.cellAnim.back = true;
          s.cell.prepareBackprop();
        }
        s.props.actions.updateUI(
            {...s.props.ui,
              state: [s.cellAnim.forward, s.cellAnim.error, s.cellAnim.back],
              trigger: [false, false, false],
            }
        );
        break;
      }
    }
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
    s.fill(s.palette.bgIn);
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
    s.fill(s.palette.bgOut);
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
    s.palette.bgCell.setAlpha(s.cellAlpha);
    s.fill(s.palette.bgCell);
    s.noStroke();
    s.rect(s.width/2, s.height/2, s.width, s.height);
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
    let cb = s.clickedBlock;
    if (!cb) {
      cb = s.net.layers[1];
    }
    if (cb) {
      const cx = cb.x + (cb.x - s.detailProps.midX) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.detailProps.midY) * (s.transition / 100);
      s.translate(cx, cy);
    }
    s.scale(s.transition >= 100 ? 1 : s.transition / 100);
    if (cb) {
      const cx = cb.x + (cb.x - s.detailProps.midX) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.detailProps.midY) * (s.transition / 100);
      s.translate(-cx, -cy);
    }
    s.cellAlpha = 255 * s.transition / 100;
    s.cell.draw();
    s.pop();
    s.palette.bgCell.setAlpha(255);
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
    const cb = s.clickedBlock;
    s.netScale = (100 + s.transition) / 100;
    // handle correct scaling on zoom transition animation
    if (s.clickedBlock) {
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
    let sendTrainStep = 0;
    if (s.netAnim && s.props.training.running) {
      s.netFrame++;
      if (s.netFrame > s.MAX_NET_FRAMES) {
        s.netAnim = false;
        s.netFrame = 0;
      }
    }
    if (s.netFrame < s.netPredFrames) {
      sendTrainStep = 1;
    } else if (s.netFrame < s.netLossFrames + s.netPredFrames) {
      sendTrainStep = 2;
    } else {
      sendTrainStep = 3;
    }
    if (s.props.training.running &&
        (sendTrainStep !== s.props.ui.trainingStep ||
        s.netAnim !== s.props.ui.netAnim)) {
      s.props.actions.updateUI(
          {...s.props.ui, trainingStep: sendTrainStep, netAnim: s.netAnim}
      );
    }
    s.net.draw();
    if (s.update) {
      s.update = false;
    }
    s.pop();
  };

  /**
   * Handles move events occuring when canvas is in focus
   */
  s.move = function() {
    if (!s.ready) {
      return;
    }
    if (s.props.ui.help || s.netAnim) {
      return;
    }
    s.mx = s.mouseX;
    s.my = s.mouseY;
    if (s.detail) {
      s.cell.mouseMoved(s.mx, s.my);
    } else {
      s.net.mouseMoved(s.mx, s.my);
      if (s.input) {
        s.input.mouseMoved(s.mx, s.my);
      }
    }
  };

  /**
   * Handles click events when canvas is in focus
   */
  s.click = function() {
    if (!s.ready) {
      return;
    }
    if (s.props.ui.help) {
      return;
    }
    if (s.mx < 0 || s.my < 0 ||
        s.mx > s.width || s.my > s.height) {
      return;
    }
    if (s.detail) {
      s.detail = s.cell.checkClick();
      if (!s.detail) {
        s.props.actions.updateUI({...s.props.ui, detail: false});
      }
    } else {
      s.net.checkClick();
      s.input.checkClick();
      s.net.mouseMoved(s.mx, s.my);
    }
  };
}
