export const patternFromString = str =>
  str.trim().split("\n").map(row => Array.from(row.trim()));

export const rleFromString = str => str.replaceAll(/\n +/g, "\n").trim();

export const getMetadata = rle => {
  const metadata = rle.match(/^x = (\d+), y = (\d+)/);
  return { x: parseInt(metadata[1]), y: parseInt(metadata[2]) };
};

export const getCellData = rle => {
  const cellData = rle.split("\n").slice(1).join().slice(0, -1);
  const match = cellData.match(/^(\d*)(b|o)/);
  let count = 1;
  if (match[1]) {
    count = parseInt(match[1]);
  }
  return [match[2].repeat(count)];
};

export const patternFromRle = rle => {
  const metadata = getMetadata(rle);
  return Array(metadata.y).fill(null).map(() =>
    Array.from('b'.repeat(metadata.x))
  );
};
