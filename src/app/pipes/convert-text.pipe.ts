import { Pipe, PipeTransform } from '@angular/core';
import {last} from 'rxjs/operators';

@Pipe({
  name: 'convertText'
})
export class ConvertTextPipe implements PipeTransform {

  /** Get the string value of the group element and check if matches the regex for a list.
   * If true, add <br> elements for each match.
   * If false, return the original string.
   *
   * @param str: group.text
   * */
  public transform(str: string): string {
    const regexList = /\n(?=–\s)/g;
    const regexListWithNumber = /\n(?=\d\.\s)/g;
    const regexListWithLetterDot = /\n(?=\w\.\s)/g;
    const regexListLetterWithBracket = /\n(?=\w\)\s)/g;

    const regexListStart = /^–\s/;
    const regexListStartsWithNumber = /^\d\.\s/;
    const regexListStartsWithLetter = /^\w\)\s/;

   if (regexListStartsWithNumber.test(str) || regexListWithNumber.test(str)) {
     if (regexListStartsWithLetter.test(str) || regexListWithLetterDot.test(str)) {
       if (regexListStart.test(str)) {
         str = str.replace(regexList, '<br>');
       } else if (regexList.test(str)) {
         const lastElement = str.split(regexList);
         const el = lastElement[lastElement.length - 1]
         if (el.length < 130) {
           str = str.replace(regexList, '<br>');
         }
       }
       str = str.replace(regexListWithLetterDot, '<br>');
     } else if (regexListStart.test(str)) {
       str = str.replace(regexList, '<br>');
     } else if (regexList.test(str)) {
       const lastElement = str.split(regexList);
       const el = lastElement[lastElement.length - 1]
       if (el.length < 130) {
         str = str.replace(regexList, '<br>');
       }
     }
     str =  str.replace(regexListWithNumber, '<br>');
   } else if (regexListStartsWithLetter.test(str) || regexListLetterWithBracket.test(str)) {
     if (regexListStartsWithNumber.test(str) || regexListWithNumber.test(str)) {
       if (regexListStart.test(str)) {
         str = str.replace(regexList, '<br>');
       } else if (regexList.test(str)) {
         const lastElement = str.split(regexList);
         const el = lastElement[lastElement.length - 1]
         if (el.length < 130) {
           str = str.replace(regexList, '<br>');
         }
       }
       str = str.replace(regexListWithNumber, '<br>');
     } else if (regexListStart.test(str)) {
       str = str.replace(regexList, '<br>');
     } else if (regexList.test(str)) {
       const lastElement = str.split(regexList);
       const el = lastElement[lastElement.length - 1]
       if (el.length < 130) {
         str = str.replace(regexList, '<br>');
       }
     }
     str =  str.replace(regexListLetterWithBracket, '<br>');
   } else if (regexListStart.test(str)) {
     str =  str.replace(regexList, '<br>');
   } else if (regexList.test(str)) {
     const lastElement = str.split(regexList);
     const el = lastElement[lastElement.length - 1]
     if (el.length < 130) {
       str =  str.replace(regexList, '<br>');
     }
   }
   return str;
  }

  /*
  private listHtml (str: string): any {
    const s = str.split(/\n–\s/g);
    const list = [];
    for (const obj of s) {
     list.push('<li>' + obj + '</li>');
    }
    return list;
  }*/
}
