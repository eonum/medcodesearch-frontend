import { CorrectVersionPipe } from "./correct-version.pipe";

describe('CorrectVersionPipe', () => {

    const pipe : CorrectVersionPipe = new CorrectVersionPipe();

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

    it('Should return null', () => {
        const res = pipe.transform(null);
        expect(res).toBe(null);
    });
})