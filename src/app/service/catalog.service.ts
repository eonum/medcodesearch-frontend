import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "./i.catalog.service";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CatalogService implements ICatalogService {

    private baseUrl: string = "https://search.eonum.ch/";

    private searchableCodes: string[];
    private retrievableCodes: string[];
    private versionParam: string;

    public constructor(private http: Http, private translate: TranslateService) {  }

    /**
     * Initializes the service with catalog specific parameters.
     * Must be called before the first call to the service.
     * 
     * @param searchableCodes
     *              the identifier for element types which
     *              can be searched within the catalog
     * @param retrievableCodes
     *              the identifier for element types which
     *              can be retrieved directly from the catalog
     * @param versionParam
     *              the catalog-specific url part for accessing
     *              the versions of the catalog
     */
    public init(searchableCodes: string[], retrievableCodes: string[], versionParam: string): void{
        this.searchableCodes = searchableCodes;
        this.retrievableCodes = retrievableCodes;
        this.versionParam = versionParam;
        
    }

    private getLocale(): string {
        return this.translate.currentLang;
    }

    /**
     * Searches in a specific version of the catalog for the specified
     * query.
     * 
     * Returns an array of search results or an empty array if no results
     * matching the query are found.
     * 
     * @param version the version of the catalog to use
     * @param query the query to search for
     */
    public async search(version: string, query: string): Promise<CatalogElement[]> {
        let results: CatalogElement[] = [];

        for (let i = 0; i < this.searchableCodes.length; i++){
            try {
                let type: string = this.searchableCodes[i];
                let webResults = await this.getSearchForType(type, version, query);
                results = results.concat(webResults)
            }
            catch(e){
                throw new Error("Failed to get search results");
            }
        };
        
        return Promise.resolve(results);
    }

    /**
     * Get all versions supported by the catalog
     */
    public getVersions(): Promise<string[]> {
        let url: string = `${this.baseUrl}${this.getLocale()}/${this.versionParam}/versions`;
        
        return this.http.get(url)
                        .toPromise()
                        .then( response => {
                            return response.json() as string[];
                        })
                        .catch(reason => {
                            throw new Error(reason)
                        });
    }

    /**
     * Find an element in the SwissDRG catalog by its code.
     * 
     * Returns the element with the specified code or
     * throws an error if the element doesn't exist.
     * 
     * @param version the version of the catalog to use
     * @param code the code to search for
     */
    public async getByCode(version: string, code: string): Promise<CatalogElement> {
        let result: CatalogElement[];

        for (let i = 0; i < this.retrievableCodes.length; i++){
            let elementType: string = this.retrievableCodes[i];
            try {
                let webResult = await this.getSingleElementForTypeByCode(elementType, version, code);
                result.push(webResult);
            }
            catch(e){
                throw new Error("Failed to retrieve code");
            }
        };

        if (result.length > 0){
            return Promise.resolve(result[0]);
        }
        
        throw new Error("Not found");
    }

    private async getSingleElementForTypeByCode(elementType: string, version: string, code: string) : Promise<CatalogElement>{
        let locale: string = this.getLocale();
        let url : string =  `${this.baseUrl}${locale}/${elementType}/${version}/${code}?show_detail=1`;
        return this.http.get(url).toPromise()
                    .then(result => {
                        return result.json().data as CatalogElement;
                    })
                    .catch(reason => {
                        throw new Error(reason)
                    });
    }

    private async getSearchForType(elementType: string, version: string, query: string) : Promise<CatalogElement[]>{
        let url : string = `${this.baseUrl}${this.getLocale()}/${elementType}/${version}/search?highlight=1&search=${query}`;
        return this.http.get(url).toPromise()
                    .then(result => { 
                        let data = result.json();
                        return data as CatalogElement[]
                    })
                    .catch(reason => {
                        throw new Error(reason);
                    });
    }
}