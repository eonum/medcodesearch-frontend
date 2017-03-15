import { Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "../service/i.catalog.service";

/**
 * Class representing a catalog containing medical
 * information. Allows searching and navigating
 * within a catalog.
 */
@Injectable()
export abstract class Catalog {
    
    /**
     * The name of the catalog.
     */
    protected name: string;

    /**
     * The regex which is used to identify element
     * codes within this catalog.
     */
    protected codeRegex: string;

    /**
     * The service to access the data source
     * (in production this would be the eonum API)
     */
    protected service: ICatalogService;

    /**
     * Constructor for class Catalog
     * @param service the service to access the catalog data
     */
    public constructor(service: ICatalogService){
        this.service = service;
    }

    /**
     * Searches elements within the catalog.
     * @param version the version of the catalog to use
     * @param query the query to search for
     */
    public async search(version: string, query: string): Promise<CatalogElement[]> {
        if (this.isCode(query)){
            let singleResult = await this.getByCode(version, query);
            let result : CatalogElement[] = [];
            if (singleResult != null){
                result.push(singleResult);
            }
            return Promise.resolve(result);
        }
        else {
            return await this.getBySearch(version, query);
        }
    }

    /**
     * Check whether the query is a code or a normal
     * search string.
     * 
     * @param query the query to search for within the catalog
     */
    private isCode(query: string): boolean {
        let regex = new RegExp(this.codeRegex);
        return regex.test(query);
    }    

    protected async getBySearch(version: string, query: string): Promise<CatalogElement[]> {
        return this.service.search(version, query);
    }

    protected async getByCode(version: string, code: string): Promise<CatalogElement> {
        return this.service.getByCode(version, code);
    }

    /**
     * Get all versions supported by the catalog.
     */
    public async getVersions(): Promise<string[]> {
        return this.service.getVersions();
    }
}