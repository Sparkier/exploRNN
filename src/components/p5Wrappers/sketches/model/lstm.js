
export class LSTM {

    items = [];
    connections = []

    constructor(s) {
        this.s = s;
        let left = 0.1 * s.width;
        let top = 0.1 * s.height;
        let horBuf = (1/6) * 0.8 * s.width
        let verBuf = (1/3) * 0.8 * s.height
        s.clickedItem = undefined;
        this.anim = 0;
        this.animMax = 5;

        this.items.push(this.receive = new Item("rec", "Layer Input", left + horBuf, top + verBuf, 2, s))
        this.items.push(this.add = new Item("add", "Input Gate", left + 2*horBuf, top + verBuf, 1, s))
        this.items.push(this.save = new Item("sav", "Cell State Update", left + 3*horBuf, top + verBuf, 2, s))
        this.items.push(this.forget = new Item("los", "Forget Gate", left + 4*horBuf, top + verBuf, 2, s))
        this.items.push(this.output = new Item("out", "Output Gate", left + 5*horBuf, top + verBuf, 2, s))
        this.items.push(this.cell = new Item("cel", "Cell State", left + 3*horBuf, top + 2 * verBuf, 1, s))
        this.items.push(this.crossInput = new Item("crs", "", left + 2 * horBuf, top + 0.5 * verBuf, 1, s))
        this.items.push(this.crossForget = new Item("crs", "", left + 4 * horBuf, top + 0.5 * verBuf, 1, s))
        this.items.push(this.crossOutput = new Item("crs", "", left + 5 * horBuf, top + 0.5 * verBuf, 1, s))
        this.items.push(this.crossCell = new Item("crs", "", left + 4.5 * horBuf, top + verBuf, 1, s))
        this.items.push(this.first = new Item("fst", "", left, top + verBuf, 1, s))
        this.items.push(this.last = new Item("lst", "", left + 6 * horBuf, top + verBuf, 1, s))

        this.connections.push(this.mainInput = new Connection([{x: this.first.x, y: this.first.y}, {x: this.receive.x, y: this.receive.y}], [this.receive], s))
        this.connections.push(this.bus = new Connection([{x: this.receive.x, y: this.receive.y}, {x: this.receive.x, y: this.crossOutput.y}, {x: this.crossOutput.x, y: this.crossOutput.y}], [this.crossInput, this.crossForget, this.crossOutput], s))
        this.connections.push(this.toAdd = new Connection([{x: this.crossInput.x, y: this.crossInput.y}, {x: this.add.x, y: this.add.y}], [this.add], s))
        this.connections.push(this.toForget = new Connection([{x: this.crossForget.x, y: this.crossForget.y}, {x: this.forget.x, y: this.forget.y}], [this.forget], s))
        this.connections.push(this.toOutput = new Connection([{x: this.crossOutput.x, y: this.crossOutput.y}, {x: this.output.x, y: this.output.y}], [this.output], s))
        this.connections.push(this.addToSave = new Connection([{x: this.add.x, y: this.add.y}, {x: this.save.x, y: this.save.y}], [this.save], s))
        this.connections.push(this.forgetToSave = new Connection([{x: this.forget.x, y: this.forget.y}, {x: this.save.x, y: this.save.y}], [this.save], s))
        this.connections.push(this.saveToCell = new Connection([ {x: this.save.x, y: this.save.y}, {x: this.cell.x, y: this.cell.y}], [this.cell], s))
        this.connections.push(this.cellOut = new Connection([ {x: this.cell.x, y: this.cell.y}, {x: this.crossCell.x, y: this.cell.y}, {x: this.crossCell.x, y: this.crossCell.y}], [this.crossCell], s))
        this.connections.push(this.cellToForget = new Connection([{x: this.crossCell.x, y: this.crossCell.y}, {x: this.forget.x, y: this.forget.y}], [this.forget], s))
        this.connections.push(this.cellToOutput = new Connection([{x: this.crossCell.x, y: this.crossCell.y}, {x: this.output.x, y: this.output.y}], [this.output], s))
        this.connections.push(this.recurrent = new Connection([{x: this.output.x, y: this.output.y}, {x: this.output.x, y: top + 2.5 * verBuf},{x: this.receive.x, y:  top + 2.5 * verBuf}, {x: this.receive.x, y: this.receive.y}],[this.receive], s))
        this.connections.push(this.mainOut = new Connection([{x: this.output.x, y: this.output.y}, {x: this.last.x, y: this.last.y}], [this.last], s))
    
        this.first.connections.push(this.mainInput);
        this.receive.connections.push(this.bus);
        this.add.connections.push(this.addToSave);
        this.save.connections.push(this.saveToCell);
        this.forget.connections.push(this.forgetToSave);
        this.crossInput.connections.push(this.toAdd);
        this.crossForget.connections.push(this.toForget);
        this.crossOutput.connections.push(this.toOutput);
        this.crossCell.connections.push(this.cellToForget);
        this.crossCell.connections.push(this.cellToOutput);
        this.cell.connections.push(this.cellOut);
        this.output.connections.push(this.mainOut);
        this.output.connections.push(this.recurrent);
        this.last.connections.push(this.first);
    
        this.first.addActiveInput();   
        this.recurrent.addActiveInput(); 
        this.forget.addActiveInput();    
    }

