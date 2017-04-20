import { Catalog } from '../../catalog/catalog';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { ILoggerService } from '../logging/i.logger.service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

/**
 * This service acts as resolver for a path that contains a `catalog`
 * and `version` parameter.
 * It gives the {@link MainComponent} access to the {@link Catalog}
 * that corresponds to the route, and saves it for global usage.
 *
 * @see
 * {@link AppRoutingModule},
 * {@link https://angular.io/docs/ts/latest/guide/router.html#resolve-guard}
 *
 */
@Injectable()
export class CatalogResolver implements Resolve<Catalog> {

  /**Domain to catalog map for all available catalogs.*/
  private catalogs: { [domain: string]: Catalog };

  /**To give global access to the active catalog*/
  private activeCatalog: Catalog;

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
  public resolve(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<Catalog> {

    const domain = route.params['catalog'];
    const version = route.params['version'];
    const catalog = this.catalogs[domain];

    // Activate catalog and return it, or redirect to start
    if (catalog) {
      if (version) {
        return catalog.activateVersion(version).then(
          (success: boolean) => {
            if (success) { // valid version
              this.activeCatalog = catalog;
              return catalog;
            } else {
              this.redirectToStart(route);
            }
          }
        );
      } else {
        this.redirectToDefaultCatalog(route);
      }

    } else {
      this.redirectToStart(route);
    }
  }

  private redirectToStart(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.router.navigate([route.params['language']]).catch(e => this.logger.log(e));
  }

  private redirectToDefaultCatalog(route: ActivatedRouteSnapshot): void {
    const domain = route.params['catalog'];
    const catalog = this.catalogs[domain];
    if (catalog) {
      catalog.getVersions().then(versions => {
        this.router.navigate([route.params['language'], route.params['catalog'], versions[0]]).catch(e => this.logger.log(e));
      },
        error => this.logger.log(error)
      );

    } else {
      this.redirectToStart(route);
    }
  }

  /**
   * Return the active route parameters `[catalog, version]`.
   * Used for redirect to active catalog and version after language change.
   * @returns {string[]}
   */
  public getActiveRouteParams(): string[] {
    if (!this.activeCatalog) {
      this.logger.log('No active catalog!');
      return [];
    }
    return [
      this.activeCatalog.getDomain(),
      this.activeCatalog.getActiveVersion()
    ];
  }
}
