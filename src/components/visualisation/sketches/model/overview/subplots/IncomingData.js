/**
 * Plots an animation for incoming data.
 *
 * @param {String} type the type of data that we need to plot for
 * @param {object} s the p5 js sketch
 * @param {number} halfH half the height of the plot
 */
export function plotIncomingData(type, s, halfH) {
  let height = halfH;
  if (type === 'text') {
    height = 2 * s.typography.fontsize;
  }
  const originX = s.outProps.left;
  const originY = s.outProps.midY;
  s.push();

  // Draw background color
  s.colors.lightgrey.setAlpha(100);
  s.fill(s.colors.lightgrey);
  s.colors.lightgrey.setAlpha(255);
  for (let i = -1; i < 2; i=i+2) {
    s.beginShape();
    s.vertex(originX, originY);
    s.bezierVertex(originX+80, originY, originX+20, originY+i*height,
        originX+100, originY+i*height);
    s.vertex(originX+100, originY);
    s.endShape(s.CLOSE);
  }
  s.rectMode(s.CORNER);
  s.rect(originX+100, originY-height, s.outProps.right-s.outProps.left-100,
      2*height);

  // Draw animated curves
  s.noFill();
  if (s.netAnim) {
    s.stroke(s.colors.overview);
    s.drawingContext.lineDashOffset = s.rev ?
      s.frameCount/2 : -s.frameCount/2;
    s.drawingContext.setLineDash([10, 10]);
  } else {
    s.stroke(s.colors.bluegrey);
  }
  for (let i = -1; i < 2; i=i+2) {
    s.bezier(originX, originY, originX+80, originY, originX+20,
        originY+i*height, originX+100, originY+i*height);
  }
  s.pop();
}
