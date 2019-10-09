import {LSTM} from "./network/lstm";
import {Network} from "./network/net";

export default function (s) {
    s.props = {}
    s.network = []

    s.values = 63; // Only temporary, use props instead
    s.predictions = 20; // Only temporary, use props instead
    s.update = false;
    s.scaleImage = 5;
    s.detail = false;
    s.transition = 0;
    s.transitionSpeed = 7;
    s.clickedNode = undefined;
    s.bgval = 45;
    s.lstmAnim = true;
   
    s.setup = function() {
        s.createCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight - document.getElementById("valueDiv").offsetHeight - 50)
        s.frameRate(60)
        s.net = new Network(s);
        s.cell = new LSTM(s);
        s.imageMode(s.CENTER)
        s.rectMode(s.CENTER)
    }

    s.draw = function() {
        s.background(s.bgval)
        if(s.detail && s.lstmAnim && s.frameCount % 40 === 0) {
            s.cell.update();
        }
        s.drawNetwork();
        s.drawCell();
        s.fill(255)
    }

    s.preload = function() {
        s.img_input = s.loadImage('./data/input_basic.png');
        s.img_lstm = s.loadImage('./data/lstm_block.png');
        s.img_output = s.loadImage('./data/output_basic.png');
        s.receive = s.loadImage('./data/receive.png');
        s.add = s.loadImage('./data/add.png');
        s.save = s.loadImage('./data/save.png');
        s.forget = s.loadImage('./data/remove.png');
        s.cellImage = s.loadImage('./data/memory.png');
        s.output = s.loadImage('./data/output.png');
    }

    s.updateMemory = () => {
        if(!s.props.training.running) {
            s.network = [];
            s.network.push({size: 1, type: 'input'});
            for(let i = 0; i < s.props.network.layers; i++) {
                s.network.push({size: s.props.network.layerSize, type: 'hidden'});
            }
            s.network.push({size: 1, type: 'output'});
            s.net = new Network(s);
        } else {
            s.detail = false;
        }
        
       s.update = true;
    }

    s.windowResized = function(){
        s.resizeCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight - document.getElementById("valueDiv").offsetHeight)
    }
        
    s.drawCell = function() { 
        s.fill(s.bgval, s.cellAlpha);
        s.noStroke();
        s.rect(s.width/2, s.height/2,s.width,s.height);
        if(s.detail) {
            if(s.transition < 100) {
                s.transition += s.transitionSpeed
            }
        } else {
            if(s.transition > 0) {
                s.transition -= s.transitionSpeed
            }
        }
        s.push();
        if(s.clickedNode){
            let cx = s.clickedNode.x + (s.clickedNode.x - s.width / 2) * (s.transition / 100)
            let cy = s.clickedNode.y + (s.clickedNode.y - s.height / 2) * (s.transition / 100)
            s.translate(cx, cy)
        }
        s.scale(s.transition / 100);
        if(s.clickedNode){
            let cx = s.clickedNode.x + (s.clickedNode.x - s.width / 2) * (s.transition / 100)
            let cy = s.clickedNode.y + (s.clickedNode.y - s.height / 2) * (s.transition / 100)
            s.translate(-cx, -cy)
        }
        s.cellAlpha = 255 * s.transition / 100 
        s.cell.draw();
        s.pop();
    }

    s.drawNetwork = function() {
        s.push();
        s.netScale = (100 +  s.transition) / 100
        if(s.clickedNode){
            let cx = s.clickedNode.x + (s.clickedNode.x - s.width / 2) * (s.transition / 100)
            let cy = s.clickedNode.y + (s.clickedNode.y - s.height / 2) * (s.transition / 100)
            s.translate(cx, cy)
        }
        s.scale(s.netScale);
        if(s.clickedNode){
            let cx = s.clickedNode.x + (s.clickedNode.x - s.width / 2) * (s.transition / 100)
            let cy = s.clickedNode.y + (s.clickedNode.y - s.height / 2) * (s.transition / 100)
            s.translate(-cx, -cy)
        } 
        // s.netAlpha = 255 * (100 - s.transition) / 100
        s.netAlpha = 255; 
        s.net.draw();
        if(s.update) {
            s.update = false;
        }
        s.pop();
    }

    s.mouseMoved = function() {
        s.net.update(s.mouseX, s.mouseY);
    }

    s.mouseClicked = function() {
        if(s.mouseX < 0 || s.mouseY < 0 || s.mouseX > s.width || s.mouseY > s.height)  {
            return;
        }
        if(s.detail) {
            s.detail = false;
        } else {
            s.net.checkClick();
        }   
    } 

}