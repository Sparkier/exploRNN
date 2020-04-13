/**
 * This class represents a heading in the p5 visualizations
 */
export class Heading {
  /**
   * The construcor function of the layer class
   *
   * @param {object} s the p5 sketch
   * @param {number} x the x position of the heading
   * @param {number} y the y position of the heading
   * @param {String} dialog the dialog that this heading should show
   */
  constructor(s, x, y, dialog) {
    this.s = s;
    this.active = false;
    this.hover = false;
    this.clicked = false;
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.dialog = dialog;
  }

  /**
   * This function is responsible of drawing the current layer onto
   * the p5 canvas
   *
   * @param {String} title the title that should be displayed
   */
  draw(title) {
    const s = this.s;
    s.textAlign(s.LEFT, s.CENTER);
    s.textSize(s.typography.fontsize);
    s.fill(s.colors.darkgrey);
    s.noStroke();
    s.text(title, this.x, this.y);
    this.width = s.textWidth(title);
    this.height = s.textSize(title);
    if (this.hover) {
      s.noFill();
      s.stroke(s.colors.darkgrey);
      s.strokeWeight(1);
      s.line(this.x, this.y + (this.height / 2) - 2, this.x+this.width,
          this.y + (this.height / 2) - 2);
    }
  }

  /**
   * This function gets called if the mouse has been moved and checks
   * if this current layer is being hovered over
   *
   * @param {number} x the x position of the cursor
   * @param {number} y the y position of the cursor
   */
  mouseMoved(x, y) {
    if (x > this.x && x < this.x + this.width &&
        y > this.y - this.height / 2 && y < this.y + this.height / 2) {
      this.hover = true;
    } else {
      this.hover = false;
    }
  }

  /**
   * This function is called when the user clicks on the canvas, it then
   * checks if this layer is being clicked on
   *
   * @return {boolean} whether the click was actually on this component
   */
  checkClick() {
    // If this layer is hovered, handle the click
    if (this.hover) {
      this.s.props.actions.updateAppState(
          {...this.s.props.appState, headingDialog: this.dialog}
      );
      return true;
    }
    this.hover = false;
    return false;
  }
}
