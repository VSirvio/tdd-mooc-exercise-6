import { duplicateOf } from './utils.mjs';

class Pattern {
  #arr;

  constructor(arr) {
    this.#arr = duplicateOf(arr);
  }

  as2DArray() {
    return duplicateOf(this.#arr);
  }

  nextGeneration() {
    const result = Array(this.#arr.length).fill(null).map(() =>
      Array.from('b'.repeat(this.#arr[0].length))
    );
    return new Pattern(result);
  }
}

export default Pattern;
