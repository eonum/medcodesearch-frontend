import { CatalogElement } from '../model/catalog.element';
import { ICatalogElementCache } from './i.catalog.element.cache';

export class NullCatalogElementCache implements ICatalogElementCache {
  public getElement(language: string, catalog: string, version: string, type: string, code: string): CatalogElement { return null; }
  public addElement(language: string, catalog: string, version: string, type: string, code: string, element: CatalogElement): void { }
  public clear(): void { }
}
