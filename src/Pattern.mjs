import { duplicateOf } from './utils.mjs';

const NEIGHBOR_COORDS = [
  { dx: -1, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 1 }, { dx: 0, dy: -1 },
  { dx: 0, dy: 1 }, { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 },
];

class Pattern {
  #arr;

  constructor(arr) {
    this.#arr = duplicateOf(arr);
  }

  as2DArray() {
    return duplicateOf(this.#arr);
  }

  neighborsAliveCount(x, y) {
    const neighbors = NEIGHBOR_COORDS.map(({ dx, dy }) => this.#arr[y + dy][x + dx]);
    return neighbors.filter(neighbor => neighbor === 'o').length;
  }

  nextGeneration() {
    const result = Array(this.#arr.length).fill(null).map(() =>
      Array.from('b'.repeat(this.#arr[0].length))
    );
    return new Pattern(result);
  }
}

export default Pattern;
