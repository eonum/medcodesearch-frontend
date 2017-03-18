import {Component, OnInit, ViewChild, Input, OnChanges} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {TranslateService} from '@ngx-translate/core';
import {ResultsComponent} from '../results/results.component';
import {Catalog} from '../../catalog/catalog';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: []
})

export class SearchFormComponent implements OnChanges {

  @Input() catalog: Catalog;

  catalogs: Catalog[];
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
  ngOnChanges() {

    this.route.params.subscribe((params: Params) => {

      this.query   = params['query'] ? params['query'] : '';

      if (this.query) {
        this.resultsComponent.updateResults(this.catalog, this.query);
      }
    });

  }

  /**
   * Update based on catalog selection.
   */
  public updateCatalog(catalog:Catalog, version?: string): void {
    version = version || catalog.getActiveVersion();

    let params = [ this.translate.currentLang,  catalog.getDomain(), version];
    if (this.query) { params.push(this.query); }

    this.router.navigate(params).catch(error => console.log(error) );
  }

  /**
   * Update based on search
   */
  public search(query: string): void {
    this.query = query;

    let params = [
      this.translate.currentLang,
      this.catalog.getDomain(),
      this.catalog.getActiveVersion(),
      query
    ]
    this.router.navigate(params).catch(error => console.log(error) );
  }

}
