export default function (s) {
    s.props = {}
    
    let mem;

    s.update = function() {
        mem.push(s.props.prediction)
    }
    
    s.setup = function() {
        s.createCanvas(500, 500)
        mem = []
        mem.push(0)
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
        let size = mem.length
        let w = s.width / size;
        for(let i = 0; i < size; i++) {
            s.rect(i * w, s.height - 20 * mem[i],w,20 * mem[i]);
        }
    }
}