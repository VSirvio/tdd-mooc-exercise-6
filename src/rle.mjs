export const patternFromString = str =>
  str.trim().split("\n").map(row => Array.from(row.trim()));

export const rleFromString = str => str.replaceAll(/\n +/g, "\n").trim();

export const encodeRepetition = str => {
  let remainingStr = str;
  let result = '';
  while (remainingStr) {
    const character = remainingStr[0];
    remainingStr = remainingStr.slice(1);
    let count = 1;
    while (remainingStr[0] === character) {
      remainingStr = remainingStr.slice(1);
      count++;
    }
    result += `${count > 1 ? count : ''}${character}`;
  }
  return result;
};

export const rleFromPattern = pattern => {
  const width = pattern[0].length;
  const height = pattern.length;

  const firstLine = `x = ${width}, y = ${height}, rule = B3/S23\n`;

  const rows = pattern.map(row => row.join('').replace(/b+$/, ''));
  const rleCodedCellData = encodeRepetition(`${rows.join('$').replace(/\$+$/, '')}!`);

  return firstLine + rleCodedCellData;
};
