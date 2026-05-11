import { describe, expect, test } from "vitest";
import {
  patternFromString,
  rleFromString,
} from './utils.mjs';
import {
  encodeRepetition,
  rleFromPattern,
} from '../src/rleFromPattern.mjs';

describe('encodeRepetition()', () => {
  test('can encode repetition in "o"', () => {
    expect(encodeRepetition('o')).toBe('o');
  });

  test('can encode repetition in "oo"', () => {
    expect(encodeRepetition('oo')).toBe('2o');
  });

  test('can encode repetition in "bb"', () => {
    expect(encodeRepetition('bb')).toBe('2b');
  });

  test('can encode repetition in "bboo"', () => {
    expect(encodeRepetition('bboo')).toBe('2b2o');
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

  test('can encode glider pattern with RLE', () => {
    const pattern = patternFromString(`
      bob
      bbo
      ooo
    `);
    expect(rleFromPattern(pattern)).toBe(rleFromString(`
      x = 3, y = 3, rule = B3/S23
      bo$2bo$3o!
    `));
  });

  test('breaks lines longer than 70 characters', () => {
    const pattern = patternFromString(`
      bobobobobobobobobobobobobobobobobobobobobobobobobobobobobobobobo
      bobobobobobobobobobobobobobobobobobobobobobobobobobobobobobobobo
      bobobobobobobobobobobobobobobobobobobobobobobobobobobobobobobobo
    `);
    expect(rleFromPattern(pattern)).toBe(rleFromString(`
      x = 64, y = 3, rule = B3/S23
      bobobobobobobobobobobobobobobobobobobobobobobobobobobobobobobobo$bobob
      obobobobobobobobobobobobobobobobobobobobobobobobobobobobobo$bobobobobo
      bobobobobobobobobobobobobobobobobobobobobobobobobobobo!
    `));
  });
});
