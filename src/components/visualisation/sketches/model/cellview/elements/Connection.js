/**
 * This class represents a connection between two or more items
 * in the lstm cell model
 */
export class Connection {
  /**
   * The constructor function of the connection
   *
   * @param {array} verts the vertices of the connection line
   * @param {Item} goesTo the item this connection connects to
   * @param {object} s the p5 sketch
   */
  constructor(verts, goesTo, s) {
    this.verts = verts;
    this.next = goesTo;
    this.s = s;
    this.active = false;
    this.negativeActivation = false;
    this.hover = false;
    this.activeInputs = 0;
  }

  /**
   * The drawing function of connection class, responsible for drawing
   * the connection line according to the set values
   */
  draw() {
    const s = this.s;
    s.noFill();
    s.stroke(s.colors.grey);
    s.strokeWeight(1);
    if (this.active) {
      s.stroke(s.colors.detail);
      s.strokeWeight(4);
      s.drawingContext.lineDashOffset = -s.frameCount/2;
      s.drawingContext.setLineDash([10, 10]);
    } else if (s.cellAnim.back && this.negativeActivation) {
      s.stroke(s.colors.detail);
      s.strokeWeight(4);
      s.drawingContext.lineDashOffset = s.frameCount/2;
      s.drawingContext.setLineDash([10, 10]);
    }
    if (this.hover) {
      s.stroke(s.colors.detaillight);
      s.drawingContext.lineDashOffset = -s.frameCount/2;
      s.drawingContext.setLineDash([10, 10]);
    }
    s.strokeJoin(s.ROUND);
    s.beginShape();
    for (const v of this.verts) {
      s.vertex(v.x, v.y);
    }
    s.endShape();
    s.drawingContext.setLineDash([]);
  }

  /**
   * Increases the amount of active inputs, since connections only can
   * have one active input this function is equal to setting the connection
   * to active
   */
  addActiveInput() {
    this.activeInputs += 1;
  }

  /**
   * Increases the amount of active inputs, since connections only can
   * have one active input this function is equal to setting the connection
   * to active
   */
  addNegativeInput() {
    this.negativeActivation = true;
  }

  /**
   * Removes the current activations
   */
  deactivate() {
    this.active = false;
    this.negativeActivation = false;
    this.activeInputs = 0;
  }

  /**
   * If this current connection is active it will activate all following
   * items, meaning all items this connection connects to
   */
  sendActivations() {
    if (this.active && this.next && this.next.length > 0) {
      for (const n of this.next) {
        n.addActiveInput();
      }
    }
  }

  /**
   * this function is responsible for always keeping the activation status
   * of this connection up to date, getting called at the end of each updating
   * cycle to make sure no connection stays active/inactive when it
   * shouldn't be
   */
  updateActivation() {
    if (this.active) {
      this.active = false;
      this.activeInputs = 0;
    } else {
      if (this.activeInputs !== 0) {
        this.active = true;
      }
    }
  }
}
