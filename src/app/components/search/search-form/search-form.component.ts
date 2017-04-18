import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Catalog} from '../../../catalog/catalog';
import {CHOPCatalog} from '../../../catalog/chop.catalog';
import {ICDCatalog} from '../../../catalog/icd.catalog';
import {SwissDrgCatalog} from '../../../catalog/swissdrg.catalog';
import {ILoggerService} from '../../../service/logging/i.logger.service';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ModalDirective} from 'ng2-bootstrap';

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
  public query: string;
  public catalog: string;

  public catalogs: Catalog[]; // to display catalog selection
  public languages: string[];
  public selectedVersion: string;
  public searchForm = new FormControl();

  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              @Inject('ILoggerService') private logger: ILoggerService,
              private swissDrgCatalog: SwissDrgCatalog,
              private chopCatalog: CHOPCatalog,
              private icdCatalog: ICDCatalog) {

    this.logger.log('[SearchComponent] constructor');

    this.catalogs = [icdCatalog, chopCatalog, swissDrgCatalog];

    // Initialize the versions
    this.swissDrgCatalog.getVersions();
    this.chopCatalog.getVersions();
    this.icdCatalog.getVersions();

    this.searchForm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((value: string) => {
        this.query = value;
        this.search(this.query);
      });
  }

  /**
   * Subscribe to route parameter to mark the selected catalog and displaythe query.
   */
  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.catalog = params['catalog'];
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.query = params['query'];
    });
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public changeLanguage(language: string): void {
    this.childModal.hide();
    this.router.navigate([language, this.catalog, this.selectedVersion]
    ).catch(error => this.logger.error(error));
  }

  /**
   * Update based on catalog selection.
   */
  public updateCatalog(catalog: Catalog, version?: string): void {
    version = version || catalog.getActiveVersion();
    if (!catalog.hasVersionInCurrentLanguage(version)) {
      this.languages = catalog.getVersionLanguages(version);
      this.catalog = catalog.getDomain();
      this.selectedVersion = version;
      this.childModal.show();
    } else {
      this.redirect(catalog.getDomain(), version, this.query);
    }
  }

  /**
   * Update based on search
   */
  public search(query: string): void {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: query.length > 0 ? {query: query} : null
    }).catch(error => this.logger.error(error));
  }

  /**
   * Do the catalog selection by redirecting with the given parameters.
   * @param catalog
   * @param version
   * @param query
   */
  private redirect(catalog: string, version: string, query: string): void {

    const params = [catalog, version];

    this.router.navigate(params, {
      relativeTo: this.route.parent,
      queryParamsHandling: 'merge'
    }).catch(error => this.logger.error(error));
  }

}
