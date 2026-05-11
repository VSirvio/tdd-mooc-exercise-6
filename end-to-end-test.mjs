import { exec as nodeExec } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(nodeExec);

const appOutput = await exec('node src/index.mjs test/testdata/gosperglidergun.rle 1');

const expected = `x = 36, y = 9, rule = B3/S23
23bo$21bobo$12bo7bobo11b2o$11b2o6bo2bo11b2o$2o8b2o4b2o2bobo$2o7b3o4b2o
3bobo$10b2o4b2o5bo$11b2o$12bo!`;
console.log(`expected:\n${expected}\n`)

const got = appOutput.stdout.trim();
console.log(`got:\n${got}\n`);

if (expected === got) {
  console.log('=> SUCCESS');
} else {
  console.log('=> FAILURE');
}
