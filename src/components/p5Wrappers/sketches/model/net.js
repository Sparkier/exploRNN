export class Network {

    constructor(s) {
        this.s = s;
        s.blue = s.color(100,150,255);
        s.orange = s.color(255,200,100)
        s.white = s.color(54)
        this.layers = []
        this.fakeLayers = []
        let layercount = s.network.length
        let nodes = s.network[0]
        this.layers.push(new Layer(s, layercount, -1, nodes));
        this.fakeLayers.push(new FakeLayer(s, layercount, 0.5))
        for(let i = 1; i < layercount - 1; i++) {
            nodes = s.network[i]
            this.layers.push(new Layer(s, layercount, i, nodes));
            this.fakeLayers.push(new FakeLayer(s, layercount, i + 0.5))
        }
        nodes = s.network[layercount-1]
        this.layers.push(new Layer(s, layercount, -1, nodes));
    }

    draw() {
        let s = this.s;
        s.strokeWeight(2 * s.netScale);
        if(s.props.training.running) {
            s.stroke(s.blue);
            s.drawingContext.lineDashOffset = -s.frameCount/2
            s.drawingContext.setLineDash([10,10])
        } else {
            s.stroke(s.white);
        }
        this.s.noFill();
        this.s.line(s.ctrLeft, this.s.height/2, this.s.ctrRight, this.s.height/2);
        s.drawingContext.setLineDash([])
        for(let l of this.layers) {
            l.draw();
        }
        for(let l of this.fakeLayers) {
            l.draw();
        }
    }

    update(x, y) {
        //console.log('UPDATE',x ,y )
        for(let l of this.layers) {
            l.update(x,y)
        }
        for(let l of this.fakeLayers) {
            l.update(x,y)
        }
    }

    checkClick() {
        for(let l of this.layers) {
            l.checkClick()
        }
        for(let l of this.fakeLayers) {
            l.checkClick()
        }
    }
}

class Layer {

    constructor(s, layers, i, nodes) {
        this.s = s;
        this.i = i;
        this.layers = layers - 2;
        this.layerwidth = nodes.size
        this.nodes = []
        this.layerType = nodes.type;
        this.hover = false;
        this.hover_left = false;
        this.hover_right = false;
        this.clicked = false;
        this.x = s.ctrLeft + s.ctrWidth * (this.i)/(this.layers + 1);
        this.y = s.height/2;
        this.w = s.ctrWidth/(2*this.layers + 1)*0.8;
        this.h = this.w * 0.8
    }

    draw() {
        if(!(this.layerType === 'input' || this.layerType === 'output')) {
            let s = this.s;
            s.fill(0,100);
            s.noStroke();
            s.rect(this.x+5,this.y+5,this.w,this.h);
            s.fill(250, this.s.netAlpha);
            if(s.props.training.running){
                s.stroke(s.white, this.s.netAlpha);
            } else {
                s.stroke(s.white, this.s.netAlpha);
            }
            if(this.hover){
                s.stroke(100, this.s.netAlpha);
                s.cursor(s.HAND)
            }
            s.rect(this.x,this.y,this.w,this.h);
            s.noStroke();
            if(s.props.training.running){
                s.fill(s.blue, this.s.netAlpha);
            } else {
                s.fill(s.white, this.s.netAlpha);
            }
            if(this.hover){
                s.fill(s.orange, this.s.netAlpha);
            }
            s.strokeWeight(2)
            let left = this.x - this.w/2;
            let top = this.y - this.h/2;
            for(let i = 0; i < 5; i++) {
                s.ellipse(left + (i+1) * this.w / 6, top + this.h / 3, this.w / (i === 0 || i === 2 ? 20 : 10))
            }
            s.rect(left + (3) * this.w / 6, top + 2 * this.h / 3, this.w / (10),this.w / (10))
            if(this.hover) {
                s.textAlign(s.CENTER, s.CENTER);
                s.fill(0,150)
                s.rect(s.mouseX, s.mouseY+40, 100, 30);
                s.fill(255)
            }
            if(this.hover_left) {
                s.text('Click for detail', s.mouseX, s.mouseY + 40)
                s.noStroke();
                s.fill(50,250,100,200)
                s.rect(this.x - this.w/4,this.y,this.w/2,this.h);
            } else if(this.hover_right) {
                s.text('Remove Layer', s.mouseX, s.mouseY + 40)
                s.noStroke();
                s.fill(50,250,100,200)
                s.rect(this.x + this.w/4,this.y,this.w/2,this.h);
            }
        }
    }

    update(x,y) {
        if(x > this.x - this.w/2 && x < this.x + this.w/2 && y > this.y - this.h/2 && y < this.y + this.h/2) {
            this.hover = true;
            this.hover_left = !(this.hover_right = (x > this.x))
        } else {
            this.hover = this.hover_left = this.hover_right = false;
        }
    }

    checkClick() {
        if(this.hover && !this.clicked) {
            this.s.clickedBlock = this;
            if(this.hover_left) {
                this.s.detail = true;
                this.s.props.actions.stopTraining(this.s.props.training);
                this.s.props.actions.updateUI({...this.s.props.ui, detail: true});
            } else if(this.s.props.network.layers >= 1){
                this.s.props.actions.stopTraining(this.s.props.training);
                this.s.props.actions.updateNetwork({...this.s.props.network, layers: this.s.props.network.layers - 1})
            }
        }
        this.clicked = this.hover
    }
}


class FakeLayer {

    constructor(s, layers, i) {
        this.s = s;
        this.i = i;
        this.layers = layers - 2;
        this.layerwidth = 1
        this.nodes = []
        this.hover = false;
        this.clicked = false;
        this.x = s.ctrLeft + s.ctrWidth * (this.i)/(this.layers + 1);
        this.y = s.height/2;
        this.w = s.ctrWidth/(2*this.layers + 1)*0.25;
        this.h = this.w
    }

    draw() { 
        if(this.s.props.network.layers >= 7) {
            return;
        }
        let s = this.s;
        let d = s.dist(s.mouseX,s.mouseY,this.x,this.y)
        let alpha = (3*this.w - d) / (2*this.w) * 255
        if(alpha > 255) {
            alpha = 255
        } else if(alpha <= 0) {
            alpha = 0
        }
        s.fill(250, alpha);
        s.stroke(54, alpha);
        if(this.hover){
            s.stroke(50,150,50, alpha);
            s.cursor(s.HAND)
        }
        s.ellipse(this.x,this.y,this.w,this.h);
        if(this.hover) {
            s.textAlign(s.CENTER, s.CENTER);
            s.fill(0,150)
            s.noStroke();
            s.rect(s.mouseX, s.mouseY+40, 85, 25);
            s.fill(255)
            s.text('Add Layer', s.mouseX, s.mouseY + 40)
        }
    }

    update(x,y) {
        if(x > this.x - this.w/2 && x < this.x + this.w/2 && y > this.y - this.h/2 && y < this.y + this.h/2) {
            this.hover = true;
        } else {
            this.hover = false;
        }
    }

    checkClick() {
        if(this.hover && !this.clicked &&  this.s.props.network.layers <= 7) {
           this.s.props.actions.stopTraining(this.s.props.training);
           this.s.props.actions.updateNetwork({...this.s.props.network, layers: this.s.props.network.layers + 1})
        }
        this.clicked = this.hover
    }
}