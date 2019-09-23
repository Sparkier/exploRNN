
export default function (s) {
    s.props = {}
    s.preds = []

    s.values = 63; // Only temporary, use props instead
    s.predictions = 20; // Only temporary, use props instead
    
    s.updateMemory = () => {
       
    }
        
    s.setup = function() {
        s.createCanvas(document.getElementById("networkDiv").offsetWidth, window.innerHeight)
        //s.createCanvas(600,400)
    }

    s.draw = function() {
        s.background(54)
        s.stroke(0)
    }

}