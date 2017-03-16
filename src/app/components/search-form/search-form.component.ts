import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {TranslateService} from '@ngx-translate/core';
import {ResultsComponent} from '../results/results.component';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
    providers: [SwissDrgCatalog, CHOPCatalog, ICDCatalog]
})

export class SearchFormComponent implements OnInit {

    catalogs: any;
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

        this.catalogs = [
            {
                name: 'SwissDRG',
                path: 'swissdrg',
                catalog: swissDrgCatalog
            },
            {
                name: 'CHOP',
                path: 'chop',
                catalog: chopCatalog
            },
            {
                name: 'ICD',
                path: 'icd',
                catalog: icdCatalog
            }
        ];

        for (const n in this.catalogs) {
            this.getVersions(this.catalogs[n]);
        }
    }

    /**
     * Preselect the proper catalog version if given through url
     */
    ngOnInit() {

        this.route.params.subscribe((params: Params) => {
            this.catalog = params['catalog'];
            this.version = params['version'];
            this.query = params['query'] ? params['query'] : '';

            if (this.catalog && this.version) {
                for (let n in this.catalogs) {
                    if (this.catalogs[n].path === this.catalog) {
                        this.catalogs[n].currentVersion = this.version;
                    }
                }
            }

            if (this.query) {
              this.resultsComponent.updateResults(this.catalog, this.version, this.query);
            }
        });

    }

    /**
     * Get versions for catalog
     */
    private async getVersions(catalog: any) {
        const versions = await catalog.catalog.getVersions();
        catalog.versions = versions.reverse();
        if (!catalog.currentVersion) {
            catalog.currentVersion = versions[0];
        }
    }

    /**
     * Update based on catalog selections
     */
    public updateCatalog(catalog: string, version: string): void {
        if (this.query) {
            this.router.navigate([this.translate.currentLang, catalog, version, this.query]);
        } else {
            this.router.navigate([this.translate.currentLang, catalog, version]);
        }
    }

    /**
     * Update based on search
     */
    public search(query: string): void {
        this.query = query;
        this.router.navigate([this.translate.currentLang, this.catalog, this.version, query]);
    }

}
