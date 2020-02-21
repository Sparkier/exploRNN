/**
 * The colors used by p5 sketches.
 *
 * @param {object} s the p5.js sketch
 * @return {object} the color palette for p5 sketches
 */
export function getColorPalette(s) {
  return {
    primary: s.colors.white,
    secondary: s.colors.darkbluegrey,
    contrast: s.colors.lightgrey,
    secondaryContrast: s.colors.bluegrey,
    error: s.colors.red,
    bg: s.colors.white,
    bgNet: s.colors.white,
    bgIn: s.colors.white,
    bgLoss: s.colors.white,
    bgOut: s.colors.white,
    bgCell: s.colors.white,
    bgCellplot: s.colors.white,
    ovPrimary: s.colors.cyan,
    ovSecondary: s.colors.cyandark,
    ovContrast: s.colors.cyanlight,
    cvPrimary: s.colors.orange,
    cvSecondary: s.colors.orangedark,
    cvContrast: s.colors.orangelight,
    tooltipBG: s.colors.darkbluegrey,
    tooltipFG: s.colors.white,
  };
}

/**
 * The colors used by p5 sketches.
 *
 * @param {object} s the p5.js sketch
 * @return {object} the color palette for p5 sketches
 */
export function getColors(s) {
  return {
    white: s.color(255),
    grey: s.color('#9e9e9e'),
    lightgrey: s.color('#eeeeee'),
    darkgrey: s.color('#212121'),
    black: s.color(0),
    bluegrey: s.color('#455a64'),
    lightbluegrey: s.color('#b0bec5'),
    darkbluegrey: s.color('#263238'),
    red: s.color(255, 50, 50),
    cyan: s.color('#00acc1'),
    cyanlight: s.color('#26c6da'),
    cyandark: s.color('#00838f'),
    orange: s.color('#fb8c00'),
    orangelight: s.color('#ffa726'),
    orangedark: s.color('#ef6c00'),
  };
}
