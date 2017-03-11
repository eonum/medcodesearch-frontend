import { CatalogElement } from './CatalogElement'
import { Injectable } from "@angular/core";

@Injectable()
export abstract class Catalog {
    protected name: string;
    protected codeRegex: string;

    public abstract async getVersions() : Promise<string[]>;

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

    private isCode(query: string): boolean {
        let regex = new RegExp(this.codeRegex);
        return regex.test(query);
    }
    
    protected abstract async getByCode(version: string, code: string): Promise<CatalogElement>;
    protected abstract async getBySearch(version: string, query: string): Promise<CatalogElement[]>;
}