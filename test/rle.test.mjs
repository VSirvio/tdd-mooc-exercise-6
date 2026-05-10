import { describe, expect, test } from "vitest";
import {
  encodeRepetition,
  getCellData,
  getMetadata,
  patternFromRle,
  patternFromString,
  rleFromPattern,
  rleFromString,
} from '../src/rle.mjs';

describe('rleFromString()', () => {
  test('can read 1x1 all dead pattern from string', () => {
    const rleString = `
      x = 1, y = 1, rule = B3/S23
      !
    `;
    expect(rleFromString(rleString)).toBe("x = 1, y = 1, rule = B3/S23\n!");
  });
});

describe('patternFromString()', () => {
  test('can read 1x1 all dead pattern from string', () => {
    const patternString = `
      b
    `;
    expect(patternFromString(patternString)).toEqual([['b']]);
  });
});

describe('getMetadata()', () => {
  test('returns the x dimension of the pattern', () => {
    const rle = rleFromString(`
      x = 1, y = 1, rule = B3/S23
      !
    `);
    const metadata = getMetadata(rle);
    expect(metadata.x).toBe(1);
  });

  test('returns the y dimension of the pattern', () => {
    const rle = rleFromString(`
      x = 1, y = 1, rule = B3/S23
      !
    `);
    const metadata = getMetadata(rle);
    expect(metadata.y).toBe(1);
  });
});

describe('getCellData()', () => {
  test('can read cell data for "o!"', () => {
    const rle = rleFromString(`
      x = 3, y = 1, rule = B3/S23
      o!
    `);
    expect(getCellData(rle)).toEqual(['o']);
  });

  test('can read cell data for "2o!"', () => {
    const rle = rleFromString(`
      x = 3, y = 1, rule = B3/S23
      2o!
    `);
    expect(getCellData(rle)).toEqual(['oo']);
  });

  test('can read cell data for "b2o!"', () => {
    const rle = rleFromString(`
      x = 3, y = 1, rule = B3/S23
      b2o!
    `);
    expect(getCellData(rle)).toEqual(['boo']);
  });

  test('can read cell data for glider', () => {
    const rle = rleFromString(`
      x = 3, y = 3, rule = B3/S23
      bo$2bo$3o!
    `);
    expect(getCellData(rle)).toEqual(['bo', 'bbo', 'ooo']);
  });
});

describe('encodeRepetition()', () => {
  test('can encode repetition in "o"', () => {
    expect(encodeRepetition('o')).toBe('o');
  });
});

describe('patternFromRle()', () => {
  test('can read 1x1 all dead pattern from RLE format', () => {
    const rle = rleFromString(`
      x = 1, y = 1, rule = B3/S23
      !
    `);
    expect(patternFromRle(rle)).toEqual(patternFromString(`
      b
    `));
  });

  test('can read 2x1 all dead pattern from RLE format', () => {
    const rle = rleFromString(`
      x = 2, y = 1, rule = B3/S23
      !
    `);
    expect(patternFromRle(rle)).toEqual(patternFromString(`
      bb
    `));
  });

  test('can read 3x2 all dead pattern from RLE format', () => {
    const rle = rleFromString(`
      x = 3, y = 2, rule = B3/S23
      !
    `);
    expect(patternFromRle(rle)).toEqual(patternFromString(`
      bbb
      bbb
    `));
  });

  test('can read glider pattern from RLE format', () => {
    const rle = rleFromString(`
      x = 3, y = 3, rule = B3/S23
      bo$2bo$3o!
    `);
    expect(patternFromRle(rle)).toEqual(patternFromString(`
      bob
      bbo
      ooo
    `));
  });
});

describe('rleFromPattern()', () => {
  test('can encode 1x1 all alive pattern with RLE', () => {
    const pattern = patternFromString(`
      o
    `);
    expect(rleFromPattern(pattern)).toBe(rleFromString(`
      x = 1, y = 1, rule = B3/S23
      o!
    `));
  });

  test('can encode 2x1 "bo" pattern with RLE', () => {
    const pattern = patternFromString(`
      bo
    `);
    expect(rleFromPattern(pattern)).toBe(rleFromString(`
      x = 2, y = 1, rule = B3/S23
      bo!
    `));
  });

  test('can encode 2x2 "bo$bo!" pattern with RLE', () => {
    const pattern = patternFromString(`
      bo
      bo
    `);
    expect(rleFromPattern(pattern)).toBe(rleFromString(`
      x = 2, y = 2, rule = B3/S23
      bo$bo!
    `));
  });

  test('can encode 2x1 "o!" pattern with RLE', () => {
    const pattern = patternFromString(`
      ob
    `);
    expect(rleFromPattern(pattern)).toBe(rleFromString(`
      x = 2, y = 1, rule = B3/S23
      o!
    `));
  });

  test('can encode 1x2 "o!" pattern with RLE', () => {
    const pattern = patternFromString(`
      o
      b
    `);
    expect(rleFromPattern(pattern)).toBe(rleFromString(`
      x = 1, y = 2, rule = B3/S23
      o!
    `));
  });
});
