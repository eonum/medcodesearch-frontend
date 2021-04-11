
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

  public languages: string[];
  public selectedVersion: string;
  public searchForm = new FormControl();

  public catalogDisplayInfos: CatalogDisplayInfo[];
  public filterDisplayInfos: CatalogDisplayInfo[];
  public displayFilter = false;


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

      // tslint:disable-next-line:max-line-length
      this.catalogDisplayInfos = data.displayInfos.filter(obj => obj.catalog === 'CHOP' || obj.catalog === 'SwissDRG' || obj.catalog === 'TARMED' || obj.catalog === 'ICD' || obj.catalog === 'Gesetze und Reglemente');
      this.filterDisplayInfos = data.displayInfos.filter(obj => obj.catalog === 'KLV1');
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
      if (info.catalog === 'Gesetze und Reglemente') {
        this.checked = false;
        this.redirect(catalog, version);

        /* not ideal solution */
        // check if filter are available for the updated version of the catalog Gesetze und Reglemente
        /*if (info.catalog === 'Gesetze und Reglemente') {
          this.checkFilter(info.catalog, info.displayVersion);
          /*this.updateFilterVersion(info);
        } else {*/
      } else {
        this.redirect(catalog, version);
      }
    }
  }

  /* ToDo check if filter is available in version of catalog and update or disable filter */
  /*
  public updateFilterVersion(info) {
    console.log(this.filterDisplayInfos);
    for (const obj of this.filterDisplayInfos){
     if (obj.displayVersions.indexOf(info.displayVersion) !== -1) {
       for (let i = 0; i < obj.displayVersions.length; i++) {
         const ver = obj.displayVersions[i];
         if (ver.includes(info.displayVersion)) {
           console.log(obj.displayVersion);
           this.filterDisplayInfos.splice(obj, 1);
           return obj.displayVersion === ver;
           console.log(obj.displayVersion);
         } else {

         }
       }
     }
      for (const obj of this.filterDisplayInfos){
        if (!obj.displayVersion.includes(info.displayVersion)) {
          if (!obj.displayVersions.includes(info.displayVersion)) {
            this.filterDisplayInfos = this.filterDisplayInfos.filter( temp => temp.catalog !== obj.catalog)
            console.log(this.filterDisplayInfos);
          } else {
          for (let i = 0; i < obj.displayVersions.length; i++) {
            const ver = obj.displayVersions[i];
            if (ver.includes(info.displayVersion)) {
              console.log(obj.displayVersion);
              this.filterDisplayInfos.splice(obj, 1);
              return obj.displayVersion === ver;
              console.log(obj.displayVersion);
              break;
            }
          }
        }
      }

     this.filterDisplayInfos.push(obj);
    }
    this.displayFilter = this.filterDisplayInfos.length > 0;
    console.log(this.displayFilter);
    console.log(this.filterDisplayInfos);
    return this.filterDisplayInfos;
  }*/


  public checkFilter(catalog: string, version?: string): void {
    const element = <HTMLInputElement> document.getElementById('defaultCheck');

    if (element.checked) {
          this.redirect(catalog, version);
      } else {
      /* only temporary solution -> should not be hardcoded */
          catalog = 'Gesetze und Reglemente';
          version = '2021';
          this.updateCatalog(catalog, version);
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
