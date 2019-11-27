import {LSTM} from './model/lstm';
import {Network} from './model/net';
import {Plot} from './model/plot';

/**
 * This function represents the sketch in which the network with user
 * interaction functionality is being drawn
 *
 * @param {object} s the p5.js sketch
 */
export default function(s) {
  s.props = {};
  s.network = [];
  s.plotsLeft = [];
  s.plotsRight = [];
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
  s.sideRatioRight = 0.3;
  s.ctrRatio = 0.5;
  s.lstmStep = 0;
  s.ready = false;

  s.setup = function() {
    const netDiv = document.getElementById('networkDiv');
    const valDiv = document.getElementById('valueDiv');
    s.createCanvas(netDiv.offsetWidth,
        window.innerHeight - valDiv.offsetHeight - 25);
    s.frameRate(60);
    // s.drawingContext.setLineDash([5,5])
    s.sideWidthLeft = s.sideRatioLeft * s.width;
    s.sideWidthRight = s.sideRatioRight * s.width;
    s.inLeft = 0;
    s.inRight = s.sideWidthLeft;
    s.outLeft = s.width - s.sideWidthRight;
    s.outRight = s.width;
    s.ctrWidth = s.width * (1 - (s.sideRatioLeft + s.sideRatioRight));
    s.ctrLeft = s.sideWidthLeft;
    s.ctrRight = s.width - s.sideWidthRight;
    s.ctrMidX = s.ctrLeft + s.ctrWidth/2;
    s.ctrMidY = s.height/2;
    s.net = new Network(s);
    s.cell = new LSTM(s);
    s.pause = 0;
    s.imageMode(s.CENTER);
    s.rectMode(s.CENTER);
    s.plotsLeft = [];
    s.plotsRight = [];
    for (let i = 0; i < 5; i++) {
      s.plotsRight.push(new Plot(i, 'R', s));
    }
  };

  s.draw = function() {
    s.background(255);
    s.cursor(s.ARROW);
    s.fill(0);
    if (!s.props) {
      return;
    }
    if (s.props) {
      s.pause = Math.round((1010 - s.props.ui.speed) / 10);
    }
    if (s.detail && s.props.ui.anim && s.frameCount % s.pause === 0) {
      s.cell.update();
    }
    s.drawNetwork();
    s.drawPlots();
    s.drawCell();
    s.fill(255);
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

  s.updateMemory = () => {
    console.log('UPDATING SKETCH MEMORY');
    s.ready = (s.props !== undefined);
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
      s.net = new Network(s);
      if (s.props.ui.animStep) {
        s.props = {...s.props, ui: {...s.props.ui, animStep: false}};
        s.cell.update();
      }
      if (s.props.training.step) {
        s.lstmStep = 0;
      }
      // s.cell = new LSTM(s);
    } else {
      s.detail = false;
      console.log('HELP, WHY IS THIS NOT WORKING');
      s.cell.reset();
    }
    s.update = true;
  };

  s.windowResized = function() {
    const netDiv = document.getElementById('networkDiv');
    const valDiv = document.getElementById('valueDiv');
    s.resizeCanvas(netDiv.offsetWidth,
        window.innerHeight - valDiv.offsetHeight - 25);
    s.plotsLeft = [];
    s.plotsRight = [];
    for (let i = 0; i < 5; i++) {
      s.plotsRight.push(new Plot(i, 'R', s));
    }
  };

  s.drawPlots = function() {
    s.noStroke();
    s.fill(255, 150, 150);
    s.rect(s.inLeft + s.sideWidthLeft / 2, s.height / 2, s.sideWidthLeft, s.height);
    s.rect(s.outLeft + s.sideWidthRight / 2, s.height / 2, s.sideWidthRight, s.height);
    for (const plot of s.plotsRight) {
      plot.draw();
    }
  };

  s.drawCell = function() {
    s.fill(s.bgval, s.cellAlpha);
    s.noStroke();
    s.rect(s.ctrMidX, s.height/2, s.ctrWidth, s.height);
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
    const cb = s.clickedBlock;
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
    s.fill(255);
    if (s.frameCount % 10 === 0) {
      s.currfps = Math.round(s.frameRate());
    }
    s.text(s.currfps + ' fps', 20, 20);
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
    // s.netAlpha = 255 * (100 - s.transition) / 100
    s.netAlpha = 255;
    s.net.draw();
    if (s.update) {
      s.update = false;
    }
    s.pop();
    if (s.frameCount % 10 === 0) {
      s.currfps = Math.round(s.frameRate());
    }
    s.text(s.currfps + ' fps', 20, 20);
  };

  s.mouseMoved = function() {
    if (!s.ready) {
      return;
    }
    if (this.detail) {
      s.cell.mouseMoved(s.mouseX, s.mouseY);
    } else {
      s.net.update(s.mouseX, s.mouseY);
    }
  };

  s.mouseClicked = function() {
    if (!s.ready) {
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
      s.net.checkClick();
    }
  };
}
