import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ng2-bootstrap';
import {Catalog} from '../../../catalog/catalog';
import {SwissDrgCatalog} from '../../../catalog/swissdrg.catalog';
import {CHOPCatalog} from '../../../catalog/chop.catalog';
import {ICDCatalog} from '../../../catalog/icd.catalog';

/**
 * Component that allows a user to select a {@link Catalog} and version,
 * and enter a search query.
 *
 * On selection changes, the {@link Router} is used to navigate to the
 * {@link MainComponent} where the parameters are used to update the
 * input for the {@link SearchResultsComponent}.
 *
 * After a re-routing to the {@link MainComponent}, the selected {@link Catalog}
 * and query are passed as input to this component, to allow displaying the selected catalog and query.
 */
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: [],
})


export class SearchFormComponent implements OnInit {

  // selected values (resolved in main component from route)
  @Input() currentCatalogDomain: string;
  @Input() query: string;

  catalogs: Catalog[]; // to display catalog selection
  languages: string[];
  selectedCatalog: Catalog;
  selectedVersion: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private swissDrgCatalog: SwissDrgCatalog,
              private chopCatalog: CHOPCatalog,
              private icdCatalog: ICDCatalog) {

    this.catalogs = [icdCatalog, chopCatalog, swissDrgCatalog];

    // Initialize the versions
    this.swissDrgCatalog.getVersions();
    this.chopCatalog.getVersions();
    this.icdCatalog.getVersions();
  }

  @ViewChild('childModal') public childModal: ModalDirective;

  /**
   * Subscribe to route parameter to mark the selected catalog and displaythe query.
   */
  public ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.currentCatalogDomain = params['catalog'];
      }
    );

    this.route.queryParams.subscribe(
      params => this.query = params['query'] || ''
    );

  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public changeLanguage(language: string): void {
    this.childModal.hide();
    this.router.navigate([language, this.selectedCatalog.getDomain(), this.selectedVersion]
    ).catch(error => console.log(error));
  }

  /**
   * Update based on catalog selection.
   */
  public updateCatalog(catalog: Catalog, version?: string): void {
    version = version || catalog.getActiveVersion();
    if (!catalog.hasVersionInCurrentLanguage(version)) {
      this.languages = catalog.getVersionLanguages(version);
      this.selectedCatalog = catalog;
      this.selectedVersion = version;
      this.childModal.show();
    } else {
      this.redirect(catalog, version, this.query);
    }
  }

  /**
   * Update based on search
   */
  public search(query: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {query: query}
    }).catch(error => console.log(error));
  }

  /**
   * Do the search or catalog selection by redirecting with the given parameters.
   * @param catalog
   * @param version
   * @param query
   */
  private redirect(catalog: Catalog, version: string, query: string): void {

    const params = [catalog.getDomain(), version];

    this.router.navigate(params, {
      relativeTo: this.route.parent,
      preserveQueryParams: true
    }).catch(error => console.log(error));
  }

}
