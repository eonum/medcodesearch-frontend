import { CatalogElement } from './catalog.element';

export class RememberedElement {

  public language: string;
  public catalog: string;
  public version: string;
  public type: string;
  public name: string;
  public code: string;
  public text: string;

  public static from(element: CatalogElement, version: string, catalog: string, language: string): RememberedElement {
    const to = new RememberedElement();
    to.language = language;
    to.catalog = catalog;
    to.version = version;
    to.type = element.type;
    to.name = element.name;
    to.code = element.code;
    to.text = element.text;

    return to;
  }

  public static keyForCatalogElement(element: CatalogElement, version: string, catalog: string, language: string): string {
    return RememberedElement.keyFor(element.code, element.type, version, catalog, language);
  }

  public static keyForRememberedElement(element: RememberedElement): string {
    return RememberedElement.keyFor(element.code, element.type, element.version, element.catalog, element.language);
  }

  private static keyFor(code: string, type: string, version: string, catalog: string, language: string): string {
    return `${language}_${catalog}_${version}_${type}_${code}`;
  }

  public getId(): string {
    return RememberedElement.keyForRememberedElement(this);
  }
}
