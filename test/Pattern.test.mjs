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

  test('can simulate the next generation for 2x2 all dead pattern', () => {
    const initialPattern = new Pattern(patternFromString(`
      bb
      bb
    `));
    const expectedResult = new Pattern(patternFromString(`
      bb
      bb
    `));
    expect(initialPattern.nextGeneration().as2DArray())
      .toEqual(expectedResult.as2DArray());
  });

  test('can simulate the next generation for 1x1 block pattern', () => {
    const initialPattern = new Pattern(patternFromString(`
      bbb
      bob
      bbb
    `));
    const expectedResult = new Pattern(patternFromString(`
      bbb
      bbb
      bbb
    `));
    expect(initialPattern.nextGeneration().as2DArray())
      .toEqual(expectedResult.as2DArray());
  });

  test('can count neighbors alive for 3x3 all dead pattern', () => {
    const pattern = new Pattern(patternFromString(`
      bbb
      bbb
      bbb
    `));
    expect(pattern.neighborsAliveCount(2, 2)).toBe(0);
  });

  test('can count neighbors alive for glider pattern', () => {
    const pattern = new Pattern(patternFromString(`
      bob
      bbo
      ooo
    `));
    expect(pattern.neighborsAliveCount(2, 2)).toBe(5);
  });

  test('can simulate the next generation for 2x2 block pattern', () => {
    const initialPattern = new Pattern(patternFromString(`
      bbbb
      boob
      boob
      bbbb
    `));
    const expectedResult = new Pattern(patternFromString(`
      bbbb
      boob
      boob
      bbbb
    `));
    expect(initialPattern.nextGeneration().as2DArray())
      .toEqual(expectedResult.as2DArray());
  });

  test('can simulate the next generation for 2x2 block pattern without border', () => {
    const initialPattern = new Pattern(patternFromString(`
      oo
      oo
    `));
    const expectedResult = new Pattern(patternFromString(`
      oo
      oo
    `));
    expect(initialPattern.nextGeneration().as2DArray())
      .toEqual(expectedResult.as2DArray());
  });
});
