export class SortHelper {
  public static compareAsLiteral(a: string, b: string): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  public static isNumberWithLeadingLetter(literal: string): boolean {
    const regex = new RegExp('^[A-Z]+([0-9]+)$');
    return regex.test(literal);
  }

  public static compareAsNumberWithLeadingLetter(a: string, b: string): number {
    const regex = new RegExp('^([A-Z]+)([0-9]+)$');

    const matchA = regex.exec(a);
    const matchB = regex.exec(b);

    if (matchA[1] < matchB[1]) { return -1 };
    if (matchA[1] > matchB[1]) { return 1 };

    const numA: number = parseInt(matchA[2]);
    const numB: number = parseInt(matchB[2]);

    return numA - numB;
  }

  public static isRomanNumber(code: string): boolean {
    const regex = new RegExp('^[MDCLXVI]+$');
    return regex.test(code);
  }

  public static compareAsRomanNumber(a: string, b: string) {
    let numA: number = this.convertRomanToNumber(a);
    let numB: number = this.convertRomanToNumber(b);

    return numA - numB;
  }

  public static convertRomanToNumber(literal: string) {
    let num: number = 0;
    let currentLiteral: string = literal;

    let romulans: { [literal: string]: number } = {};

    romulans['M'] = 1000;
    romulans['CM'] = 900;
    romulans['D'] = 500;
    romulans['CD'] = 400;
    romulans['C'] = 100;
    romulans['XC'] = 90;
    romulans['L'] = 50;
    romulans['XL'] = 40;
    romulans['X'] = 10;
    romulans['IX'] = 9;
    romulans['V'] = 5;
    romulans['IV'] = 4;
    romulans['I'] = 1;

    for (let key in romulans) {
      while (currentLiteral.startsWith(key)) {
        num += romulans[key];
        currentLiteral = currentLiteral.substr(key.length);
      }
    }

    return num;
  }
}
