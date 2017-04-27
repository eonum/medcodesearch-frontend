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

  public getId(): string {
    return `${this.language}_${this.catalog}_${this.version}_${this.type}_${this.code}`;
  }
}
