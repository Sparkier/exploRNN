import createMuiTheme from '../../theme/globalTheme';

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
    overview: s.color(createMuiTheme.palette.overview.main),
    overviewlight: s.color(createMuiTheme.palette.overview.light),
    overviewdark: s.color(createMuiTheme.palette.overview.dark),
    detail: s.color(createMuiTheme.palette.detail.main),
    detaillight: s.color(createMuiTheme.palette.detail.light),
    detaildark: s.color(createMuiTheme.palette.detail.dark),
  };
}
