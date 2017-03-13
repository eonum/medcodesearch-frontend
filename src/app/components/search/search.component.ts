import {Component, OnInit, Input} from "@angular/core";
import { SwissDrgCatalog } from "../../catalog/swissdrg.catalog";
import { CatalogElement } from "../../model/catalog.element";
import { CatalogService } from "../../service/catalog.service";
import {Catalog} from "../../catalog/catalog";

@Component({
    selector: 'search-component',
    templateUrl: 'search.component.html',
    providers: [ SwissDrgCatalog, { provide: "ICatalogService", useClass: CatalogService} ]
})

export class SearchComponent implements OnInit {

    @Input() catalog: Catalog;

    public ngOnInit(): void {
        this.getSearchResults("");
    }

    private searchResults: CatalogElement[];

    public constructor(){}

    public search(query: string): void {
        this.getSearchResults(query);
    }

    private getSearchResults(query: string): void {
        this.catalog.search("V1.0", query)
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
