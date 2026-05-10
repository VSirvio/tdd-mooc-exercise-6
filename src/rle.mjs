export const patternFromString = str =>
  str.trim().split("\n").map(row => Array.from(row.trim()));

export const rleFromString = str => str.replaceAll(/\n +/g, "\n").trim();

export const getMetadata = rle => {
  const metadata = rle.match(/^x = (\d+), y = (\d+)/);
  return { x: parseInt(metadata[1]), y: parseInt(metadata[2]) };
};

export const getCellData = rle => {
  const rleCodedRows = rle.split("\n").slice(1).join().slice(0, -1).split('$');
  const cellData = rleCodedRows.map(row => {
    let remainingRow = row;
    let result = '';
    while (remainingRow) {
      const match = remainingRow.match(/^(\d*)(b|o)/);
      let count = 1;
      if (match[1]) {
        count = parseInt(match[1]);
      }
      result += match[2].repeat(count);
      remainingRow = remainingRow.slice(match[0].length);
    }
    return result;
  });
  return cellData;
};

export const patternFromRle = rle => {
  const metadata = getMetadata(rle);
  const cellData = getCellData(rle);
  const result = Array(metadata.y).fill(null).map(() =>
    Array.from('b'.repeat(metadata.x))
  );
  for (let y = 0; y < cellData.length; y++) {
    for (let x = 0; x < cellData[y].length; x++) {
      result[y][x] = cellData[y][x];
    }
  }
  return result;
};

export const rleFromPattern = pattern => {
  const width = pattern[0].length;
  const height = pattern.length;

  const firstLine = `x = ${width}, y = ${height}, rule = B3/S23\n`;

  const rows = pattern.map(row => row.join('').replace(/b+$/, ''));
  const rleCodedCellData = `${rows.join('$').replace(/\$+$/, '')}!`;

  return firstLine + rleCodedCellData;
};
