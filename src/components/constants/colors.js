import createTheme from '../../theme/globalTheme';

/**
 * The colors used by p5 sketches.
 *
 * @param {object} s the p5.js sketch
 * @return {object} the color palette for p5 sketches
 */
export function getColors(s) {
  return {
    white: s.color(255),
    grey: s.color(createTheme.palette.secondary.main),
    lightgrey: s.color(createTheme.palette.secondary.light),
    darkgrey: s.color(createTheme.palette.secondary.dark),
    black: s.color(0),
    bluegrey: s.color(createTheme.palette.primary.main),
    lightbluegrey: s.color(createTheme.palette.primary.light),
    darkbluegrey: s.color(createTheme.palette.primary.dark),
    red: s.color(255, 50, 50),
    overview: s.color(createTheme.palette.overview.main),
    overviewlight: s.color(createTheme.palette.overview.light),
    overviewdark: s.color(createTheme.palette.overview.dark),
    detail: s.color(createTheme.palette.detail.main),
    detaillight: s.color(createTheme.palette.detail.light),
    detaildark: s.color(createTheme.palette.detail.dark),
  };
}
