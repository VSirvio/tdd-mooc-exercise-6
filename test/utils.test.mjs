import { describe, expect, test } from "vitest";
import {
  patternFromString,
  rleFromString,
} from './utils.mjs';

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
