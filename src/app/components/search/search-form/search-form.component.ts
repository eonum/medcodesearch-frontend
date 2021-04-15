
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';


import { Catalog } from '../../../catalog/catalog';
import { ILoggerService } from '../../../service/logging/i.logger.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { CatalogDisplayInfo, CatalogResolver } from '../../../service/routing/catalog-resolver.service';
import { MobileService } from '../../../service/mobile.service';
import { CatalogVersionService } from '../../../service/catalog-version.service';
import {CatalogElement} from '../../../model/catalog.element';
import {computeStyle} from '@angular/animations/browser/src/util';
import {element} from '@angular/core/src/render3/instructions';

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
  public checked: boolean;
  public disabled = false;

  public languages: string[];
  public selectedVersion: string;
  public searchForm = new FormControl();

  public catalogDisplayInfos: CatalogDisplayInfo[];
  public filterDisplayInfos: CatalogDisplayInfo[];
  public tempFilterDisplayInfos = new Array<{ catalog: string; version: string; isChecked: boolean}>();
  public tempFilterIsChecked = new Array <{ catalog: string; version: string; isChecked: boolean}>();
  public tempVersions: string[];

  public displayFilter  = false;
  public regVersion: string;
  public regCatalog: string;


  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject('ILoggerService') private logger: ILoggerService,
    private catalogResolver: CatalogResolver,
    private versionService: CatalogVersionService,
    private mobileService: MobileService) {

    this.searchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged())
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
      // catalog versions to populate the drop-downs, according to the route param
      this.catalogDisplayInfos = data.displayInfos;
      // get all catalogs that will be displayed as filters
      this.filterDisplayInfos = this.catalogDisplayInfos.filter((obj, index) => { return index > 4 })
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
    this.router.navigate(params).catch(error => this.logger.error(error));
  }

  /**
   * Check if the catalog and version exist, and either navigate to the selection, or
   * display the language selector pop-up.
   */
  public updateCatalog(catalog: string, version?: string): void {

    // get the CatalogDisplayInfo to check the version
    const info = this.catalogDisplayInfos.find((inf: CatalogDisplayInfo) => inf.catalog === catalog);
    version = version || info.displayVersion;

    if (info.languageVersions.indexOf(version) === -1) {
      this.showLanguageSelector(catalog, version);

    } else {
      // fill array tempFilterDisplayInfos with all catalogs that have a valid version
      if (info.catalog === 'REG') {
        this.displayFilter = true;
        this.regVersion = version || info.displayVersion;
        this.regCatalog = info.catalog;
        this.tempFilterDisplayInfos = [];

        for (const obj of this.filterDisplayInfos) {
          if (obj.languageVersions.indexOf(obj.displayVersion) !== -1) {
            this.tempVersions = obj.displayVersions;
            for (const ver of this.tempVersions) {
              if (!ver.includes(this.regVersion)) {
                this.tempVersions = this.tempVersions.filter(el => el !== ver);
              } else {
                this.tempFilterDisplayInfos.push({catalog: obj.catalog, version: ver, isChecked: true});
              }
            }
          }
        }
      this.checkFilter();
    } else {
        this.displayFilter = false;
        this.redirect(catalog, version);
      }
    }
  }

  /**
   *  check if checkbox of catalog filters are checked
   */
  public checkFilter(): void {
    // fill array tempFilterIsChecked with all checked catalog filters
    this.tempFilterIsChecked = this.tempFilterDisplayInfos.filter((value, index) => {
      return value.isChecked
    });
    if (this.tempFilterIsChecked.length > 0) {
      for (const obj of this.tempFilterIsChecked) {
        this.redirect(obj.catalog, obj.version);
      }
    } else {
        // only temporary until endpoint 'Gesetze und Reglemente' exists
        this.redirect(this.regCatalog, this.regVersion);
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
    this.languages = this.versionService.getLanguages(catalog, version);

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
      queryParams: query.length > 0 ? { query: query } : null
    }).catch(error => this.logger.error(error));
    this.mobileService.setQuery(query);
  }

  /**
   * Do the catalog selection by redirecting with the given parameters.
   * @param catalog
   * @param version
   */
  private redirect(catalog: string, version: string): void {
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
