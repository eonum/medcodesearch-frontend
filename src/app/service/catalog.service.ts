import {Http} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {CatalogElement} from '../model/catalog.element';
import {ICatalogService} from './i.catalog.service';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
import {CatalogConfiguration} from '../catalog/catalog.configuration';

@Injectable()
export class CatalogService implements ICatalogService {

  private baseUrl: string = "https://search.eonum.ch/";

  private config: CatalogConfiguration;

  public constructor(private http: Http, private translate: TranslateService) {
  }

  /**
   * Initializes the service with catalog specific parameters.
   * Must be called before the first call to the service.
   *
   * @param config
   *              the configuration of the catalog to configure
   *              the service with
   */
  public init(config: CatalogConfiguration): void {
    this.config = config;
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
    let types: string[] = this.config.searchableTypes;
    let results: CatalogElement[] = [];

    for (let i = 0; i < types.length; i++) {
      let type: string = types[i];
      try {
        let webResults = await this.getSearchForType(type, version, query);
        results = results.concat(webResults);
      }
      catch (e) {
        console.log(e);
      }
    }
    return Promise.resolve(results);
  }

  /**
   *  Sends an analytics notification to eonum
   *
   */
  public sendAnalytics(elementType: string, version: string, type: string, code: string, query: string): void {

    const locale: string = this.getLocale();
    const url: string = `${this.baseUrl}${locale}/${elementType}/${version}/${code}?query=${query}`;

    if (environment.production) {
      this.http.get(url);
    } else {
      console.log("Sending analytics: \n" + url);
    }
  }


  /**
   * Get all versions supported by the catalog
   */

  public getVersions(lang: string): Promise<string[]> {
    let url: string = `${this.baseUrl}${lang}/${this.config.versionParam}/versions`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as string[])
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
   * @param type the type of the element
   * @param code the code to search for
   */
  public async getByCode(version: string, type: string, code: string): Promise<CatalogElement> {
    try {
      const webResult: CatalogElement = await this.getSingleElementForTypeByCode(type, version, code);
      if (webResult != undefined && webResult != null) {
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
      .then(result => {
        return result.json() as CatalogElement
      })
      .catch(reason => {
        throw new Error(reason)
      });
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
