import {Catalog} from '../../catalog/catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {ILoggerService} from '../logging/i.logger.service';
import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {CatalogElement} from '../../model/catalog.element';


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
  }

  /**
   * Try to resolve `catalog` and `version` parameters from the route to a catalog.
   * On success, update the `activeCatalog` for global usage and return the
   * catalog for the main component. Else, redirect to start.
   *
   * @param route
   * @param state
   */
  public resolve(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<CatalogElement> {

    const catalog = route.params['catalog'];
    const type = route.params['type'];
    const code = route.params['code'];

    console.log(`CatalogElementResolver: ${catalog} - ${type} - ${code}`)

    return this.catalogs[catalog].getByCode(type, code, route.params['version']);
  }


}
