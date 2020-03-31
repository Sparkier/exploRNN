import createMuiTheme from '../../theme/globalTheme';

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
    grey: s.color(createMuiTheme.palette.secondary.main),
    lightgrey: s.color(createMuiTheme.palette.secondary.light),
    darkgrey: s.color(createMuiTheme.palette.secondary.dark),
    black: s.color(0),
    bluegrey: s.color(createMuiTheme.palette.primary.main),
    lightbluegrey: s.color(createMuiTheme.palette.primary.light),
    darkbluegrey: s.color(createMuiTheme.palette.primary.dark),
    red: s.color(255, 50, 50),
    cyan: s.color(createMuiTheme.palette.overview.main),
    cyanlight: s.color(createMuiTheme.palette.overview.main),
    cyandark: s.color(createMuiTheme.palette.overview.main),
    orange: s.color(createMuiTheme.palette.detail.main),
    orangelight: s.color(createMuiTheme.palette.detail.light),
    orangedark: s.color(createMuiTheme.palette.detail.dark),
  };
}
