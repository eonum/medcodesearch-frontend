import { environment } from './../../environments/environment.prod';

import {CatalogConfiguration, catalogConfigurations} from '../catalog/catalog.configuration';
import { CatalogElement } from '../model/catalog.element';
import { ICatalogService } from './i.catalog.service';
import { ILoggerService } from './logging/i.logger.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import {version} from 'punycode';

@Injectable()
export class CatalogService implements ICatalogService {

  private baseUrl = 'https://search.eonum.ch/';

  private config: CatalogConfiguration;

  public constructor(private http: HttpClient,
                     private translate: TranslateService,
                     @Inject('ILoggerService') private logger: ILoggerService) {
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
    if (!this.translate.currentLang) {
      this.logger.log('No currentLanguage set');
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
    const types: string[] = this.config.searchableTypes;
    let results: CatalogElement[] = [];

    for (let i = 0; i < types.length; i++) {
      const type: string = types[i];
      try {
        const webResults = await this.getSearchForType(type, version, query);
        results = results.concat(webResults);
      } catch (e) {
        this.logger.error(e);
      }
    }
    return Promise.resolve(results);
  }

  /**
   * Send information about how the user found the selected code
   * to the eonum API.
   *
   * @param version the version of the catalog to use
   * @param type the type of the element to send analytics for
   * @param code the code of the element to send analytics for
   * @param query the query which was used before retrieving this element
   */
  public sendAnalytics(version: string, type: string, code: string, query: string): void {

    this.getSingleElementForTypeByCode(type, version, code, query)
      .then(result => {
        this.logger.log('Successfully sent Analytics.');
      })
      .catch(error => {
        this.logger.error('Could not send analytics. Error: ' + error);
      });
  }

  /**
   * Get all versions supported by the catalog in the specified language
   *
   * @param lang the language to get the supported versions for
   */
  public getVersions(lang: string): Promise<void | string[]> {
    const url = `${this.baseUrl}${lang}/${this.config.versionParam}/versions`;

    return this.http.get(url)
      .toPromise()
      .then(response => response as string[])
      .catch(reason => this.logger.error(reason.toString()));
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
  public async getByCode(version: string, type: string, code: string, language?: string): Promise<CatalogElement> {
    try {
      const webResult: CatalogElement = await this.getSingleElementForTypeByCode(type, version, code, null, language);
      if (webResult !== undefined && webResult !== null) {
        return webResult;
      }
    } catch (error) {
      this.logger.log(error);
    }

    throw new Error('Not found');
  }

  private async getSingleElementForTypeByCode(elementType: string,
                                              version: string,
                                              code: string,
                                              query?: string,
                                              language?: string): Promise<CatalogElement> {

    const locale: string = language || this.getLocale();

    let url = `${this.baseUrl}${locale}/${elementType}/${version}/${code}?show_detail=1`;

      if (query) {
        url += `&query=${query}`;
      }

      this.logger.http(url);

      return this.http.get(url).toPromise()
        .then(result => {
          const resultObject: CatalogElement = result as CatalogElement;
          // Assign the type because eonum API doesn't use
          // the concept of types.
          resultObject.type = elementType;

          // Assign the url manually because eonum API doesn't
          // return the url when details are loaded
          resultObject.url = `/${locale}/${elementType}/${version}/${code}`;

          // The code of the element and the code to retrieve the element
          // don't always match (e.g. for partitions in SwissDRG).
          // Therefore store the code to display in name property
          // and store the code to retrieve the element into the code property
          resultObject.name = resultObject.code;
          resultObject.code = code;
          return resultObject;
        })
        .catch(reason => {
          throw new Error(reason);
        });
  }

  private async getSearchForType(elementType: string, version: string, query: string): Promise<CatalogElement[]> {

    const url = `${this.baseUrl}${this.getLocale()}/${elementType}/${version}/search?highlight=1&search=${query}`;

    this.logger.http(url);

    return this.http.get(url).toPromise()
      .then(result => {
        const data: CatalogElement[] = result as CatalogElement[];
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
