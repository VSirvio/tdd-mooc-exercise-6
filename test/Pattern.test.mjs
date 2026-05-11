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

  test('does not allow modifying itself by modifying the array used for its initialization', () => {
    const patternArray = patternFromString(`
      b
    `);
    const pattern = new Pattern(patternArray);
    patternArray[0][0] = 'o';
    expect(pattern.as2DArray()).toEqual([['b']]);
  });

  test('does not allow modifying itself by modifying the array returned by as2DArray()', () => {
    const patternArray = patternFromString(`
      b
    `);
    const pattern = new Pattern(patternArray);
    const returnedArray = pattern.as2DArray();
    returnedArray[0][0] = 'o';
    expect(pattern.as2DArray()).toEqual([['b']]);
  });

  test('can simulate the next generation for 1x1 all dead pattern', () => {
    const initialPattern = new Pattern(patternFromString(`
      b
    `));
    const expectedResult = new Pattern(patternFromString(`
      b
    `));
    expect(initialPattern.nextGeneration().as2DArray())
      .toEqual(expectedResult.as2DArray());
  });
});
