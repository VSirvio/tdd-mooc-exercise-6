export const duplicateOf = arr => arr.map(row => Array.from(row));

export const withMargin = (arr, width) => {
  width = width || 1;
  return [
    ...Array(width).fill(null).map(() => 'b'.repeat(arr[0].length + 2 * width).split('')),
    ...arr.map(row => [...'b'.repeat(width), ...row, ...'b'.repeat(width)]),
    ...Array(width).fill(null).map(() => 'b'.repeat(arr[0].length + 2 * width).split('')),
  ];
};

export const withoutMargin = (arr, width) => {
  return arr.slice(width, -width).map(row => row.slice(width, -width));
};

export const breakLongLines = (str, lineLength) => {
  return str.slice(0, lineLength) + "\n" + str.slice(lineLength);
};
