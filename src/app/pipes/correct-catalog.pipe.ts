import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'correctCatalog'
})
export class CorrectCatalogPipe implements PipeTransform {

  public transform(s: string): string {
    if (s && typeof s === 'string') {
      if (/^KLV1\sV1\s2\d+/.test(s)) {
        s = s.replace(/1\sV1\s/, ' Anhang 1 (01/01/');
        s += ')';
      }
      if (/^KLV1\sV2\s2\d+/.test(s)) {
        s = s.replace(/1\sV2\s/, ' Anhang 1 (01/07/');
        s += ')';
      }
    }
    return s;
  }
}
