import { CatalogElement } from '../model/catalog.element';
/**
 * Helper class for sorting of {@link CatalogElement}s.
 * Provides some custom compare-methods
 */
export class SortHelper {

  /**
   * Sort elements based on the type of their codes.
   * Handles roman numbers, numbers with leading letters
   * and normal text literals.
   *
   * @param elements the elements to sort
   */
  public sort(elements: CatalogElement[]): CatalogElement[] {
    if (!elements) {
      throw new Error('Elements must not be null');
    }

    return elements.sort((a: CatalogElement, b: CatalogElement) => {
      if (this.isNumberWithLeadingLetter(a.code)) {
        return this.compareAsNumberWithLeadingLetter(a.code, b.code);
      } else if (this.isRomanNumber(a.code)) {
        return this.compareAsRomanNumber(a.code, b.code);
      } else if (this.isNumberWithMultipleSections(a.code)) {
        return this.compareAsNUmberWithMultipleSections(a.code, b.code)
      } else {
        return this.compareAsLiteral(a.code, b.code);
      }
    });
  }

  /**
   * Compares two strings lexicographically.
   * Returns a positive number, if the first argument is lexicographically
   * larger than the second argument. Returns a negative number otherwise.
   * Returns 0 if they're equal.
   *
   * @param a the first argument to compare
   * @param b the second argument to compare
   */
  public compareAsLiteral(a: string, b: string): number {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }

  /**
   * Returns true if the literal starts with letters and ends with a number.
   * Otherwise returns false.
   *
   * Example: 'AB1000' -> true, '8999' -> false
   *
   * @param literal the literal to check
   */
  public isNumberWithLeadingLetter(literal: string): boolean {
    const regex = new RegExp('^[A-Z]+([0-9]+)$');
    return regex.test(literal);
  }

  /**
   * Compares two literal with a number preceeded by letters.
   * First, the arguments are compared lexicographically by their
   * leading characters. Second, they're compared by their ending
   * numbers.
   * Returns a negative number, if the first argument is smaller than
   * the second argument, a positive number if the first argument is
   * larger than the second argument and 0 if they're equal.
   *
   * Examples:
   * 'ab9', 'ab10' -> -1
   * 'z1', 'f1' -> -1
   * 'zz10', 'ab10' -> 1
   *
   * @param a the first argument to compare
   * @param b the second argument to compare
   */
  public compareAsNumberWithLeadingLetter(a: string, b: string): number {
    const regex = new RegExp('^([A-Z]+)([0-9]+)$');

    const matchA = regex.exec(a);
    const matchB = regex.exec(b);

    if (matchA[1] < matchB[1]) { return -1; }
    if (matchA[1] > matchB[1]) { return 1; }

    const numA: number = parseInt(matchA[2], 10);
    const numB: number = parseInt(matchB[2], 10);

    return numA - numB;
  }

  /**
   * Checks whether the given literal is a roman number
   * (like 'MMXIV')
   * @param literal the literal to check
   */
  public isRomanNumber(literal: string): boolean {
    const regex = new RegExp('^[MDCLXVI]+$');
    return regex.test(literal);
  }

  /**
   * Compares two literal which are roman numbers
   * @param a the first argument to compare
   * @param b the second argument to compare
   */
  public compareAsRomanNumber(a: string, b: string): number {
    const numA: number = this.convertRomanToNumber(a);
    const numB: number = this.convertRomanToNumber(b);

    return numA - numB;
  }

  /**
   * Converts a given roman number into an integer.
   * @param literal the literal to convert
   */
  public convertRomanToNumber(literal: string): number {
    let num = 0;
    let currentLiteral: string = literal;

    const romulans: { [literal: string]: number } = {};

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

    const keys = Object.keys(romulans);

    keys.forEach(key => {
      while (currentLiteral.startsWith(key)) {
        num += romulans[key];
        currentLiteral = currentLiteral.substr(key.length);
      }
    });

    return num;
  }

  /**
   * Returns true if the literal has one or two numbers before a dot.
   * Otherwise returns false.
   *
   * Example: '10.3.10' -> true, 'A.2' -> false
   *
   * @param literal the literal to check
   */
  public isNumberWithMultipleSections(literal: string): boolean {
    const regex = new RegExp('[0-9]?[0-9]+\\.');
    return regex.test(literal);
  }

  /**
   * Compares two strings with the localCompare() method which compares two strings in the current locale.
   * It returns a number indicating whether string a comes before, after or is equal as string b in sort order.
   *
   * return values:  a < b -> -1 ,  a = b -> 0, a > b -> 1
   *
   * @param a the first argument to compare
   * @param b the second argument to compare
   */
  public compareAsNUmberWithMultipleSections(a: string, b: string): number {
    return a.localeCompare(b, undefined, { numeric: true })
  }
}
