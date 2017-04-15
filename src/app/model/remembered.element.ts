import { CatalogElement } from "./catalog.element";
import { Catalog } from "../catalog/catalog";

export class RememberedElement {

  public language: string;
  public catalog: string;
  public version: string;
  public type: string;
  public code: string;

  public getId(): string {
    return `${this.language}_${this.catalog}_${this.version}_${this.type}_${this.code}`;
  }

  public static from(element: CatalogElement, version: string, catalog: string, language: string): RememberedElement {
    const to = new RememberedElement();
    to.language = language;
    to.catalog = catalog;
    to.version = version;
    to.type = element.type;
    to.code = element.code;

    return to;
  }

  public static getKeyFor(element: CatalogElement, version: string, catalog: string, language: string): string {
    return `${language}_${catalog}_${version}_${element.type}_${element.code}`;
  }
}
