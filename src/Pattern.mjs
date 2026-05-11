class Pattern {
  #arr;

  constructor(arr) {
    this.#arr = arr.map(row => Array.from(row));
  }

  as2DArray() {
    return this.#arr;
  }
}

export default Pattern;
