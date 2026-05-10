import { describe, expect, test } from "vitest";
import {
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
});
