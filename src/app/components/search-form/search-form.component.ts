import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {TranslateService} from '@ngx-translate/core';
import {Catalog} from '../../catalog/catalog';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: []
})

export class SearchFormComponent {

  @Input() catalog: Catalog;
  @Input() query: string;

  catalogs: Catalog[];

  constructor(private translate: TranslateService,
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
      [this.translate.currentLang, catalog.getDomain(), version, {query: query}] :
      [this.translate.currentLang, catalog.getDomain(), version];

    this.router.navigate(params).catch(error => console.log(error));
  }



}
