import { duplicateOf } from './utils.mjs';

class Pattern {
  #arr;

  constructor(arr) {
    this.#arr = duplicateOf(arr);
  }

  as2DArray() {
    return duplicateOf(this.#arr);
  }
}

export default Pattern;
