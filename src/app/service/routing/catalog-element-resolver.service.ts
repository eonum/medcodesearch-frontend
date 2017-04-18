import {Catalog} from '../../catalog/catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {ILoggerService} from '../logging/i.logger.service';
import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {CatalogElement} from '../../model/catalog.element';
import {SortHelper} from '../../helper/sort.helper';

/**
 * Cache structure to store and lookup {@link CatalogElement}'s by their type and code.
 */
interface Cache { [type: string]: { [code: string]: CatalogElement }; }

/**
 * Manager for storing CatalogElements of a given {@link Catalog}, version and language.
 * When an element is loaded from the Catalog, all parent elements are loaded also.
 */
class CatalogElementCache {

  private cache: Cache = {};

  /**
   *
   * @param catalog
   * @param version
   * @param language
   */
  constructor(private catalog: Catalog,
              private version: string,
              private language: string) {
  }

  /**
   * Load the element and it's parents from the API and save them in the cache.
   *
   * @param type
   * @param code
   * @returns {Promise<CatalogElement>}
   */
  private async loadElement(type: string, code: string): Promise<CatalogElement> {

    if (!this.cache[type]) {
      this.cache[type] = {};
    }

    // TODO put language argument in getByCode
    const element = await this.catalog.getByCode(type, code, this.version);
    this.cache[type][code] = element;

    await this.loadParents(element);
    this.sortChildren(element);

    return Promise.resolve(element);
  }

  /**
   * Return the element from the cache, or load it from the API.
   * @param type
   * @param code
   * @returns {Promise<CatalogElement>}
   */
  public async getElement(type: string, code: string): Promise<CatalogElement> {

    if (this.cache[type] && this.cache[type][code]) {
      return Promise.resolve(this.cache[type][code]);
    }

    return this.loadElement(type, code);
  }

  /**
   * Get the parent of the element (from cache or API) and save it on the element and
   * in the cache.
   * @param currentElement the leaf element of which the hierarchy will be loaded
   */
  private async loadParents(element: CatalogElement): Promise<CatalogElement> {

    let parent = element.parent;

    if (parent) {
      const parentUrl = parent.url;

      const code: string = this.extractCodeFromUrl(parentUrl);
      const type: string = this.extractTypeFromUrl(parentUrl);

      parent = await this.getElement(type, code);
      parent.url = parentUrl;
      element.parent = parent;
    }
    return Promise.resolve(parent);

  }

  /**
   * Loads the immediate children of the currentElement
   * @param currentElement the element of which the children will be loaded
   */
  private sortChildren(element: CatalogElement): void {
    const children = element.children;

    if (children) {
      children.forEach(child => child.type = this.extractTypeFromUrl(child.url));

      element.children = children.sort((a: CatalogElement, b: CatalogElement) => {
        if (SortHelper.isNumberWithLeadingLetter(a.code)) {
          return SortHelper.compareAsNumberWithLeadingLetter(a.code, b.code);
        }
        if (SortHelper.isRomanNumber(a.code)) {
          return SortHelper.compareAsRomanNumber(a.code, b.code);
        } else {
          return SortHelper.compareAsLiteral(a.code, b.code);
        }
      });
    }
  }

  /**
   * Extracts the type from the url of a {@link CatalogElement}
   * @param url the url of a {@link CatalogElement}
   */
  private extractTypeFromUrl(url: string): string {
    const regex: RegExp = new RegExp('^\/[a-z]{2}\/([a-z_]+)\/.*$');
    const match = regex.exec(url);
    return match[1];
  }

  /**
   * Extracts the code from the url of a {@link CatalogElement}
   * @param url the url of a {@link CatalogElement}
   */
  private extractCodeFromUrl(url: string): string {
    if (url !== undefined) {
      const lastSlash = url.lastIndexOf('/');
      return url.substr(lastSlash + 1);
    }
    return '';
  }

}


@Injectable()
export class CatalogElementResolver implements Resolve<CatalogElement> {

  /**Domain to catalog map for all available catalogs.*/
  private catalogs: { [domain: string]: Catalog };

  private catalogCache: {[language: string]: { [version: string]: CatalogElementCache } };

  /**
   * Create a new cache for this language and catalog version.
   *
   * @param language
   * @param version
   * @param catalog
   * @returns {CatalogElementCache}
   */
  private createCache(language: string, version: string, catalog: string): CatalogElementCache {
    const cache = new CatalogElementCache(this.catalogs[catalog], version, language);
    this.catalogCache[language][version] = cache;
    return cache;
  }


  /**
   * Constructor for class CatalogResolver.
   *
   * @param router
   * @param swissDrgCatalog
   * @param chopCatalog
   * @param icdCatalog
   */
  constructor(private router: Router,
              private swissDrgCatalog: SwissDrgCatalog,
              private chopCatalog: CHOPCatalog,
              private icdCatalog: ICDCatalog,
              @Inject('ILoggerService') private logger: ILoggerService) {

    this.catalogs = {};
    this.catalogs[swissDrgCatalog.getDomain()] = swissDrgCatalog;
    this.catalogs[chopCatalog.getDomain()] = chopCatalog;
    this.catalogs[icdCatalog.getDomain()] = icdCatalog;

    // TODO put languages as constants somewhere
    this.catalogCache =  {'de': {}, 'fr': {}, 'it': {}, 'en': {}};

  }

  /**
   * Load the CatalogElement for the route from the API or from a {@link CatalogElementCache}.
   *
   * @param route
   * @param state
   */
  public resolve(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<CatalogElement> {


    const catalog = route.parent.params['catalog'];
    const version = route.parent.params['version'];
    const language = route.parent.params['language'];

    const type = route.params['type'];
    const code = route.params['code'];

    const cache = this.catalogCache[language][version] ||
      this.createCache(language, version, catalog);

    return cache.getElement(type, code);
  }


}
