import {LSTM} from "./model/lstm";
import {Network} from "./model/net";

export default function (s) {
    s.props = {}
    s.network = []
    s.update = false;
    s.scaleImage = 5;
    s.detail = false;
    s.transition = 0;
    s.transitionSpeed = 7;
    s.clickedBlock = undefined;
    s.bgval = 65;
    s.lstmAnim = true;
    s.currfps = 0;
   
    s.setup = function() {
        s.createCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight - document.getElementById("valueDiv").offsetHeight - 25)
        s.frameRate(60)
        //s.drawingContext.setLineDash([5,5])
        s.net = new Network(s);
        s.cell = new LSTM(s);
        s.imageMode(s.CENTER)
        s.rectMode(s.CENTER)
    }

    s.draw = function() {
        s.background(255)
        s.cursor(s.ARROW)
        let pause = Math.round((1010 - s.props.training.speed) / 10);
        if(s.detail && s.lstmAnim && s.frameCount % pause === 0) {
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
        s.receive = s.loadImage('./data/rec.png');
        s.add = s.loadImage('./data/save.png');
        s.save = s.loadImage('./data/rec.png');
        s.forget = s.loadImage('./data/del.png');
        s.cellImage = s.loadImage('./data/memory.png');
        s.output = s.loadImage('./data/output.png');
        s.desc = s.loadImage('./data/desc.png');
        s.recdesc = s.loadImage('./data/rec_desc.png');
        s.adddesc = s.loadImage('./data/add_desc.png');
        s.celdesc = s.loadImage('./data/cel_desc.png');
        s.savdesc = s.loadImage('./data/sav_desc.png');
        s.outdesc = s.loadImage('./data/out_desc.png');
        s.losdesc = s.loadImage('./data/los_desc.png');
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
            s.cell = new LSTM(s);
        } else {
            s.detail = false;
        }
        
       s.update = true;
    }

    s.windowResized = function(){
        s.resizeCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight - document.getElementById("valueDiv").offsetHeight - 25)
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

        // TODO: combine if statements with cx = cy = 0,
        if(s.clickedBlock){
            let cx = s.clickedBlock.x + (s.clickedBlock.x - s.width / 2) * (s.transition / 100)
            let cy = s.clickedBlock.y + (s.clickedBlock.y - s.height / 2) * (s.transition / 100)
            s.translate(cx, cy)
        }
        s.scale(s.transition >= 100 ? 1 : s.transition / 100);
        if(s.clickedBlock){
            let cx = s.clickedBlock.x + (s.clickedBlock.x - s.width / 2) * (s.transition / 100)
            let cy = s.clickedBlock.y + (s.clickedBlock.y - s.height / 2) * (s.transition / 100)
            s.translate(-cx, -cy)
        }
        s.cellAlpha = 255 * s.transition / 100 
        s.cell.draw();
        s.pop();
        s.fill(255)
        if(s.frameCount % 10 === 0)
            s.currfps = Math.round(s.frameRate())
        s.text(s.currfps + ' fps', 20,20)
    }

    s.drawNetwork = function() {
        s.push();
        s.netScale = (100 +  s.transition) / 100
        if(s.clickedBlock){
            let cx = s.clickedBlock.x + (s.clickedBlock.x - s.width / 2) * (s.transition / 100)
            let cy = s.clickedBlock.y + (s.clickedBlock.y - s.height / 2) * (s.transition / 100)
            s.translate(cx, cy)
        }
        s.scale(s.netScale);
        if(s.clickedBlock){
            let cx = s.clickedBlock.x + (s.clickedBlock.x - s.width / 2) * (s.transition / 100)
            let cy = s.clickedBlock.y + (s.clickedBlock.y - s.height / 2) * (s.transition / 100)
            s.translate(-cx, -cy)
        } 
        // s.netAlpha = 255 * (100 - s.transition) / 100
        s.netAlpha = 255; 
        s.net.draw();
        if(s.update) {
            s.update = false;
        }
        s.pop();
        if(s.frameCount % 10 === 0)
            s.currfps = Math.round(s.frameRate())
        s.text(s.currfps + ' fps', 20,20)
    }

    s.mouseMoved = function() {
        if(this.detail) {
            s.cell.mouseMoved(s.mouseX, s.mouseY);
        } else {
            s.net.update(s.mouseX, s.mouseY);
        }
    }

    s.mouseClicked = function() {
        if(s.mouseX < 0 || s.mouseY < 0 || s.mouseX > s.width || s.mouseY > s.height)  {
            return;
        }
        if(s.detail) {
            s.detail = s.cell.checkClick();
            if(!s.detail) {
                s.props.actions.updateUI({...s.props.ui, detail: false})
            }
        } else {
            s.net.checkClick();
        }   
    } 

}