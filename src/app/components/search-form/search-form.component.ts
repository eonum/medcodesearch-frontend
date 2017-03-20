import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {Catalog} from '../../catalog/catalog';

/**
 * Component that allows a user to select a {@link Catalog} and version,
 * and enter a search query.
 *
 * On selection changes, the {@link Router} is used to navigate to the
 * {@link SearchMainComponent} where the parameters are used to update the
 * input for the {@link SearchResultComponent}.
 *
 * After a re-routing to the {@link SearchMainComponent}, the selected {@link Catalog}
 * and query are passed as input to this component, to allow displaying the selected catalog and query.
 */
@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: []
})


export class SearchFormComponent {

  // selected values (resolved in search-main component from route)
  @Input() catalog: Catalog;
  @Input() query: string;

  catalogs: Catalog[]; // to display catalog selection

  constructor(private route: ActivatedRoute,
              private router: Router,
              private swissDrgCatalog: SwissDrgCatalog,
              private chopCatalog: CHOPCatalog,
              private icdCatalog: ICDCatalog) {

    this.catalogs = [swissDrgCatalog, chopCatalog, icdCatalog]
  }

  /**
   * Update based on catalog selection.
   */
  public updateCatalog(catalog: Catalog, version?: string): void {
    version = version || catalog.getActiveVersion();
    this.redirect(catalog, version, this.query);
  }

  /**
   * Update based on search
   */
  public search(query: string): void {
    this.redirect(this.catalog, this.catalog.getActiveVersion(), query)
  }

  /**
   * Do the search or catalog selection by redirecting with the given parameters.
   * @param catalog
   * @param version
   * @param query
   */
  private redirect(catalog:Catalog, version:string, query:string):void {
    let params = query ?
      [catalog.getDomain(), version, {query: query}] :
      [catalog.getDomain(), version];

    this.router.navigate(params, {relativeTo: this.route.parent}).catch(error => console.log(error));
  }

}
