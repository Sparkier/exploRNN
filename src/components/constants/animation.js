/**
 * Returns the default animation settings for a cell.
 *
 * @return {object} the animation configuration for a network cell
 */
export function getCellAnimationValues() {
  return {
    maxSteps: 11,
    maxErrorSteps: 20,
    maxBackSteps: 62,
    step: 0,
    frame: 0,
    inputStep: 0,
    predictionStep: 0,
    errorStep: 0,
    backStep: 0,
    forward: true,
    error: false,
    back: false,
  };
}
