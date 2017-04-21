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

/**
 * Implementation of {@link ICatalogElementCache} which uses an
 * in-memory dictionary to store the elements.
 */
export class DefaultCatalogElementCache implements ICatalogElementCache {

  private internalCache: Cache = {};

  /**
   * Retrieve the element with the specified key from the cache.
   * Returns the element if it is inside the cache.
   * Returns null if no element with the specified key is found.
   * 
   * @param language the language key
   * @param catalog the catalog key
   * @param version the version key
   * @param type the type key
   * @param code the code key
   */
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

  /**
   * Stores the specified element under the given key.
   * If an element is already stored under the specified key,
   * it will be overwritten.
   * 
   * @param language the language key, mustn't be null
   * @param catalog the catalog key, mustn't be null
   * @param version the version key, mustn't be null
   * @param type the type key, mustn't be null
   * @param code the code key, mustn't be null
   * @param element the element to store within the cache, mustn't be null
   */
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

  /**
   * Clears the whole cache.
   */
  public clear(): void {
    delete this.internalCache;
    this.internalCache = {};
  }
}
