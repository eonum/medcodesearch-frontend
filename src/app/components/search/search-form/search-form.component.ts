import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Catalog} from '../../../catalog/catalog';
import {ILoggerService} from '../../../service/logging/i.logger.service';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {ModalDirective} from 'ng2-bootstrap';
import {CatalogDisplayInfo, CatalogResolver} from '../../../service/routing/catalog-resolver.service';
import {MobileService} from '../../../service/mobile.service';

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

  public query: string;
  public catalog: string;

  public languages: string[];
  public selectedVersion: string;
  public searchForm = new FormControl();

  public catalogDisplayInfos: CatalogDisplayInfo[];

  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              @Inject('ILoggerService') private logger: ILoggerService,
              private catalogResolver: CatalogResolver,
              private mobileService: MobileService) {

    this.searchForm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((value: string) => {
        this.query = value;
        this.search(this.query);
      });
  }

  /**
   * Subscribe to route parameters.
   */
  public ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      // for the button styles
      this.catalog = params['catalog'];
    });
    this.route.queryParams.subscribe((params: Params) => {
      // for the search field
      this.query = params['query'];
    });
    this.route.data.subscribe((data: Data) => {
      // for the versions to display
      this.catalogDisplayInfos = data.displayInfos;
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
    const params = [language, this.catalog];
    if (this.selectedVersion) {
      params.push(this.selectedVersion);
    }
    this.router.navigate(params
    ).catch(error => this.logger.error(error));
  }

  /**
   * Update based on catalog selection.
   */
  public updateCatalog(catalog: string, version?: string): void {

    // get the CatalogDisplayInfo to check the version
    const info = this.catalogDisplayInfos.find((inf: CatalogDisplayInfo) => inf.catalog === catalog);

    version = version || info.displayVersion;

    if (info.languageVersions.indexOf(version) === -1) {
      this.showLanguageSelector(catalog, version);
    } else {
      this.redirect(catalog, version, this.query);
    }
  }

  /**
   * Get and set the available languages for the given catalog and version and open the modal.
   *
   * @param catalog must be one of {@link Settings.CATALOGS }
   * @param version
   * @returns {null}
   */
  private showLanguageSelector(catalog: string, version: string): void {
    this.languages = this.catalogResolver.getLanguages(catalog, version);

    this.catalog = catalog;
    this.selectedVersion = version;
    this.childModal.show();
  }

  /**
   * Update based on search
   */
  public search(query: string): void {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: query.length > 0 ? {query: query} : null
    }).catch(error => this.logger.error(error));

    this.mobileService.setQuery(query);
  }

  /**
   * Do the catalog selection by redirecting with the given parameters.
   * @param catalog
   * @param version
   * @param query
   */
  private redirect(catalog: string, version: string, query: string): void {
    let params;
    if (version) {
      const root = this.catalogResolver.getRootElement(catalog, version);
      params = [catalog, version, root.type, root.code];
    } else {
      params = [catalog];
    }

    this.router.navigate(params, {
      relativeTo: this.route.parent,
      queryParamsHandling: 'merge'
    });
  }

}
