import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'correctVersion' })
export class CorrectVersionPipe implements PipeTransform {

  constructor() { }

  public transform(s: string): string {
    if (s && typeof s === 'string') {
      if (/^KLV1-V1-2\d+/.test(s)) {
        s = s.replace(/1-V1-2\d/, ' 1 (1/1/');
        s += ')';
      } if (/^KLV1-V2-2\d+/.test(s)) {
        s = s.replace(/1-V2-2\d/, ' 1 (1/7/');
        s += ')';
      } else {
        s = s.replace(/^ICD|^CHOP_|^TARMED_/, '');
      }
    }
    return s;
  }

}

