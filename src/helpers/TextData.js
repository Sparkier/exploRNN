/**
 * A class for text data.
 *
 * This class manages the following:
 *
 * - Converting training data (as a string) into one-hot encoded vectors.
 * - Drawing random slices from the training data. This is useful for training
 *   models and obtaining the seed text for model-based text generation.
 */
export class TextData {
  /**
   * Constructor of TextData.
   *
   * @param {string} textString The training text data.
   */
  constructor(textString) {
    this.textString = textString;
    this.textLen = textString.length;
    this.getCharSet();
    this.convertAllTextToIndices();
  }

  /**
   * Convert text string to integer indices.
   *
   * @param {string} text Input text.
   * @return {number[]} Indices of the characters of `text`.
   */
  textToIndices(text) {
    const indices = [];
    for (let i = 0; i < text.length; ++i) {
      indices.push(this.charSet.indexOf(text[i]));
    }
    return indices;
  }

  /**
   * Get the set of unique characters from text.
   */
  getCharSet() {
    this.charSet = [];
    for (let i = 0; i < this.textLen; ++i) {
      if (this.charSet.indexOf(this.textString[i]) === -1) {
        this.charSet.push(this.textString[i]);
      }
    }
    this.charSetSize = this.charSet.length;
  }

  /**
   * Convert all training text to integer indices.
   */
  convertAllTextToIndices() {
    this.indices = new Uint16Array(this.textToIndices(this.textString));
  }

  /**
   * Get the unique character at given index from the character set.
   *
   * @param {number} index
   * @return {string} The unique character at `index` of the character set.
   */
  getFromCharSet(index) {
    return this.charSet[index];
  }

  /**
   * Get a character from a one-hot array.
   *
   * @param {array} arr the one-hot encoding of the character index
   * @return {String} the character that is most activated
   */
  getFromOneHot(arr) {
    const index = arr.indexOf(Math.max(...arr));
    return this.getFromCharSet(index);
  }
}
