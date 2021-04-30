import { SortHelper } from './sort.helper';

fdescribe('SortHelper', () => {

  const sortHelper = new SortHelper();

  const convertToRomanTestData = [
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
      expect(sortHelper.isRomanNumber(testCase[0] as string)).toBeTruthy();
    });

    it(`${testCase[0]} should be converted to ${testCase[1]}`, () => {
      expect(sortHelper.convertRomanToNumber(testCase[0] as string)).toBe(testCase[1] as number);
    });
  });

  it(`'I' should be equal to 'I'`, () => {
    expect(sortHelper.compareAsRomanNumber('I', 'I')).toBe(0);
  });

  it(`'MMMCMXCIX' should be greater than 'DCLX'`, () => {
    expect(sortHelper.compareAsRomanNumber('MMMCMXCIX', 'DCLX')).toBeGreaterThan(0);
  });

  it(`'DCLX' should be smaller than 'MMMCMXCIX'`, () => {
    expect(sortHelper.compareAsRomanNumber('DCLX', 'MMMCMXCIX')).toBeLessThan(0);
  });

  it(`'A10' should be greater than 'A2'`, () => {
    expect(sortHelper.compareAsNumberWithLeadingLetter('A10', 'A2')).toBeGreaterThan(0);
  });

  it(`'AB10' should be greater than 'A10'`, () => {
    expect(sortHelper.compareAsNumberWithLeadingLetter('AB10', 'A10')).toBeGreaterThan(0);
  });

  it(`'A2' should be greater than 'A1'`, () => {
    expect(sortHelper.compareAsNumberWithLeadingLetter('A2', 'A1')).toBeGreaterThan(0);
  });

  it(`'B10' should be greater than 'A2'`, () => {
    expect(sortHelper.compareAsNumberWithLeadingLetter('B10', 'A2')).toBeGreaterThan(0);
  });

  it(`'A2' should be smaller than 'B10'`, () => {
    expect(sortHelper.compareAsNumberWithLeadingLetter('A2', 'B10')).toBeLessThan(0);
  });

  it(`'1.1' should be smaller than '10.0.1'`, () => {
    expect(sortHelper.compareAsNumberWithMultipleSections('1.1', '10.0.1')).toBeLessThan(0);
  });

  it(`'10.1' should be greater than '1.11.1'`, () => {
    expect(sortHelper.compareAsNumberWithMultipleSections('10.1', '1.11.1')).toBeGreaterThan(0);
  });

  it(`'2.1' should be smaller than '10.2'`, () => {
    expect(sortHelper.compareAsNumberWithMultipleSections('2.1', '10.2')).toBeLessThan(0);
  });

  it(`'3.1.1' should be smaller than '3.1.2'`, () => {
    expect(sortHelper.compareAsNumberWithMultipleSections('3.1.1', '3.1.2')).toBeLessThan(0);
  });

  it(`'3.1.2' should be greater than '3.0.3'`, () => {
    expect(sortHelper.compareAsNumberWithMultipleSections('3.1.2', '3.0.3')).toBeGreaterThan(0);
  });

  it('Should treat elements with roman numbers as codes accordingly', () => {
    const toSort = [
      { code: 'XI', text: 'second', type: 'drg', url: 'http:/path/second' },
      { code: 'V', text: 'first', type: 'drg', url: 'http:/path/first' }
    ];

    const result = sortHelper.sort(toSort);

    expect(result[0].text).toBe('first');
    expect(result[1].text).toBe('second');
  });

  it('Should treat elements with numbers with multiple sections as codes accordingly', () => {
    const toSort = [
      { code: '2.0.3', text: 'second', type: 'klv1s', url: 'http:/path/second' },
      { code: '1.1', text: 'first', type: 'klv1s', url: 'http:/path/first' },
      { code: '10', text: 'third', type: 'klv1s', url: 'http:/path/third' }
    ];

    const result = sortHelper.sort(toSort);

    expect(result[0].text).toBe('first');
    expect(result[1].text).toBe('second');
    expect(result[2].text).toBe('third');
  });

  it('Should treat elements with leading letters as codes accordingly', () => {
    const toSort = [
      { code: 'B190', text: 'second', type: 'drg', url: 'http:/path/second' },
      { code: 'A21', text: 'first', type: 'drg', url: 'http:/path/first' }
    ];

    const result = sortHelper.sort(toSort);

    expect(result[0].text).toBe('first');
    expect(result[1].text).toBe('second');
  });

  it('Should treat elements with normal numbers as codes accordingly', () => {
    const toSort = [
      { code: '34', text: 'second', type: 'drg', url: 'http:/path/second' },
      { code: '10', text: 'first', type: 'drg', url: 'http:/path/first' }
    ];

    const result = sortHelper.sort(toSort);

    expect(result[0].text).toBe('first');
    expect(result[1].text).toBe('second');
  });

  it('Should throw error when called with null', () => {
    expect(() => sortHelper.sort(null)).toThrowError();
  });

  const numberWithLeadingLetterTestData = [
    ['AB10', true],
    ['A10AA', false],
    ['100', false],
    ['AAAA', false],
    ['A560B33300AA90', false],
    ['ASDFGHGRERTRTR8900000', true]
  ];

  numberWithLeadingLetterTestData.forEach(testCase => {
    it(`Test on number with leading letter of '${testCase[0]}' should return ${testCase[1]}`, () => {
      expect(sortHelper.isNumberWithLeadingLetter(testCase[0] as string)).toBe(testCase[1] as boolean);
    });
  });

  const normalLiteralsTestData = [
    ['A', 'A', 0],
    ['A', 'B', -1],
    ['B', 'A', 1]
  ];

  normalLiteralsTestData.forEach(testCase => {
    it(`Comparison of '${testCase[0]}' with '${testCase[1]}' should return ${testCase[2]}`, () => {
      expect(sortHelper.compareAsLiteral(testCase[0] as string, testCase[1] as string)).toBe(testCase[2] as number);
    });
  });

});
