
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
        let preds = new Array(10);
        preds.fill(0.1)
        if(s.props.prediction.length > 0) {
            preds = s.props.prediction;
        } 
        let size = preds.length
        let w = s.width / size;
        let diff = 0;
        s.noStroke();
        s.textSize(18);
        s.textAlign(s.CENTER)
        for(let i = 0; i < size; i++) {
            diff = i === 6 ? 1 - preds[i] : preds[i];
            s.fill(diff*150+100,250-150*diff,100);
            s.rect(i * w, 0, w, 400 * preds[i]);
            s.fill(0)
            s.text(i, (i + 0.5) * w, 480);
        }
        let ind = s.getMax();
        s.stroke(0);
        s.noFill();
        s.rect(ind * w, s.height - w, w,w)
    }

    /**
     * Get the index of the highest labelled prediction value
     */
    s.getMax = function() {
        let preds = new Array(10);
        preds.fill(0.1)
        if(s.props.prediction.length > 0) {
            preds = s.props.prediction;
        } 
        let size = preds.length
        let max = preds[0];
        let max_ind = 0;
        for(let i = 1; i < size; i++) {
            if(preds[i] > max) {
                max_ind = i;
                max = preds[i]; 
            }
        }
        return max_ind;
    }
}