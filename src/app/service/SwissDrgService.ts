import { ISwissDrgService } from "./ISwissDrgService";
import { SwissDrgElement } from "../catalog/SwissDrgElement";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/toPromise';

export class SwissDrgService implements ISwissDrgService {

    private baseUrl: string = "http://search.eonum.ch/"

    public constructor(private http: Http) { }

    search(version: string, search: string): Promise<SwissDrgElement[]> {
        throw new Error('Method not implemented.');
    }

    getVersions(): Promise<string[]> {
        let url: string = this.baseUrl + this.getLocale() + "/drgs/versions";

        return this.http.get(url)
                        .toPromise()
                        .then(response => response.json().data as string[])
                        .catch();
    }

    public async getByCode(version: string, code: string): Promise<SwissDrgElement> {
        let types : string[] = [ "drgs", "adrgs", "mdcs", "partitions" ];
        let result: SwissDrgElement[];
        let promises: Promise<SwissDrgElement>[];

        for (let i = 0; i < types.length; i++){
            let type: string = types[i];
            try {
                let webResult = await this.getSingleCode(type, version, code);
                result.push(webResult);
            }
            catch(e){
                //TODO: error handling
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

    private getLocale(): string {
        return "de";
    }
}