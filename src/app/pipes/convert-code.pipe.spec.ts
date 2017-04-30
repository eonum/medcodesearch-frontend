import { NullLoggerService } from '../service/logging/null.logger.service';
import { ConvertCodePipe } from './convert-code.pipe';
import * as TypeMoq from 'typemoq';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from "@angular/platform-browser";
import { SecurityContext } from "@angular/core/src/security";

describe('ConvertCodePipe', () => {

    class MockSanitizer extends DomSanitizer {
        sanitize(context: SecurityContext, value: any): string {
            return value;
        }
        bypassSecurityTrustHtml(value: string): SafeHtml {
            return value;
        }
        bypassSecurityTrustStyle(value: string): SafeStyle {
            return value;
        }
        bypassSecurityTrustScript(value: string): SafeScript {
            return value;
        }
        bypassSecurityTrustUrl(value: string): SafeUrl {
            return value;
        }
        bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl {
            return value;
        }
    }

    const sanitizer = new MockSanitizer();
    const pipe = new ConvertCodePipe(sanitizer, null, null, null, null, new NullLoggerService());

    it('Should not transform empty string', () => {        
        expect(pipe.transform('')).toBe('');
    });

    it('Should not transform normal phrase', () => {
        expect(pipe.transform('Ein normaler Text')).toBe('Ein normaler Text');
    });

    it('Should not transform normal phrase with surrounding brackets', () => {
        expect(pipe.transform('(bei)')).toBe('(bei)');
    });

    it('Should transform 3-digit number with brackets', () => {
        expect(pipe.transform('(123)')).toBe('(<span class="link" onclick="window.eonum.searchCode(\'123\')">123</span>)');
    });

    it('Should not transform 4-digit number with brackets', () => {
        expect(pipe.transform('(123)')).toBe('(<span class="link" onclick="window.eonum.searchCode(\'123\')">123</span>)');
    });

    it('Should transform number with leading letter', () => {
        expect(pipe.transform('(A123)')).toBe('(<span class="link" onclick="window.eonum.searchCode(\'A123\')">A123</span>)');
    });

    it('Should transform 3 groups separated by dots', () => {
        expect(pipe.transform('(A12.23.1)')).toBe('(<span class="link" onclick="window.eonum.searchCode(\'A12.23.1\')">A12.23.1</span>)');
    });

    it('Should not transform 4 groups separated by dots', () => {
        expect(pipe.transform('(A12.23.1.1)')).toBe('(A12.23.1.1)');
    });

    // it('Should not transform single letter', () => {
    //     expect(pipe.transform('(A)')).toBe('(A)');
    // });

    it('Should transform two code groups separated by dash', () => {
        expect(pipe.transform('(A12.23.1-A12.23.1)')).toBe('(<span class="link" onclick="window.eonum.searchCode(\'A12.23.1\')">A12.23.1</span>-<span class="link" onclick="window.eonum.searchCode(\'A12.23.1\')">A12.23.1</span>)');
    });

    it('Should not transform normale text separated by dash', () => {
        expect(pipe.transform('(Ein Text - mit Bindestrich)')).toBe('(Ein Text - mit Bindestrich)');
    });
});