    draw() {
        let s = this.s;
        s.rectMode(s.CENTER);
        s.fill(0,100);
        s.noStroke();
        s.rect(s.width/2+20, s.height/2+20, s.width * 0.8, s.height * 0.8)
        s.fill(35);
        s.stroke(100);
        s.strokeWeight(15)
        s.rect(s.width/2, s.height/2, s.width * 0.8, s.height * 0.8)
        
        for(let c of this.connections) {
            c.draw();
        }

        for(let i of this.items) {
            i.draw();
        }

        if(s.clickedItem) {
            this.anim++;
            if(this.anim >= this.animMax) {
                this.anim = this.animMax;
            }
            s.tint(255,245)
            let img = undefined;
            switch(s.clickedItem.type) {
                case 'rec':
                    img = s.recdesc;
                    break;
                case 'add':
                    img = s.adddesc
                    break;
                case 'sav':
                    img = s.savdesc
                    break;
                case 'los':
                    img = s.losdesc
                    break;
                case 'cel':
                    img = s.celdesc
                    break;
                case 'out':
                    img = s.outdesc
                    break;
                default:
            }
            if(!img) {
                return;
            }
            let ratio = img.width / img.height;
            let newW =  s.width * 0.5 * (this.anim/this.animMax);
            let newH = newW / ratio;
            let newX = s.clickedItem.x;
            let newY = s.clickedItem.y;
            s.image(img, newX, newY, newW, newH);
        } else {
            this.anim = 0;
        }
    }

    update() {
        for(let c of this.connections) {
            c.sendActivations()
        }
        for(let i of this.items) {
            i.sendActivations()
        }
        for(let c of this.connections) {
            c.updateActivation()
        }
        for(let i of this.items) {
            i.updateActivation()
        }
    }

    mouseMoved(x, y) {
        for(let i of this.items) {
            i.mouseMoved(x, y)
        }
    }

    checkClick() {
        let ret = false;
        let s = this.s;
        if(s.clickedItem) {
            s.clickedItem = undefined;
            ret = true;
        } 
        for(let i of this.items) {
            ret = i.checkClick() || ret
        }
        if(!ret) {
            s.clickedItem = undefined;
        }
        return ret;
        
    }
}

class Connection {
    constructor(verts, goesTo, s) {
        this.verts = verts;
        this.next = goesTo;
        this.s = s;
        this.active = false;
        this.hover = false;
        this.activeInputs = 0;
    }

    draw() {
        let s = this.s;
        s.noFill();
        s.stroke(255);
        s.strokeWeight(1);
        if(this.active) {
            s.stroke(60,120,255);
            s.strokeWeight(4);
            s.drawingContext.lineDashOffset = -s.frameCount/2
            s.drawingContext.setLineDash([10,10])
        }
        if(this.hover) {
            s.stroke(120,255,160);
            s.drawingContext.lineDashOffset = -s.frameCount/2
            s.drawingContext.setLineDash([10,10])
        }
        s.beginShape();
        for(let v of this.verts) {
            s.vertex(v.x, v.y);
        }
        s.endShape();
        s.drawingContext.setLineDash([])
        this.s.fill(0)
    }

