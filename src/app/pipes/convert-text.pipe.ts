import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertText'
})
export class ConvertTextPipe implements PipeTransform {

  /** Get the string value of the group element and check if string matches the regex for a list.
   * If true, add <br> or <li> elements for each match.
   * If false, return the original string.
   *
   * @param str: group.text
   * */
  public transform(str: string): string {
    const regexList = /\n–\s/g;
    const regexListWithNumber = /\n(?=\d\.\s)/g;
    const regexListWithLetterDot = /\n(?=[a-zA-Z]\.\s)/g;
    const regexListLetterWithBracket = /\n(?=[a-zA-Z]\)\s)/g;

    const regexListStart = /^–\s/;
    const regexListStartsWithNumber = /^\d\.\s/;
    const regexListStartsWithLetter = /^\w\)\s/;

    if (regexListStartsWithLetter.test(str) || regexListLetterWithBracket.test(str)) {
      str =  str.replace(regexListLetterWithBracket, '<br>');
      if (regexListWithNumber.test(str)) {
        str =  str.replace(regexListWithNumber, '<br>');
        if (regexList.test(str)) {
            str =  str.replace(/\n(?=–\s)/g, '<br>');
        }
      } else if (regexList.test(str)) {
        const lastElement = str.split(regexList);
        const el = lastElement[lastElement.length - 1]
        if (el.length < 130) {
          str =  str.replace(/\n–\s/, '<ul><li>').replace(regexList, '</li><li>');
          str += '</li></ul>';
        }
      }
    } else if (regexListStartsWithNumber.test(str) || regexListWithNumber.test(str)) {
      if (regexListWithNumber.test(str)) {
        str =  str.replace(regexListWithNumber, '<br>');
      } else {
        str =  str.replace(/\n\d\.\s/, '<ol><li>').replace(/\n\d\.\s/g, '</li><li>');
        str += '</li></ol>';
      }
     if (regexListStartsWithLetter.test(str) || regexListWithLetterDot.test(str)) {
       str =  str.replace(regexListWithLetterDot, '<br>');
       if (regexList.test(str)) {
         str =  str.replace(/\n(?=–\s)/g, '<br>');
       }
     } else if (regexList.test(str)) {
       const lastElement = str.split(regexList);
       const el = lastElement[lastElement.length - 1]
       if (el.length < 130) {
         str =  str.replace(/\n–\s/, '<ul><li>').replace(regexList, '</li><li>');
         str += '</li></ul>';
       }
     }
   } else if (regexListStart.test(str)) {
     str =  str.replace(regexListStart, '<ul><li>').replace(regexList, '</li><li>');
     str += '</li></ul>';
   } else if (regexList.test(str)) {
     const lastElement = str.split(regexList);
     const el = lastElement[lastElement.length - 1]
     if (el.length < 130) {
       str =  str.replace(/\n–\s/, '<ul><li>').replace(regexList, '</li><li>');
       str += '</li></ul>';
     }
   }
   return str;
  }
}
