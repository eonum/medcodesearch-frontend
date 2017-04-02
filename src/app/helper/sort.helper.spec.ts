import { SortHelper } from "./sort.helper";

describe('SortHelper', () => {

  let convertToRomanTestData = [
    ['I', 1],
    ['II', 2],
    ['III', 3],
    ['IV', 4],
    ['X', 10],
    ['IX', 9],
    ['MMMCMXCIX', 3999],
    ['DCLX', 660]
  ];

  convertToRomanTestData.forEach(testCase => {
    it(`${testCase[0]} should be a roman number`, () => {
      expect(SortHelper.isRomanNumber(testCase[0] as string)).toBeTruthy();
    });

    it(`${testCase[0]} should be converted to ${testCase[1]}`, () => {
      expect(SortHelper.convertRomanToNumber(testCase[0] as string)).toBe(testCase[1]);
    });
  });

  it(`'I' should be equal to 'I'`, () => {
    expect(SortHelper.compareAsRomanNumber('I', 'I')).toBe(0);
  });

  it(`'MMMCMXCIX' should be greater than 'DCLX'`, () => {
    expect(SortHelper.compareAsRomanNumber('MMMCMXCIX', 'DCLX')).toBeGreaterThan(0);
  });

  it(`'DCLX' should be smaller than 'MMMCMXCIX'`, () => {
    expect(SortHelper.compareAsRomanNumber('DCLX', 'MMMCMXCIX')).toBeLessThan(0);
  });

  it(`'A10' should be greater than 'A2'`, () => {
    expect(SortHelper.compareAsNumberWithLeadingLetter('A10', 'A2')).toBeGreaterThan(0);
  });

  it(`'AB10' should be greater than 'A10'`, () => {
    expect(SortHelper.compareAsNumberWithLeadingLetter('AB10', 'A10')).toBeGreaterThan(0);
  });

  it(`'A2' should be greater than 'A1'`, () => {
    expect(SortHelper.compareAsNumberWithLeadingLetter('A2', 'A1')).toBeGreaterThan(0);
  });

  it(`'B10' should be greater than 'A2'`, () => {
    expect(SortHelper.compareAsNumberWithLeadingLetter('B10', 'A2')).toBeGreaterThan(0);
  });

  let numberWithLeadingLetterTestData = [
    ['AB10', true],
    ['A10AA', false],
    ['100', false],
    ['AAAA', false],
    ['A560B33300AA90', false],
    ['ASDFGHGRERTRTR8900000', true]
  ];

  numberWithLeadingLetterTestData.forEach(testCase => {
    it(`Test on number with leading letter of '${testCase[0]}' should return ${testCase[1]}`, () => {
      expect(SortHelper.isNumberWithLeadingLetter(testCase[0] as string)).toBe(testCase[1]);
    })
  });
});
