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
  s.props = {};
  s.network = [];
  s.plotsRight = [];
  s.lossValues = [];
  s.update = false;
  s.scaleImage = 5;
  s.detail = false;
  s.transition = 0;
  s.transitionSpeed = 7;
  s.clickedBlock = undefined;
  s.bgval = 255;
  s.lstmAnim = true;
  s.currfps = 0;
  s.sideRatioLeft = 0.1;
  s.sideRatioLoss = 0.1;
  s.sideRatioRight = 0.2;
  s.detailRatio = 0.6;
  s.ctrRatio = 0.5;
  s.cellAnimStep = 0;
  s.MAX_CELL_STEPS = 11;
  s.lstmStep = 0;
  s.lstmPred = 0;
  s.ready = false;
  s.setupDone = false;
  s.globalScale = 1;
  s.typography = {
    fontsize: 16,
    fontsizelarge: 20,
    fontsizesmall: 12,
    tooltipoffset: 60,
  };
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
  };

  s.setup = function() {
    const netDiv = document.getElementById('networkDiv');
    const valDiv = document.getElementById('valueDiv');
    s.createCanvas(netDiv.offsetWidth,
        window.innerHeight - valDiv.offsetHeight - 50);
    s.frameRate(60);
    s.textAlign(s.CENTER, s.BOTTOM);
    s.textSize(16);
    // s.drawingContext.setLineDash([5,5])
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
    s.inLeft = 0;
    s.inRight = s.sideWidthLeft;
    s.outLeft = s.width - s.sideWidthRight;
    s.outRight = s.width;
    s.ctrWidth = s.width * s.ctrRatio;
    s.ctrLeft = s.sideWidthLeft;
    s.ctrRight = s.ctrLeft + s.ctrWidth;
    s.ctrMidX = s.ctrLeft + s.ctrWidth/2;
    s.ctrMidY = s.height/2;
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
    s.plotsRight = [];
    for (let i = 0; i < 5; i++) {
      s.plotsRight.push(new Plot(i, 'R', s));
    }
    s.setupDone = true;
    s.updateMemory();
  };

  s.draw = function() {
    s.background(s.palette.bg);
    s.cursor(s.ARROW);
    s.fill(0);
    if (!s.props) {
      return;
    }
    if (s.globalScale !== 1) {
      s.translate(s.mouseX, s.mouseY);
      s.scale(s.globalScale);
      s.translate(-s.mouseX, -s.mouseY);
    }
    if (s.props) {
      const timeDist = s.lstmStep / s.props.training.values * Math.PI;
      const pauseMult = 1 - Math.sin(timeDist);
      s.pause = Math.round((1010 - s.props.ui.speed) / 10 * pauseMult) + 1;
    }
    // if (s.detail && s.props.ui.anim && s.frameCount % s.pause === 0) {
    //  s.cell.update();
    // }
    if (s.detail && s.props.ui.anim && s.frameCount % s.pause === 0) {
      s.cell.update();
    }
    s.drawLoss();
    s.drawPlots();
    s.drawInput();
    s.drawNetwork();
    s.drawCell();
    // draw cell input/output
    s.drawCellPlot();
  };

  s.preload = function() {
    s.receive = s.loadImage('./data/rec_white.png');
    s.add = s.loadImage('./data/save_white.png');
    s.save = s.loadImage('./data/rec_white.png');
    s.forget = s.loadImage('./data/del_white.png');
    s.cellImage = s.loadImage('./data/memory_white.png');
    s.output = s.loadImage('./data/output_white.png');
    s.desc = s.loadImage('./data/desc.png');
    s.recdesc = s.loadImage('./data/rec_desc.png');
    s.adddesc = s.loadImage('./data/add_desc.png');
    s.celdesc = s.loadImage('./data/cel_desc.png');
    s.savdesc = s.loadImage('./data/sav_desc.png');
    s.outdesc = s.loadImage('./data/out_desc.png');
    s.losdesc = s.loadImage('./data/los_desc.png');
  };

  s.updateMemory = (start) => {
    s.ready = (s.props !== undefined && s.setupDone);
    if (!s.ready) {
      return;
    }
    if (!s.props.training.running) {
      s.network = [];
      s.network.push({size: 1, type: 'input'});
      for (let i = 0; i < s.props.network.layers; i++) {
        s.network.push({size: s.props.network.layerSize, type: 'hidden'});
      }
      s.network.push({size: 1, type: 'output'});
      if (s.props.ui.animStep) {
        s.props = {...s.props, ui: {...s.props.ui, animStep: false}};
        s.cell.update();
      }
      if (s.props.training.step) {
        s.lstmStep = 0;
        s.lstmPred = 0;
        s.cellAnimStep = 0;
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
  };

  s.reset = function() {
    s.plotFrame = 0;
    s.plotAnim = false;
    s.netFrame = 0;
    s.lstmStep = 0;
    s.lstmPred = 15;
    s.netAnim = false;
    s.cell.reset();
    s.lossValues = [];
    s.net = new Network(s);
    s.cell = new LSTM(s);
    s.input = new Input(s);
    s.loss = new Loss(s);
    s.cellPlot = new CellPlot(s);
  };

  s.windowResized = function() {
    const netDiv = document.getElementById('networkDiv');
    const valDiv = document.getElementById('valueDiv');
    s.resizeCanvas(netDiv.offsetWidth,
        window.innerHeight - valDiv.offsetHeight - 50);
    s.plotsLeft = [];
    s.plotsRight = [];
    for (let i = 0; i < 5; i++) {
      s.plotsRight.push(new Plot(i, 'R', s));
    }
  };

  s.drawInput = function() {
    s.noStroke();
    s.fill(s.palette.bgIn);
    s.rect(s.inLeft + s.sideWidthLeft / 2, s.height / 2, s.sideWidthLeft,
        s.height);
    s.input.draw();
  };

  s.drawLoss = function() {
    s.noStroke();
    s.loss.draw();
  };

  s.drawPlots = function() {
    s.noStroke();
    s.fill(s.palette.bgOut);
    s.rect(s.outLeft + s.sideWidthRight / 2, s.height / 2, s.sideWidthRight,
        s.height);
    for (const plot of s.plotsRight) {
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
  };

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
    // TODO: combine if statements with cx = cy = 0,
    if (cb) {
      const cx = cb.x + (cb.x - s.width / 2) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.height / 2) * (s.transition / 100);
      s.translate(cx, cy);
    }
    s.scale(s.transition >= 100 ? 1 : s.transition / 100);
    if (cb) {
      const cx = cb.x + (cb.x - s.width / 2) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.height / 2) * (s.transition / 100);
      s.translate(-cx, -cy);
    }
    s.cellAlpha = 255 * s.transition / 100;
    s.cell.draw();
    s.pop();
    s.palette.bgCell.setAlpha(255);
  };

  s.drawCellPlot = function() {
    s.push();
    s.translate(s.cellPlotProps.midX, s.cellPlotProps.midY);
    s.scale(s.transition >= 100 ? 1 : s.transition / 100);
    s.translate(-s.cellPlotProps.midX, -s.cellPlotProps.midY);
    s.cellPlot.draw();
    s.pop();
  };

  s.drawNetwork = function() {
    s.push();
    const cb = s.clickedBlock;
    s.netScale = (100 + s.transition) / 100;
    if (s.clickedBlock) {
      const cx = cb.x + (cb.x - s.width / 2) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.height / 2) * (s.transition / 100);
      s.translate(cx, cy);
    }
    s.scale(s.netScale);
    if (cb) {
      const cx = cb.x + (cb.x - s.width / 2) * (s.transition / 100);
      const cy = cb.y + (cb.y - s.height / 2) * (s.transition / 100);
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
      s.props.actions.updateUI({...s.props.ui, trainingStep: sendTrainStep, netAnim: s.netAnim});
    }
    s.net.draw();
    if (s.update) {
      s.update = false;
    }
    s.pop();
  };

  s.mouseMoved = function() {
    if (!s.ready) {
      return;
    }
    if (s.props.ui.help || s.netAnim) {
      return;
    }
    if (this.detail) {
      s.cell.mouseMoved(s.mouseX, s.mouseY);
    } else {
      // if (s.props.ui.ready) {
      s.net.mouseMoved(s.mouseX, s.mouseY);
      // }
      if (s.input) {
        s.input.mouseMoved(s.mouseX, s.mouseY);
      }
    }
  };

  s.mouseClicked = function() {
    if (!s.ready) {
      return;
    }
    if (s.props.ui.help || s.netAnim) {
      return;
    }
    if (s.mouseX < 0 || s.mouseY < 0 ||
        s.mouseX > s.width || s.mouseY > s.height) {
      return;
    }
    if (s.detail) {
      s.detail = s.cell.checkClick();
      if (!s.detail) {
        s.props.actions.updateUI({...s.props.ui, detail: false});
      }
    } else {
      // if (s.props.ui.ready) {
      s.net.checkClick();
      // }
      s.input.checkClick();
      s.net.mouseMoved(s.mouseX, s.mouseY);
    }
  };

  s.mouseWheel = function(event) {
    if (s.props.ui.help || s.netAnim) {
      return;
    }
    s.globalScale -= event.delta/1000;
    if (s.globalScale > 4) {
      s.globalScale = 4;
    } else if (s.globalScale < 1) {
      s.globalScale = 1;
    }
    return false;
  };
}
