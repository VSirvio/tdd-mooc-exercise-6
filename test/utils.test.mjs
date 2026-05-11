import { describe, expect, test } from "vitest";
import {
  patternFromString,
  rleFromString,
} from './utils.mjs';
import { withMargin } from '../src/utils.mjs';

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

describe('withMargin()', () => {
  test('can add margin to 1x1 all alive pattern', () => {
    const pattern = patternFromString(`
      o
    `);
    expect(withMargin(pattern)).toEqual(patternFromString(`
      bbb
      bob
      bbb
    `));
  });

  test('can add margin to 1x1 all dead pattern', () => {
    const pattern = patternFromString(`
      b
    `);
    expect(withMargin(pattern)).toEqual(patternFromString(`
      bbb
      bbb
      bbb
    `));
  });

  test('can add margin to 2x1 all alive pattern', () => {
    const pattern = patternFromString(`
      oo
    `);
    expect(withMargin(pattern)).toEqual(patternFromString(`
      bbbb
      boob
      bbbb
    `));
  });
});
