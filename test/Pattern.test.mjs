import { describe, expect, test } from "vitest";
import { patternFromString } from './utils.mjs';
import Pattern from '../src/Pattern.mjs';

describe('Pattern', () => {
  test('returns correct 2D array for glider', () => {
    const patternArray = patternFromString(`
      bob
      bbo
      ooo
    `);
    const pattern = new Pattern(patternArray);
    expect(pattern.as2DArray()).toEqual(patternArray);
  });
});
