
export class LSTM {

    items = [];
    connections = []

    constructor(s) {
        this.s = s;
        let left = 0.1 * s.width;
        let top = 0.1 * s.height;
        let horBuf = (1/6) * 0.8 * s.width
        let verBuf = (1/3) * 0.8 * s.height

        this.items.push(this.receive = new Item("rec", left + horBuf, top + verBuf, 2, s))
        this.items.push(this.add = new Item("add", left + 2*horBuf, top + verBuf, 1, s))
        this.items.push(this.save = new Item("sav", left + 3*horBuf, top + verBuf, 2, s))
        this.items.push(this.forget = new Item("los", left + 4*horBuf, top + verBuf, 2, s))
        this.items.push(this.output = new Item("out", left + 5*horBuf, top + verBuf, 2, s))
        this.items.push(this.cell = new Item("cel", left + 3*horBuf, top + 2 * verBuf, 1, s))
        this.items.push(this.crossInput = new Item("crs", left + 2 * horBuf, top + 0.5 * verBuf, 1, s))
        this.items.push(this.crossForget = new Item("crs", left + 4 * horBuf, top + 0.5 * verBuf, 1, s))
        this.items.push(this.crossOutput = new Item("crs", left + 5 * horBuf, top + 0.5 * verBuf, 1, s))
        this.items.push(this.crossCell = new Item("crs", left + 4.5 * horBuf, top + verBuf, 1, s))
        this.items.push(this.first = new Item("fst", left, top + verBuf, 1, s))
        this.items.push(this.last = new Item("lst", left + 6 * horBuf, top + verBuf, 1, s))

        this.connections.push(this.mainInput = new Connection([{x: this.first.x, y: this.first.y}, {x: this.receive.x, y: this.receive.y}], this.receive, s))
        this.connections.push(this.busOne = new Connection([{x: this.receive.x, y: this.receive.y}, {x: this.receive.x, y: this.crossInput.y}, {x: this.crossInput.x, y: this.crossInput.y}], this.crossInput, s))
        this.connections.push(this.busTwo = new Connection([{x: this.crossInput.x, y: this.crossInput.y}, {x: this.crossForget.x, y: this.crossForget.y}], this.crossForget, s))
        this.connections.push(this.busThree = new Connection([{x: this.crossForget.x, y: this.crossForget.y}, {x: this.crossOutput.x, y: this.crossOutput.y}], this.crossOutput, s))
        this.connections.push(this.toAdd = new Connection([{x: this.crossInput.x, y: this.crossInput.y}, {x: this.add.x, y: this.add.y}], this.add, s))
        this.connections.push(this.toForget = new Connection([{x: this.crossForget.x, y: this.crossForget.y}, {x: this.forget.x, y: this.forget.y}], this.forget, s))
        this.connections.push(this.toOutput = new Connection([{x: this.crossOutput.x, y: this.crossOutput.y}, {x: this.output.x, y: this.output.y}], this.output, s))
        this.connections.push(this.addToSave = new Connection([{x: this.add.x, y: this.add.y}, {x: this.save.x, y: this.save.y}], this.save, s))
        this.connections.push(this.forgetToSave = new Connection([{x: this.forget.x, y: this.forget.y}, {x: this.save.x, y: this.save.y}], this.save, s))
        this.connections.push(this.saveToCell = new Connection([ {x: this.save.x, y: this.save.y}, {x: this.cell.x, y: this.cell.y}], this.cell, s))
        this.connections.push(this.cellOut = new Connection([ {x: this.cell.x, y: this.cell.y}, {x: this.crossCell.x, y: this.cell.y}, {x: this.crossCell.x, y: this.crossCell.y}], this.crossCell, s))
        this.connections.push(this.cellToForget = new Connection([{x: this.crossCell.x, y: this.crossCell.y}, {x: this.forget.x, y: this.forget.y}], this.forget, s))
        this.connections.push(this.cellToOutput = new Connection([{x: this.crossCell.x, y: this.crossCell.y}, {x: this.output.x, y: this.output.y}], this.output, s))
        this.connections.push(this.recurrent = new Connection([{x: this.output.x, y: this.output.y}, {x: this.output.x, y: top + 2.5 * verBuf},{x: this.receive.x, y:  top + 2.5 * verBuf}, {x: this.receive.x, y: this.receive.y}], this.receive, s))
        this.connections.push(this.mainOut = new Connection([{x: this.output.x, y: this.output.y}, {x: this.last.x, y: this.last.y}], this.last, s))
    
        this.first.connections.push(this.mainInput);
        this.receive.connections.push(this.busOne);
        this.add.connections.push(this.addToSave);
        this.save.connections.push(this.saveToCell);
        this.forget.connections.push(this.forgetToSave);
        this.crossInput.connections.push(this.busTwo);
        this.crossInput.connections.push(this.toAdd);
        this.crossForget.connections.push(this.busThree);
        this.crossForget.connections.push(this.toForget);
        this.crossForget.connections.push(this.busThree);
        this.crossOutput.connections.push(this.toOutput);
        this.crossCell.connections.push(this.cellToForget);
        this.crossCell.connections.push(this.cellToOutput);
        this.cell.connections.push(this.cellOut);
        this.output.connections.push(this.mainOut);
        this.output.connections.push(this.recurrent);
        this.last.connections.push(this.first);
    
        this.first.addActiveInput();   
        this.receive.addActiveInput(); 
        this.forget.addActiveInput();    
    }

    draw() {
        let s = this.s;
        s.fill(45);
        s.stroke(0);
        s.rectMode(s.CENTER);
        s.rect(s.width/2, s.height/2, s.width * 0.8, s.height * 0.8)
        
        for(let c of this.connections) {
            c.draw();
        }

        for(let i of this.items) {
            i.draw();
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
}

class Connection {
    constructor(verts, goesTo, s) {
        this.verts = verts;
        this.next = goesTo;
        this.s = s;
        this.active = false;
        this.activeInputs = 0;
    }

    draw() {
        let s = this.s;
        s.noFill();
        s.stroke(255);
        if(this.active) {
            s.stroke(50,100,255);
        }
        s.strokeWeight(1);
        s.beginShape();
        for(let v of this.verts) {
            s.vertex(v.x, v.y);
        }
        s.endShape();
        this.s.fill(0)
    }

    addActiveInput() {
        this.activeInputs += 1;
    }

    sendActivations() {
        if(this.active) {
            this.next.addActiveInput();
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

    constructor(type, x, y, ingoing, s) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.s = s;
        this.active = false;
        this.connections = []
        this.maxIngoingConnections = ingoing;
        this.currentActivatedConnecions = 0;

        switch(type) {
            case 'fst':
            case 'lst':
                this.r = 5;
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
        this.s.fill(0,70);
        this.s.noStroke();
        this.s.ellipse(this.x + 5, this.y + 5, this.r);
        this.s.fill(225);
        this.s.noStroke();
        if(this.active) {
            s.fill(50,100,255);
        } else if(this.currentActivatedConnecions !== 0) {
            s.fill(150,180,200);
        }
        this.s.ellipse(this.x, this.y, this.r);
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
}