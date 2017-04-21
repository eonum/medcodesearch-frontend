import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwissDrgCatalog } from '../../../catalog/swissdrg.catalog';
import { ICDCatalog } from '../../../catalog/icd.catalog';
import { CHOPCatalog } from '../../../catalog/chop.catalog';
import { Catalog } from '../../../catalog/catalog';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective, ModalModule } from 'ng2-bootstrap';

/**
 * Component that allows a user to select a {@link Catalog} and version,
 * and enter a search query.
 *
 * On selection changes, the {@link Router} is used to navigate to the
 * {@link SearchMainComponent} where the parameters are used to update the
 * input for the {@link SearchResultsComponent}.
 *
 * After a re-routing to the {@link SearchMainComponent}, the selected {@link Catalog}
 * and query are passed as input to this component, to allow displaying the selected catalog and query.
 */
@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: [],
})


export class SearchFormComponent {

  // selected values (resolved in search-main component from route)
  @Input() catalog: Catalog;
  @Input() query: string;

  catalogs: Catalog[]; // to display catalog selection
  languages: string[];
  selectedCatalog: Catalog;
  selectedVersion: string;

  constructor(public translate: TranslateService,private route: ActivatedRoute,
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

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public changeLanguage(language: string): void {
    this.childModal.hide();
    this.router.navigate([language, this.selectedCatalog.getDomain(), this.selectedVersion]).catch(error => console.log(error));
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
    this.redirect(this.catalog, this.catalog.getActiveVersion(), query);
  }

  /**
   * Do the search or catalog selection by redirecting with the given parameters.
   * @param catalog
   * @param version
   * @param query
   */
  private redirect(catalog: Catalog, version: string, query: string): void {
    let params = query
      ? [catalog.getDomain(), version, { query: query }]
      : [catalog.getDomain(), version];

    this.router.navigate(params, { relativeTo: this.route.parent }).catch(error => console.log(error));
  }

}
