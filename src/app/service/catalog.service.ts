import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "./i.catalog.service";
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class CatalogService implements ICatalogService {

  private baseUrl: string = "https://search.eonum.ch/";

  private searchableTypes: string[];
  private retrievableTypes: string[];
  private versionParam: string;

  public constructor(private http: Http, private translate: TranslateService) { }

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
  public init(searchableTypes: string[], retrievableTypes: string[], versionParam: string): void {
    this.searchableTypes = searchableTypes;
    this.retrievableTypes = retrievableTypes;
    this.versionParam = versionParam;

  }

  public getLocale(): string {
    if (environment.dev && !this.translate.currentLang) {
      console.log("%c No currentLanguage set", "color:red")
    }
    return this.translate.currentLang;
  }
  public getLangs(): string[] {
    return this.translate.getLangs();
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
    let types: string[] = this.searchableTypes;
    let results: CatalogElement[] = [];

    for (let i = 0; i < types.length; i++) {
      let type: string = types[i];
      try {
        let webResults = await this.getSearchForType(type, version, query);
        results = results.concat(webResults);
      }
      catch (e) {
        let error = e;
      }
    }
    return Promise.resolve(results);
  }

  /**
   * Get all versions supported by the catalog
   */

  public getVersions(lang: string): Promise<string[]> {
    let url: string = `${this.baseUrl}${lang}/${this.versionParam}/versions`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(reason => { throw new Error(reason) });
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
  public async getByCode(version: string, type:string, code: string): Promise<CatalogElement> {
    try {
      const webResult: CatalogElement = await this.getSingleElementForTypeByCode(type, version, code);
      if (webResult != undefined) {
        webResult.type = type;
        return webResult;
      }
    }
    catch (error) {
      console.log(error);
    }

    throw new Error("Not found");
  }

  private async getSingleElementForTypeByCode(elementType: string, version: string, code: string): Promise<CatalogElement> {
    const locale: string = this.getLocale();
    const url: string = `${this.baseUrl}${locale}/${elementType}/${version}/${code}?show_detail=1`;
    if (environment.dev) console.log(url);

    return this.http.get(url).toPromise()
      .then(result => { return result.json() as CatalogElement })
      .catch(reason => { throw new Error(reason) });
  }

  private async getSearchForType(elementType: string, version: string, query: string): Promise<CatalogElement[]> {
    let url: string = `${this.baseUrl}${this.getLocale()}/${elementType}/${version}/search?highlight=1&search=${query}`;
    if (environment.dev) console.log(url);

    return this.http.get(url).toPromise()
      .then(result => {
        const data: CatalogElement[] = result.json() as CatalogElement[];
        data.forEach(element => {
          element.type = elementType;
        });
        return data;
      })
      .catch(reason => {
        throw new Error(reason);
      });
  }
}
