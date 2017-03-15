import {Component} from '@angular/core';

import { SwissDrgCatalog } from "../../catalog/swissdrg.catalog";
import { CHOPCatalog } from "../../catalog/chop.catalog";
import { ICDCatalog } from "../../catalog/icd.catalog";
import { CatalogService } from "../../service/catalog.service";
import { CatalogElement } from "../../model/catalog.element";
import {Catalog} from "../../catalog/catalog";

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
    providers: [ SwissDrgCatalog, CHOPCatalog, ICDCatalog, { provide: "ICatalogService", useClass: CatalogService} ]
})
export class ResultsComponent  {

    private searchResults: CatalogElement[];
    private catalogs: any;

    constructor(private swissDrgCatalog: SwissDrgCatalog,
        private chopCatalog: CHOPCatalog,
        private icdCatalog: ICDCatalog) {
        
        this.catalogs = {};
        this.catalogs['swissdrg'] = swissDrgCatalog;
        this.catalogs['chop'] = chopCatalog;
        this.catalogs['icd'] = icdCatalog;
    }
    
    updateResults(catalog: string, version: string, query: string) {

        this.catalogs[catalog].search(version, query)
            .then(results => {
                this.searchResults = results;
            })
            .catch(error => {
                this.handleError()
            });
    }
    
    private handleError(): void {
    }

}
