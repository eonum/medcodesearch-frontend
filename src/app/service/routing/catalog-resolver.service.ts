import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Catalog} from '../../catalog/catalog';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {environment} from '../../../environments/environment';

/**
 * This service acts as resolver for a path that contains a `catalog`
 * and `version` parameter.
 * It gives the target component access to a {@link Catalog} that is resolved from the
 * path. And saves it for global usage.
 *
 * For usage see {@link AppRoutingModule }.
 */
@Injectable()
export class CatalogResolver implements Resolve<Catalog> {

  /**Domain to catalog map for all available catalogs.*/
  private catalogs: {[domain: string]: Catalog};

  /**To give global access to the active catalog*/
  activeCatalog: Catalog;

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
              private icdCatalog: ICDCatalog,) {

    this.catalogs                              = {};
    this.catalogs[swissDrgCatalog.getDomain()] = swissDrgCatalog;
    this.catalogs[chopCatalog.getDomain()]     = chopCatalog;
    this.catalogs[icdCatalog.getDomain()]      = icdCatalog;
  }

  /**
   * Try to resolve `catalog` and `version` parameters from the route to
   * a catalog. If successful, update the `activeCatalog` for global usage and return the
   * catalog for the target component. Else, redirect to start.
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Catalog> {

    let domain  = route.params['catalog'];
    let version = route.params['version'];
    let catalog = this.catalogs[domain];

    // Activate catalog and return it, or redirect to start
    if (catalog) {
      return catalog.activateVersion(version).then((success: boolean) => {
          if (success) { //valid version
            this.activeCatalog = catalog;
            return catalog;
          }
          else this.redirectToStart(route);
        }
      )
    } else this.redirectToStart(route);
  }

  private redirectToStart(route: ActivatedRouteSnapshot) {
    return this.router.navigate( [route.params['language']] ).catch(e => console.log(e));
  }

  /**
   * Return the active route parameters `[catalog, version]` if a catalog
   * is active.
   * @returns {string[]}
   */
  getActiveRouteParams(): string[] {
    if(!this.activeCatalog ){
      if(environment.dev) console.log('No active catalog!');
      return [];
    }
    return [
      this.activeCatalog.getDomain(),
      this.activeCatalog.getActiveVersion()
    ]
  }
}
