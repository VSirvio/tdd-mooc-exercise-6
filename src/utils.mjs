export const duplicateOf = arr => arr.map(row => Array.from(row));

export const withMargin = arr => {
  return [
    'bbb'.split(''),
    ['b', arr[0][0], 'b'],
    'bbb'.split('')
  ];
};
