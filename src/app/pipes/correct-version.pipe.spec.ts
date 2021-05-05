import { CorrectVersionPipe } from './correct-version.pipe';

describe('CorrectVersionPipe', () => {

  const pipe: CorrectVersionPipe = new CorrectVersionPipe();

  it('Should remove leading "CHOP_"', () => {
    const res = pipe.transform('CHOP_Test');
    expect(res).toBe('Test');
  });

  it('Should remove leading "ICD"', () => {
    const res = pipe.transform('ICDTest');
    expect(res).toBe('Test');
  });

  it('Should not change other string', () => {
    const res = pipe.transform('CHOPS_Test');
    expect(res).toBe('CHOPS_Test');
  });

  it('Should not remove "1-V2-2\d"', () => {
    const res = pipe.transform('KLV-V2');
    expect(res).toBe('KLV-V2');
  });

  it('Should not remove "1-V2-2\d" or "1-V2-2\d', () => {
    const res = pipe.transform('KLV1-V3');
    expect(res).toBe('KLV1-V3');
  });

  it('Should not remove "1-V2-2\d" or "1-V2-2\d', () => {
    const res = pipe.transform('KLV1-VA');
    expect(res).toBe('KLV1-VA');
  });

  it('Should not remove "1-V2-2\d"', () => {
    const res = pipe.transform('KLV1-V2-2');
    expect(res).toBe('KLV1-V2-2');
  });

  it('Should not remove "1-V1-2\d"', () => {
    const res = pipe.transform('KLV1-V1-19');
    expect(res).toBe('KLV1-V1-19');
  });

  it('Should remove "1-V2-2\d"', () => {
    const res = pipe.transform('KLV1-V2-2020');
    expect(res).toBe('KLV 1 (1/7/20)');
  });

  it('Should remove "1-V1-2\d"', () => {
    const res = pipe.transform('KLV1-V1-2022');
    expect(res).toBe('KLV 1 (1/1/22)');
  });

  it('Should return null', () => {
    const res = pipe.transform(null);
    expect(res).toBe(null);
  });
});
