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
        let diff = 9 - s.props.prediction;
        if(diff > 1) {
            s.fill(200,50,50);
        } else {
            s.fill(diff * 150 + 50, (1-diff) * 150 + 50,50);
        }
        s.noStroke()
        s.rect(200,200,100,100)
    }
}