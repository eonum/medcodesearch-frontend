import { ISwissDrgService } from "./ISwissDrgService";
import { SwissDrgElement } from "../catalog/SwissDrgElement";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";

@Injectable()
export class SwissDrgService implements ISwissDrgService {

    private baseUrl: string = "https://search.eonum.ch/"

    public constructor(private http: Http) { }

    public async search(version: string, search: string): Promise<SwissDrgElement[]> {
        let types : string[] = [ "drgs", "adrgs" ];
        let results: SwissDrgElement[] = [];

        for (let i = 0; i < types.length; i++){
            let type: string = types[i];
            try {
                let webResults = await this.getSearch(type, version, search);
                results = results.concat(webResults)
            }
            catch(e){
                let error = e;
            }
        };
        
        return Promise.resolve(results);
    }

    getVersions(): Promise<string[]> {
        let url: string = this.baseUrl + this.getLocale() + "/drgs/versions";

        return this.http.get(url)
                        .toPromise()
                        .then(response => response.json().data as string[])
                        .catch(error => {});
    }

    public async getByCode(version: string, code: string): Promise<SwissDrgElement> {
        let types : string[] = [ "drgs", "adrgs", "mdcs", "partitions" ];
        let result: SwissDrgElement[];

        for (let i = 0; i < types.length; i++){
            let type: string = types[i];
            try {
                let webResult = await this.getSingleCode(type, version, code);
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

    private async getSingleCode(type: string, version: string, code: string) : Promise<SwissDrgElement>{
        let url : string = this.baseUrl + this.getLocale() + "/" + type + "/" + version + "/" + code +"?show_detail=1";
        return this.http.get(url).toPromise()
                    .then(result => result.json().data as SwissDrgElement)
                    .catch(reason => {throw new Error(reason)});
    }

    private async getSearch(type: string, version: string, query: string) : Promise<SwissDrgElement[]>{
        let url : string = this.baseUrl + this.getLocale() + "/" + type + "/" + version + "/search?highlight=1&search=" + query;
        return this.http.get(url).toPromise()
                    .then(result => { 
                        let data = result.json();
                        return data as SwissDrgElement[]
                    })
                    .catch(reason => {
                        throw new Error(reason)
                    });
    }

    private getLocale(): string {
        return "de";
    }
}