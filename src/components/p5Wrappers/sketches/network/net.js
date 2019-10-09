export class Network {

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