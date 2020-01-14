/**
 * This function represents the sketch in which the network with user
 * interaction functionality is being drawn
 *
 * @param {object} s the p5.js sketch
 */
export default function(s) {
  s.detail = false;
  s.cyan = s.color('#00838f');
  s.orange = s.color('#ef6c00');

  s.setup = function() {
    const helpDiv = document.getElementById('helperDiv');
    const valDiv = document.getElementById('valueDiv');
    s.createCanvas(helpDiv.offsetWidth,
        window.innerHeight - valDiv.offsetHeight - 50);
    s.background(255);
  };

  s.draw = function() {
    s.background(255);
    if (s.detail) {
      s.fill(s.orange);
    } else {
      s.fill(s.cyan);
    }
    s.noStroke();
    s.beginShape();
    s.vertex(0, 0);
    s.vertex(150, 0);
    s.vertex(0, 150);
    s.endShape();
    s.translate(70, 70);
    s.rotate(-Math.PI/4);
    s.textAlign(s.CENTER, s.BOTTOM);
    s.textSize(20);
    s.fill(255);
    if (s.detail) {
      // s.text('Cell', 0, 0);
    } else {
      // s.text('Network', 0, 0);
    }
  };

  s.update = function(detail) {
    s.detail = detail;
  };
}
