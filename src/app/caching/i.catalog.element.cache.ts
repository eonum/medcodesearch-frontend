import { CatalogElement } from '../model/catalog.element';

/**
 * Interface for a cache for {@link CatalogElement}s.
 */
export interface ICatalogElementCache {
  getElement(language: string, catalog: string, version: string, type: string, code: string): CatalogElement;
  addElement(language: string, catalog: string, version: string, type: string, code: string, element: CatalogElement): void;
  clear(): void;
}
