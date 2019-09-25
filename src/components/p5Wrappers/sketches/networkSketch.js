
export default function (s) {
    s.props = {}
    s.network = []

    s.values = 63; // Only temporary, use props instead
    s.predictions = 20; // Only temporary, use props instead
    s.update = false;

    s.updateMemory = () => {
       s.network = [];
       s.network.push(1);
       for(let i = 0; i < s.props.network.layers; i++) {
           s.network.push(s.props.network.layerSize);
       }
       s.network.push(1);
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
    }

    s.draw = function() {
        s.background(54)
        s.stroke(0)
        s.drawNetwork();
    }

    s.drawNetwork = function() {
        s.stroke(255);
        s.noFill();
        let layers = s.network.length
        s.line(0, s.height/2, s.width/(layers+1), s.height/2)
        if(!s.update){
            s.stroke(0);
            s.fill(255);
        } else {
            s.stroke(0);
            s.fill(50,255,150);
        }
        for(let i = 0; i < layers; i++) {
            let nodes = s.network[i]
            for(let j = 0; j < nodes; j++) {
                if(i !== layers - 1) {
                    s.stroke(255);
                    s.noFill();
                    let next = s.network[i+1]
                    for(let k = 0; k < next; k++) {
                        s.line(s.width * (i+1)/(layers + 1), s.height * (j + 1)/ (nodes+1), s.width * (i + 2)/(layers + 1), s.height * (k + 1)/ (next+1), );
                    }
                }   
                if(!s.update){
                    s.stroke(0);
                    s.fill(255);
                } else {
                    s.stroke(0);
                    s.fill(50,255,150);
                }
                s.ellipse(s.width * (i+1)/(layers + 1), s.height * (j + 1)/ (nodes+1), 50);
            }
        }
        s.stroke(255);
        s.noFill();
        s.line(s.width, s.height/2, s.width - s.width/(layers+1), s.height/2)
        if(s.update) {
            s.update = false;
        }
    }

}