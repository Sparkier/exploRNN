
export default function (s) {
    s.props = {}
        
    s.setup = function() {
        s.createCanvas(500, 500)
    }

    s.draw = function() {
        s.background(255)
        s.stroke(54)
        s.noFill();
        s.rect(1,1,498,498)
        if(!s.props.prediction.length > 0) {
            return;
        }
        let preds = s.props.prediction;
        let size = preds.length
        let w = s.width / size;
        let diff = 0;
        s.noStroke();
        for(let i = 0; i < size; i++) {
            diff = i === 5 ? 1 - preds[i] : preds[i];
            s.fill(diff*150+100,250-150*diff,100);
            s.rect(i * w, s.height - 500 * preds[i], w, 500 * preds[i]);
        }
    }
}