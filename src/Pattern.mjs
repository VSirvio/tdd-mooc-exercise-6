import { withMargin, withoutMargin } from './utils.mjs';

const NEIGHBOR_COORDS = [
  { dx: -1, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 1 }, { dx: 0, dy: -1 },
  { dx: 0, dy: 1 }, { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 },
];

class Pattern {
  #arr;

  constructor(arr) {
    this.#arr = withMargin(arr, 1);
  }

  as2DArray() {
    return withoutMargin(this.#arr, 1);
  }

  neighborsAliveCount(x, y) {
    const neighbors = NEIGHBOR_COORDS.map(({ dx, dy }) => this.#arr[y + dy][x + dx]);
    return neighbors.filter(neighbor => neighbor === 'o').length;
  }

  nextGeneration() {
    const result = Array(this.#arr.length).fill(null).map(() =>
      Array.from('b'.repeat(this.#arr[0].length))
    );

    for (let y = 1; y < this.#arr.length - 1; y++) {
      for (let x = 1; x < this.#arr[y].length - 1; x++) {
        const neighborsAliveCount = this.neighborsAliveCount(x, y);

        if (this.#arr[y][x] === 'o' && neighborsAliveCount > 1) {
          result[y][x] = 'o';
        }
      }
    }

    return new Pattern(withoutMargin(result, 1));
  }
}

export default Pattern;
