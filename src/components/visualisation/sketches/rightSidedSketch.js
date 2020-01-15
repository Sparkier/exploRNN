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
    const helpDiv = document.getElementById('rightDiv');
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
    s.vertex(s.width, s.height);
    s.vertex(s.width - 150, s.height);
    s.vertex(s.width, s.height - 150);
    s.endShape();
  };

  s.update = function(detail) {
    s.detail = detail;
  };
}
