export const duplicateOf = arr => arr.map(row => Array.from(row));

export const withMargin = arr => {
  return [
    'b'.repeat(arr[0].length + 2).split(''),
    ['b', ...arr[0], 'b'],
    'b'.repeat(arr[0].length + 2).split(''),
  ];
};
