/**
 * Plots an explanation for the shown data.
 *
 * @param {String} type the type of data that we need to plot for
 * @param {object} s the p5 js sketch
 * @param {number} halfH half the height of the plot
 */
export function plotBackpropExplanation(type, s, halfH) {
  let height = halfH;
  if (type === 'text') {
    height = 3 * s.typography.fontsize;
  }
  const originY = s.outProps.midY;
  s.push();
  s.textAlign(s.RIGHT, s.TOP);
  s.textSize(s.typography.fontsizesmall);
  s.fill(s.colors.darkgrey);
  s.noStroke();
  s.text(s.global.strings.backpropExplanation, s.outProps.right - 10,
      originY + height + 10);
  s.pop();
}
