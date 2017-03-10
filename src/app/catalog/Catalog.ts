import { CatalogElement } from './CatalogElement'
import { Injectable } from "@angular/core";

@Injectable()
export abstract class Catalog {
    protected name: string;
    protected codeRegex: string;

    public abstract getVersions() : string[];

    public search(version: string, query: string): CatalogElement[] {
        if (this.isCode(query)){
            let result : CatalogElement[] = new Array[0];
            let singleResult : CatalogElement = this.getByCode(version, query);
            if (singleResult != null){
                result.push();
            }
            return result;
        }
        else {
            return this.getBySearch(version, query);
        }
    }

    private isCode(query: string): boolean {
        let regex = new RegExp(this.codeRegex);
        return regex.test(query);
    }
    
    protected abstract getByCode(version: string, code: string): CatalogElement;
    protected abstract getBySearch(version: string, query: string): CatalogElement[];
}