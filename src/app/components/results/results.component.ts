import {Component} from '@angular/core';
import { environment } from '../../../environments/environment';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CatalogService} from '../../service/catalog.service';
import {CatalogElement} from '../../model/catalog.element';
import {Catalog} from '../../catalog/catalog';

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
    providers: [SwissDrgCatalog, CHOPCatalog, ICDCatalog, {provide: 'ICatalogService', useClass: CatalogService}]
})
export class ResultsComponent {

    private searchResults: CatalogElement[];

    public updateResults(catalog: Catalog, query: string) {
        catalog.search(catalog.getActiveVersion(), query)
            .then(results => {
                this.searchResults = results;
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    private handleError(error): void {
      if (environment.dev) {
        console.log(error);
      }
    }

}
