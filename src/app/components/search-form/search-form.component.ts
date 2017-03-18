import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {TranslateService} from '@ngx-translate/core';
import {ResultsComponent} from '../results/results.component';
import {Catalog} from '../../catalog/catalog';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: [SwissDrgCatalog, CHOPCatalog, ICDCatalog]
})

export class SearchFormComponent implements OnInit {

  catalogs: Catalog[];
  catalog: string;
  version: string;
  query: string;

  @ViewChild(ResultsComponent)
  private resultsComponent: ResultsComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private swissDrgCatalog: SwissDrgCatalog,
              private chopCatalog: CHOPCatalog,
              private icdCatalog: ICDCatalog,
              private translate: TranslateService) {

    this.catalogs = [swissDrgCatalog, chopCatalog, icdCatalog]
  }

  /**
   * Preselect the proper catalog version if given through url
   */
  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.catalog = params['catalog'];
      this.version = params['version'];
      this.query   = params['query'] ? params['query'] : '';

      if (this.query) {
        this.resultsComponent.updateResults(this.catalog, this.version, this.query);
      }
    });

  }

  /**
   * Update based on catalog selection.
   */
  public updateCatalog(catalog:Catalog, version?: string): void {
    if(version){
      catalog.activateVersion(version);
      this.version = version;
    }

    this.catalog = catalog.getDomain();

    let params = [this.translate.currentLang, this.catalog, this.version];

    if (this.query) {
      params.push(this.query)
    }
    this.router.navigate(params).catch(error => console.log(error) );
  }

  /**
   * Update based on search
   */
  public search(query: string): void {
    this.query = query;
    this.router.navigate([this.translate.currentLang, this.catalog, this.version, query]);
  }

}
