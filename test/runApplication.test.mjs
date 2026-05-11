import { describe, expect, test } from "vitest";
import runApplication from '../src/runApplication.mjs';
import { rleFromString } from './utils.mjs';

describe('runApplication()', () => {
  test('gives correct output for Gosper glider gun after 1 generation', async () => {
    const output = await runApplication(['./test/testdata/gosperglidergun.rle', '1']);
    const expectedOutput = rleFromString(`
      x = 36, y = 9, rule = B3/S23
      23bo$21bobo$12bo7bobo11b2o$11b2o6bo2bo11b2o$2o8b2o4b2o2bobo$2o7b3o4b2o
      3bobo$10b2o4b2o5bo$11b2o$12bo!
    `);
    expect(output).toBe(expectedOutput);
  });
});
