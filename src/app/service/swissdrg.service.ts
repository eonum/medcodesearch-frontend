import { ISwissDrgService } from "./ISwissDrgService";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SwissDrgElement } from "../model/swissdrg.element";
import { CatalogService } from "./catalog.service";

/**
 * Class SwissDrgService queries the eonum API. It only uses
 * the SwissDRG/ADRG catalog part of the API.
 */
@Injectable()
export class SwissDrgService extends CatalogService implements ISwissDrgService{

    public constructor(http: Http, translate: TranslateService){
        super(http, translate);
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
    public async search(version: string, query: string): Promise<SwissDrgElement[]> {
        let types : string[] = [ "drgs", "adrgs" ];
        let results: SwissDrgElement[] = [];

        for (let i = 0; i < types.length; i++){
            let type: string = types[i];
            try {
                let webResults = await this.getSearchForType(type, version, query);
                results = results.concat(webResults)
            }
            catch(e){
                let error = e;
            }
        };
        
        return Promise.resolve(results);
    }

    /**
     * Return all versions supported by the SwissDRG catalog.
     */
    public getVersions(): Promise<string[]> {
        let url: string = `${this.baseUrl}${this.getLocale()}/drgs/versions`;

        return this.http.get(url)
                        .toPromise()
                        .then(response => response.json().data as string[])
                        .catch(error => {});
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
    public async getByCode(version: string, code: string): Promise<SwissDrgElement> {
        let types : string[] = [ "drgs", "adrgs", "mdcs", "partitions" ];
        let result: SwissDrgElement[];

        for (let i = 0; i < types.length; i++){
            let elementType: string = types[i];
            try {
                let webResult = await this.getSingleElementForTypeByCode(elementType, version, code);
                result.push(webResult);
            }
            catch(e){
                let error = e;
            }
        };

        if (result.length > 0){
            return Promise.resolve(result[0]);
        }
        
        throw new Error("Not found");
    }

    private async getSingleElementForTypeByCode(elementType: string, version: string, code: string) : Promise<SwissDrgElement>{
        let url : string =  `${this.baseUrl}${this.getLocale()}/${elementType}/${version}/${code}?show_detail=1`;
        return this.http.get(url).toPromise()
                    .then(result => result.json().data as SwissDrgElement)
                    .catch(reason => {throw new Error(reason)});
    }

    private async getSearchForType(elementType: string, version: string, query: string) : Promise<SwissDrgElement[]>{
        let url : string = `${this.baseUrl}${this.getLocale()}/${elementType}/${version}/search?highlight=1&search=${query}`;
        return this.http.get(url).toPromise()
                    .then(result => { 
                        let data = result.json();
                        return data as SwissDrgElement[]
                    })
                    .catch(reason => {
                        throw new Error(reason)
                    });
    }
}