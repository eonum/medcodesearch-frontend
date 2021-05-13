import { ICatalogElementCache } from '../../caching/i.catalog.element.cache';
import { Catalog } from '../../catalog/catalog';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { TARMEDCatalog} from '../../catalog/tarmed.catalog';
import { KlV1Catalog } from '../../catalog/klv1.catalog';
import { RegCatalog} from '../../catalog/reg.catalog';
import { ILoggerService } from '../logging/i.logger.service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CatalogElement } from '../../model/catalog.element';
import { SortHelper } from '../../helper/sort.helper';

@Injectable()
export class CatalogElementResolver implements Resolve<CatalogElement> {

  /**Domain to catalog map for all available catalogs.*/
  private catalogs: { [domain: string]: Catalog };

  /**
   * Constructor for class CatalogResolver.
   *
   * @param router
   * @param swissDrgCatalog
   * @param chopCatalog
   * @param icdCatalog
   * @param tarmedCatalog
   */
  constructor(private router: Router,
    private swissDrgCatalog: SwissDrgCatalog,
    private chopCatalog: CHOPCatalog,
    private icdCatalog: ICDCatalog,
    private tarmedCatalog: TARMEDCatalog,
    private klv1Catalog: KlV1Catalog,
    private regCatalog: RegCatalog,
    private sortHelper: SortHelper,
    @Inject('ILoggerService') private logger: ILoggerService,
    @Inject('ICatalogElementCache') private elementCache: ICatalogElementCache) {
    this.initCatalogMap();
    this.initElementCache();
  }

  private initCatalogMap(): void {
    this.catalogs = {};
    this.catalogs[this.swissDrgCatalog.getName()] = this.swissDrgCatalog;
    this.catalogs[this.chopCatalog.getName()] = this.chopCatalog;
    this.catalogs[this.icdCatalog.getName()] = this.icdCatalog;
    this.catalogs[this.tarmedCatalog.getName()] = this.tarmedCatalog;
    this.catalogs[this.klv1Catalog.getName()] = this.klv1Catalog;
    this.catalogs[this.regCatalog.getName()] = this.regCatalog;
  }

  private initElementCache(): void {
    const catalogList = [this.swissDrgCatalog, this.chopCatalog, this.icdCatalog, this.tarmedCatalog, this.klv1Catalog, this.regCatalog];
    const languages = ['de', 'fr', 'it', 'en'];

    languages.forEach(language => {
      this.elementCache[language] = {};
      catalogList.forEach(catalog => {
        this.elementCache[language][catalog.getName()] = {};
      });
    });
  }

  /**
   * Load the CatalogElement for the route from the API or from a {@link CatalogElementCache}.
   *
   * @param route
   * @param state
   */
  public async resolve(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<CatalogElement> {

    const catalog = route.parent.params['catalog'];
    const version = route.parent.params['version'];
    const language = route.parent.params['language'];

    const type = route.params['type'];
    const code = route.params['code'];
    const currentCatalog = this.catalogs[catalog];
    return await this.getElement(language, catalog, version, type, code);
  }

  /**
   * Return the element from the cache, or load it from the API.
   * @param type
   * @param code
   * @returns {Promise<CatalogElement>}
   */
  public async getElement(language: string, catalog: string, version: string, type: string, code: string): Promise<CatalogElement> {

    const currentCatalog: Catalog = this.catalogs[catalog];
    let element: CatalogElement = this.elementCache.getElement(language, catalog, version, type, code);
    if (element === null) {
      element = await currentCatalog.getByCode(type, code, version, language);
      this.elementCache.addElement(language, catalog, version, type, code, element);

      await this.loadParents(language, catalog, version, element);
      this.processChildren(element);
      return Promise.resolve(element);
    }
    return Promise.resolve(element);
  }

  /**
   * Get the parent of the element (from cache or API) and save it on the element and
   * into the cache.
   * @param currentElement the leaf element of which the hierarchy will be loaded
   */
  private async loadParents(language: string, catalog: string, version: string, element: CatalogElement): Promise<void> {

    let parent = element.parent;

    if (parent) {
      const parentUrl = parent.url;

      const code: string = this.extractCodeFromUrl(parentUrl);
      const type: string = this.extractTypeFromUrl(parentUrl);

      parent = await this.getElement(language, catalog, version, type, code);
      element.parent = parent;
    }
  }

  /**
   * Determines the type of each child element and sorts
   * them according to their code.
   * @param currentElement the element of which the children will be processed
   */
  private processChildren(element: CatalogElement): void {
    const children = element.children;

    if (children) {
      children.forEach(child => child.type = this.extractTypeFromUrl(child.url));

      element.children = this.sortHelper.sort(element.children);
    }
  }

  /**
   * Extracts the type from the url of a {@link CatalogElement}
   * @param url the url of a {@link CatalogElement}
   */
  private extractTypeFromUrl(url: string): string {
    const regex: RegExp = new RegExp('^\/[a-z]{2}\/([a-z_1]+)\/.*$');
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
