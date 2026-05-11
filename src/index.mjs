import runApplication from './runApplication.mjs';

try {
  console.log(await runApplication(process.argv.slice(2)));
} catch (error) {
  console.error(`Error: ${error.message}`);
}
