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
        if(!s.props.prediction.length >0) {
            return;
        }
        let preds = s.props.prediction[0][3];
        let size = preds.length
        let w = s.width / size;
        for(let i = 0; i < size; i++) {
            let diff = 1 - preds[i];
            if(diff > 1) {
             s.fill(200,50,50);
            } else {
              s.fill(diff * 150 + 50, (1-diff) * 150 + 50,50);
            }
            s.rect(i * w, s.height - 20 * preds[i], w, 20 * preds[i]);
        }
    }
}