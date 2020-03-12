/**
 * This function represents the sketch drawing the left colored triangle showing
 * the current view
 *
 * @param {object} s the p5.js sketch
 */
export default function(s) {
  s.detail = false;
  s.cyan = s.color('#00838f');
  s.orange = s.color('#ef6c00');

  s.setup = function() {
    const helpDiv = document.getElementById('leftDiv');
    const valDiv = document.getElementById('valueDiv');
    const appDiv = document.getElementById('appDiv');
    const barDiv = document.getElementById('barDiv');
    // Create and initialize the canvas with its draw params
    s.cnv = s.createCanvas(helpDiv.offsetWidth,
        appDiv.offsetHeight - valDiv.offsetHeight - barDiv.offsetHeight);
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
    s.vertex(s.width, 0);
    s.vertex(0, s.width);
    s.endShape();
    s.translate(70, 70);
    s.rotate(-Math.PI/4);
    s.textAlign(s.CENTER, s.BOTTOM);
    s.textSize(20);
    s.fill(255);
  };

  s.update = function(detail) {
    s.detail = detail;
  };
}
