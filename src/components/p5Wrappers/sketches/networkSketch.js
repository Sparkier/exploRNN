
export default function (s) {
    s.props = {}
    s.network = []

    s.values = 63; // Only temporary, use props instead
    s.predictions = 20; // Only temporary, use props instead
    s.update = false;
    s.scaleImage = 5

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
       console.log('I WILL DRAW', s.network);
    }

    s.windowResized = function(){
        s.resizeCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight)
    }
        
    s.setup = function() {
        s.createCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight)
        //s.createCanvas(600,400)
        s.frameRate(10)
        s.net = new Network(s);
        s.imageMode(s.CENTER)
    }

    s.draw = function() {
        s.background(54)
        s.stroke(0)
        s.drawNetwork();
        //s.image(s.img,0,0)
    }

    s.preload = function() {
        s.img_input = s.loadImage('./data/input_basic.png');
        s.img_lstm = s.loadImage('./data/lstm_basic.png');
        s.img_output = s.loadImage('./data/output_basic.png', img => {
            console.log('LODAED')
        });
    }

    s.drawNetwork = function() {
        s.stroke(255);
        s.noFill();
        let layers = s.network.length
        s.line(0, s.height/2, s.width/(layers+1), s.height/2)
        s.stroke(255);
        s.noFill();
        s.line(s.width, s.height/2, s.width - s.width/(layers+1), s.height/2)
        s.net.draw();
        if(s.update) {
            s.update = false;
        }
    }

    s.mouseMoved = function() {
        s.net.update(s.mouseX, s.mouseY);
    }

    s.mouseClicked = function() {
        s.net.checkClick();
    } 

}

class Network {

    constructor(s) {
        this.s = s;
        this.layers = []
        let layercount = s.network.length
        for(let i = 0; i < layercount; i++) {
            let nodes = s.network[i]
            this.layers.push(new Layer(s, layercount, i, nodes));
        }
        console.log('MY NET', this.layers)
    }

    draw() {
        for(let i = 0; i < this.layers.length; i++) {
            for(let j = 0; j < this.layers[i].nodes.length; j++) {
                let from = this.layers[i].nodes[j]
                if(i !== this.layers.length - 1) {
                    this.s.stroke(255);
                    this.s.noFill();
                    let next = this.layers[i+1].nodes.length
                    for(let k = 0; k < next; k++) {
                        let to = this.layers[i+1].nodes[k]
                        this.s.line(from.x, from.y, to.x, to.y);
                    }
                }   
            }
        }
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
        this.layerwidth = nodes.size
        this.nodes = []
        for(let j = 0; j < this.layerwidth; j++) {
            this.nodes.push(new Node(s, s.width * (i+1)/(layers + 1), s.height * (j + 1)/ (nodes.size+1), 50, nodes.type))
        }
    }

    draw() {
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
    }

    draw() {
        let s = this.s
        if(!s.update){
            s.stroke(0);
            s.fill(255);
        } else {
            s.stroke(0);
            s.fill(50,255,150);
        }
        if(this.hover) {
            s.stroke(0);
            s.fill(250,100,100);
        }
        if(this.clicked) {
            switch(this.type) {
                case 'input':
                    s.image(s.img_input,this.x,this.y,this.r* s.scaleImage,this.r* s.scaleImage)
                    break;
                case 'hidden':
                    s.image(s.img_lstm,this.x,this.y,this.r* s.scaleImage,this.r* s.scaleImage)
                    break;
                case 'output':
                    s.image(s.img_output,this.x,this.y,this.r* s.scaleImage,this.r* s.scaleImage)
                    break;
                default:
            }
        } else {
            this.s.ellipse(this.x,this.y,this.r);
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
        this.clicked = this.hover
    }
}