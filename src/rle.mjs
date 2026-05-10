export const patternFromString = str =>
  str.trim().split("\n").map(row => Array.from(row.trim()));

export const rleFromString = str => str.replaceAll(/\n +/g, "\n").trim();

export const getMetadata = rle => {
  const metadata = rle.match(/^x = (\d+), y = (\d+)/);
  return { x: parseInt(metadata[1]), y: parseInt(metadata[2]) };
};

export const patternFromRle = rle => {
  const metadata = getMetadata(rle);
  return [Array.from('b'.repeat(metadata.x))];
};
