import { describe, expect, test } from "vitest";
import {
  getCellData,
  getMetadata,
  patternFromRle,
  patternFromString,
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
