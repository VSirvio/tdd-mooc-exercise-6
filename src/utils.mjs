export const duplicateOf = arr => arr.map(row => Array.from(row));

export const withMargin = arr => {
  return [
    'b'.repeat(arr[0].length + 2).split(''),
    ...arr.map(row => ['b', ...row, 'b']),
    'b'.repeat(arr[0].length + 2).split(''),
  ];
};