    addActiveInput() {
        this.activeInputs += 1;
    }

    sendActivations() {
        if(this.active) {
            for(let n of this.next) {
                n.addActiveInput();
            }
        }
    }

    updateActivation() {
        if(this.active) {
            this.active = false;
            this.activeInputs = 0;
        } else {
            if(this.activeInputs !== 0) {
                this.active = true;
            }
        }
    }
}

class Item {

    constructor(type, name, x, y, ingoing, s) {
        this.type = type;
        this.name = name;
        this.x = x;
        this.y = y;
        this.s = s;
        this.hover = false;
        this.clicked = false;
        this.active = false;
        this.connections = []
        this.maxIngoingConnections = ingoing;
        this.currentActivatedConnecions = 0;

        switch(type) {
            case 'fst':
            case 'lst':
            case 'sav':
            case 'rec':
                this.r = 30;
                break;
            case 'crs':
                this.r = 10;
                break;
            default:
                this.r = 70;
        }
    }

    draw() {
        let s = this.s;
        let size = this.r;
        let imgSize = 0.6 * this.r;
        if(this.active) {
            size = this.r * 1.2;
            imgSize = 0.6 * this.r * 1.2;
        }
        this.s.fill(0,70);
        this.s.noStroke();
        if(this.type === 'cel') {
            this.s.rect(this.x + size * 0.1, this.y + size * 0.1, size, size);
        } else {
            this.s.ellipse(this.x + size * 0.1, this.y + size * 0.1, size);
        }
        this.s.fill(225);
        this.s.noStroke();
        if(this.active) {
            s.fill(60,120,255);
        } else if(this.currentActivatedConnecions !== 0) {
            s.fill(140,170,225);
        }
        if(this.hover && !this.clicked && !(this.type === 'fst' || this.type === 'lst' || this.type === 'crs')) {
            s.fill(120,255,160);
            s.cursor(s.HAND)
        }
        if(this.type === 'cel') {
            this.s.rect(this.x, this.y, size, size);
        } else {
            this.s.ellipse(this.x, this.y, size);
        }
        switch(this.type) {
            case 'rec':
                this.s.image(this.s.receive,this.x, this.y,imgSize*2,imgSize*2)
                break;
            case 'add':
                this.s.image(this.s.add,this.x, this.y,imgSize,imgSize)
                break;
            case 'sav':
                this.s.image(this.s.save,this.x, this.y,imgSize*2,imgSize*2)
                break;
            case 'los':
                this.s.image(this.s.forget,this.x, this.y,imgSize,imgSize)
                break;
            case 'cel':
                this.s.image(this.s.cellImage,this.x, this.y,imgSize,imgSize)
                break;
            case 'out':
                this.s.image(this.s.output,this.x, this.y,imgSize,imgSize)
                break;
            default:
        }
        if(this.hover && !this.clicked && !(this.type === 'fst' || this.type === 'lst' || this.type === 'crs')) {
            s.textAlign(s.CENTER, s.CENTER);
            s.fill(0,150)
            s.rect(s.mouseX, s.mouseY+40, 100, 30);
            s.fill(255)
            s.text(this.name, s.mouseX, s.mouseY + 40)
        }
    }

    addActiveInput() {
        this.currentActivatedConnecions += 1;
    }

    sendActivations() {
        if(this.active) {
            for(let c of this.connections) {
                c.addActiveInput();
            }
        }
    }

    updateActivation() {
        if(this.active) {
            this.active = false;
            this.currentActivatedConnecions = 0;
        } else {
            if(this.currentActivatedConnecions >= this.maxIngoingConnections) {
                this.active = true;
            }
        }
    }

    mouseMoved(x, y) {
        if(this.s.dist(x, y, this.x, this.y) < this.r/2) {
            this.hover = true;
        } else {
            this.hover = false;
        }
        for(let c of this.connections) {
            c.hover = this.hover;
        }
    }

    checkClick() {
        if(this.hover) {
            this.s.clickedItem = this;
        }
        return this.clicked = this.hover;
    }
}