import { readFile } from 'node:fs/promises';
import Pattern from './Pattern.mjs';
import { patternFromRle } from './patternFromRle.mjs';
import { rleFromPattern } from './rleFromPattern.mjs';

const runApplication = async args => {
  if (args.length !== 2) {
    throw new Error('The command takes exactly two arguments');
  }

  const inputRle = await readFile(args[0], { encoding: 'utf8' });
  const generationCount = parseInt(args[1]);
  let pattern = new Pattern(patternFromRle(inputRle));
  for (let i = 0; i < generationCount; i++) {
    pattern = pattern.nextGeneration();
  }
  return rleFromPattern(pattern.as2DArray());
};

export default runApplication;
