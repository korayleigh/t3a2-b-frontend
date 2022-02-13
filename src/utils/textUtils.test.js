import {formatCentsAsDollars, formatDollarsAsCents, reformatDollarsAsDollars} from './textUtils.js';

describe('formatCentsAsDollars', () => {
  test('it correctly adds a dot in a 4 character integer', () => {
    expect(formatCentsAsDollars(2000)).toBe('20.00');
  }); 
  test('it correctly adds a dot in a 2 character integer', () => {
    expect(formatCentsAsDollars(20)).toBe('0.20');
  }); 
  test('it correctly adds a dot in a 1 character integer', () => {
    expect(formatCentsAsDollars(2)).toBe('0.02');
  }); 
});


describe('formatDollarsAsCents', () => {
  test('it correctly interprets a 4 character number string', () => {
    expect(formatDollarsAsCents('20.00')).toBe(2000);
  });
  test('it correctly interprets a 2 character number string', () => {
    expect(formatDollarsAsCents('.20')).toBe(20);
  });
  test('it correctly interprets a 1 character number string', () => {
    expect(formatDollarsAsCents('0.02')).toBe(2);
  });
});

describe('reformatDollarsAsDollars', () => {
  test('it corrects a dot in the wrong place', () => {
    expect(reformatDollarsAsDollars('2.000')).toBe('20.00');
  });
  test('it removes any non digit characters', () => {
    expect(reformatDollarsAsDollars('2k5a1n5')).toBe('25.15');
  });
});
