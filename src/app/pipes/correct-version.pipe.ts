import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'correctVersion' })
export class CorrectVersionPipe implements PipeTransform {

  constructor() { }

  public transform(s: string): string {
    if (s && typeof s === 'string') {
      s = s.replace(/^ICD|^CHOP_|^TARMED_|KLV1_V1_/, '');
    }
    return s;
  }

}

