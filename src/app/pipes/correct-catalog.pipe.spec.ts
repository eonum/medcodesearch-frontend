import { CorrectCatalogPipe } from './correct-catalog.pipe';

describe('CorrectCatalogPipe', () => {
  const pipe: CorrectCatalogPipe = new CorrectCatalogPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should return null', () => {
    expect(pipe.transform(null)).toBe(null);
  });

  it('Should return null', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });

  it('Should not transform empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('Should not transform normal phrase', () => {
    expect(pipe.transform('Ein normaler Text')).toBe('Ein normaler Text');
  });

  it('Should not transform normal phrase with surrounding brackets', () => {
    expect(pipe.transform('(bei)')).toBe('(bei)');
  });

  it('Should not transform digits', () => {
    expect(pipe.transform('123')).toBe('123');
  });

  it('Should not transform number with leading letter', () => {
    expect(pipe.transform('K123')).toBe('K123');
  });

  it('Should not transform invalid catalog', () => {
    expect(pipe.transform('KLV1 V2 20')).toBe('KLV Anhang 1 (01/07/20)');
  });

  it('Should remove "1 V1 " or "1 V2 "', () => {
    expect(pipe.transform('KLV')).toBe('KLV');
  });

  it('Should not remove "1 V1 " or "1 V2 "', () => {
    expect(pipe.transform('KLV VA')).toBe('KLV VA');
  });

  it('Should not remove "1 V1 " or "1 V2 "', () => {
    expect(pipe.transform('KLV1 VA')).toBe('KLV1 VA');
  });

  it('Should not remove "1 V1 "', () => {
    expect(pipe.transform('KLV1 V1 ')).toBe('KLV1 V1 ');
  });

  it('Should not remove "1 V2 "', () => {
    expect(pipe.transform('KLV1 V2 1')).toBe('KLV1 V2 1');
  });

  it('Should not remove "1 V2 "', () => {
    expect(pipe.transform('KLV1 V2 2')).toBe('KLV1 V2 2');
  });

  it('Should remove "1 V1 "', () => {
    expect(pipe.transform('KLV1 V1 2025')).toBe('KLV Anhang 1 (01/01/2025)');
  });

  it('Should remove "1 V2 "', () => {
    expect(pipe.transform('KLV1 V2 22')).toBe('KLV Anhang 1 (01/07/22)');
  });
});
