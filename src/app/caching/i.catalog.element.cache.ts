import { CatalogElement } from '../model/catalog.element';

export interface ICatalogElementCache {
  getElement(language: string, catalog: string, version: string, type: string, code: string): CatalogElement;
  addElement(language: string, catalog: string, version: string, type: string, code: string, element: CatalogElement): void;
  clear(): void;
}
