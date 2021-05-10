import { ConvertTextPipe } from './convert-text.pipe';

describe('ConvertTextPipe', () => {
  const pipe: ConvertTextPipe = new ConvertTextPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should not transform empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('Should not transform normal phrase', () => {
    expect(pipe.transform('Ein normaler Text')).toBe('Ein normaler Text');
  });

  it('Should not transform list with last element longer than 130 characters', () => {
    expect(pipe.transform('Introduction phrase:\n– first element\n– last element.\nThis should not be displayed as a list,\nbecause it is a separate phrase that has nothing to do with the enumeration before it.')).toBe('Introduction phrase:\n– first element\n– last element.\nThis should not be displayed as a list,\nbecause it is a separate phrase that has nothing to do with the enumeration before it.');
  });

  it('Should transform list with numbers', () => {
    expect(pipe.transform('1. first element\n2. second element\n3. third element')).toBe('1. first element<br>2. second element<br>3. third element');
  });

  it('Should transform list with letters', () => {
    expect(pipe.transform('a) first element\nb) second element\nc) third element')).toBe('a) first element<br>b) second element<br>c) third element');
  });

  it('Should transform list', () => {
    expect(pipe.transform('– first element\n– second element\n– third element')).toBe('<ul><li>first element</li><li>second element</li><li>third element</li></ul>');
  });

  it('Should transform list with phrase before', () => {
    expect(pipe.transform('Introduction phrase:\n– first element\n– second element\n– third element')).toBe('Introduction phrase:<ul><li>first element</li><li>second element</li><li>third element</li></ul>');
  });

  it('Should transform list with numbers, letters and – elements', () => {
    expect(pipe.transform('1. first element\na. first element\nb. second element\n– first element\n– second element\n2. second element')).toBe('1. first element<br>a. first element<br>b. second element<br>– first element<br>– second element<br>2. second element');
  });
});
