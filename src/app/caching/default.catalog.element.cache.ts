import { Catalog } from '../catalog/catalog';
import { CatalogElement } from '../model/catalog.element';
import { ICatalogElementCache } from './i.catalog.element.cache';

/**
 * Cache structure to store and lookup {@link CatalogElement}s.
 */
interface Cache {
  [language: string]:
  {
    [catalog: string]:
    {
      [version: string]:
      {
        [type: string]:
        { [code: string]: CatalogElement }
      }
    }
  };
}

export class DefaultCatalogElementCache implements ICatalogElementCache {

  private internalCache: Cache = {};

  public getElement(language: string, catalog: string, version: string, type: string, code: string): CatalogElement {
    if (!this.internalCache[language]) {
      return null;
    }

    if (!this.internalCache[language][catalog]) {
      return null;
    }

    if (!this.internalCache[language][catalog][version]) {
      return null;
    }

    if (!this.internalCache[language][catalog][version][type]) {
      return null;
    }

    if (!this.internalCache[language][catalog][version][type][code]) {
      return null;
    }

    return this.internalCache[language][catalog][version][type][code];
  }

  public addElement(language: string, catalog: string, version: string, type: string, code: string, element: CatalogElement): void {
    if (!language || !catalog || !version || !type || !code || !element) {
      throw new Error('Argument exception');
    }

    if (!this.internalCache[language]) {
      this.internalCache[language] = {};
    }

    if (!this.internalCache[language][catalog]) {
      this.internalCache[language][catalog] = {};
    }

    if (!this.internalCache[language][catalog][version]) {
      this.internalCache[language][catalog][version] = {};
    }

    if (!this.internalCache[language][catalog][version][type]) {
      this.internalCache[language][catalog][version][type] = {};
    }

    this.internalCache[language][catalog][version][type][code] = element;
  }

  public clear(): void {
    delete this.internalCache;
    this.internalCache = {};
  }
}
