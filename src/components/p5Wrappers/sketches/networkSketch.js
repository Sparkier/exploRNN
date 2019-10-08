
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

    s.updateMemory = () => {
        if(!s.props.training.running) {
            s.network = [];
            s.network.push({size: 1, type: 'input'});
            for(let i = 0; i < s.props.network.layers; i++) {
                s.network.push({size: s.props.network.layerSize, type: 'hidden'});
            }
            s.network.push({size: 1, type: 'output'});
            s.net = new Network(s);
        }
       s.update = true;
    }

    s.windowResized = function(){
        s.resizeCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight - document.getElementById("valueDiv").offsetHeight)
    }
        
    s.setup = function() {
        s.createCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight - document.getElementById("valueDiv").offsetHeight)
        s.frameRate(60)
        s.net = new Network(s);
        s.imageMode(s.CENTER)
        s.rectMode(s.CENTER)
    }

    s.draw = function() {
        s.background(s.bgval)
        s.drawNetwork(); 
        s.fill(s.bgval, s.cellAlpha);
        s.noStroke();
        s.rect(s.width/2, s.height/2,s.width,s.height);
        s.drawCell();
    }

    s.preload = function() {
        s.img_input = s.loadImage('./data/input_basic.png');
        s.img_lstm = s.loadImage('./data/lstm_block.png');
        s.img_output = s.loadImage('./data/output_basic.png', img => {
            console.log('LODAED')
        });
    }

    s.drawCell = function() {
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
        s.translate(s.width/2, s.height/2)
        // s.scale(s.transition / 100);
        s.cellAlpha = 255 * s.transition / 100 
        s.fill(200, s.cellAlpha);
        s.rect(0,0,200,200);
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

class Network {

    constructor(s) {
        this.s = s;
        this.layers = []
        let layercount = s.network.length
        let nodes = s.network[0]
        this.layers.push(new Layer(s, layercount, -1, nodes));
        for(let i = 1; i < layercount - 1; i++) {
            nodes = s.network[i]
            this.layers.push(new Layer(s, layercount, i - 1, nodes));
        }
        nodes = s.network[layercount-1]
        this.layers.push(new Layer(s, layercount, -1, nodes));
    }

    draw() {
        this.s.strokeWeight(2 * this.s.netScale);
        /*for(let i = 0; i < this.layers.length; i++) {
            for(let j = 0; j < this.layers[i].nodes.length; j++) {
                let from = this.layers[i].nodes[j]
                if(i !== this.layers.length - 1) {
                    this.s.stroke(255, this.s.netAlpha);
                    this.s.noFill();
                    let next = this.layers[i+1].nodes.length
                    for(let k = 0; k < next; k++) {
                        let to = this.layers[i+1].nodes[k]
                        this.s.line(from.x, from.y, to.x, to.y);
                    }
                }   
            }
        }*/
        this.s.stroke(255);
        this.s.noFill();
        this.s.line(0, this.s.height/2, this.s.width, this.s.height/2);
        for(let l of this.layers) {
            l.draw();
        }
    }

    update(x, y) {
        //console.log('UPDATE',x ,y )
        for(let l of this.layers) {
            l.update(x,y)
        }
    }

    checkClick() {
        for(let l of this.layers) {
            l.checkClick()
        }
    }
}

class Layer {

    constructor(s, layers, i, nodes) {
        this.s = s;
        this.i = i;
        this.layers = layers - 1;
        this.layerwidth = nodes.size
        this.nodes = []
        this.layerType = nodes.type;
        for(let j = 0; j < this.layerwidth; j++) {
            this.nodes.push(new Node(s, s.width * (i+1)/(this.layers), s.height * (j + 1)/ (nodes.size+1), 50, nodes.type))
        }
    }

    draw() {
        if(!(this.layerType === 'input' || this.layerType === 'output')) {
            let s = this.s;
            s.fill(255, this.s.netAlpha)
            s.stroke(0, this.s.netAlpha);
            s.rect(s.width * (this.i+1)/(this.layers),s.height/2,80,s.height - 200);
        }
        for(let n of this.nodes) {
            n.draw();
        }
    }

    update(x,y) {
        for(let n of this.nodes) {
            n.update(x,y)
        }
    }

    checkClick() {
        for(let n of this.nodes) {
            n.checkClick()
        }
    }
}

class Node {
    constructor(s, x, y, r, type) {
        this.s = s;
        this.x = x;
        this.y = y;
        this.r = r;
        this.type = type
        this.hover = false;
        this.clicked = false;
        this.label = 'node'
        if(type === 'input')
            this.x = 0
        if(type === 'output')
            this.x = s.width
    }

    draw() {
        let s = this.s
        if(!s.update){
            s.stroke(0, s.netAlpha);
            s.fill(255, s.netAlpha);
        } else {
            s.stroke(0, s.netAlpha);
            s.fill(50,255,150, s.netAlpha);
        }
        if(this.hover) {
            s.stroke(0, s.netAlpha);
            s.fill(250,100,100, s.netAlpha);
        }
        if(this.clicked) {
            switch(this.type) {
                case 'input':
                    break;
                case 'hidden':
                    this.s.ellipse(this.x,this.y,this.r);
                    break;
                case 'output':
                    break;
                default:
            }
        } else {
            switch(this.type) {
                case 'input':
                case 'output':
                    break;
                default:
                    this.s.ellipse(this.x,this.y,this.r);
            }
        }

    }

    update(x,y) {
        if(this.s.dist(x,y,this.x,this.y) < this.r/2) {
            this.hover = true;
        } else {
            this.hover = false;
        }
    }

    checkClick() {
        if(this.hover && !this.clicked) {
           this.s.detail = true;
           this.s.clickedNode = this;
           this.s.props.actions.stopTraining(this.s.props.training);
        }
        this.clicked = this.hover
    }
}