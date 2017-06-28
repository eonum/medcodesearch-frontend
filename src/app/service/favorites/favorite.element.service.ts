import { IFavoriteElementService } from './i.favorite.element.service';
import { CatalogElement } from '../../model/catalog.element';
import { FavoriteElement } from '../../model/favorite.element';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IFavoritePersister } from './persisters/i.favorite.persister';
import { ICatalogService } from '../i.catalog.service';

/**
 * Provides functions to mark/unmark an element as favorite.
 * Clients can subscribe to changes of the element collection.
 *
 * The elements are stored within an in-memory dicitionary
 * and are lost as soon as the user closes or refreshes the
 * page (and therefore causes the app to restart).
 * Marked elements are shown by the {@link FavoriteElementComponent}.
 */
@Injectable()
export class FavoriteElementService implements IFavoriteElementService {

  /**
   * Internal dictionary to store the favorite elements
   */
  private favoriteElements: { [key: string]: FavoriteElement };

  /**
   * BehaviorSubject to publish changes on favorite elements
   * collection.
   */

  /*
   * URL for redirecting to grouper.swissdrg.org
   */
  private urlSwissDRGGrouper = 'https://grouper.swissdrg.org/swissdrg/single?version=7.0&pc=_40_0__M_99_99_10_0_';

  /*
   * URL for redirecting to casematch
   */
  private urlCasematch = 'https://casematch2017.eonum.ch/patient_cases/analyzenew?locale=de&pc=_40_0_0_W_01_00_10_0_';

  /*
   * URL for diagnoses and procedures
   */
  private url: string;
  private urlDiagnose = '';
  private urlProcedure = '-_';

  private _favoriteElements: BehaviorSubject<FavoriteElement[]>;

  public constructor(
    @Inject('IFavoritePersister') private persister: IFavoritePersister,
    @Inject('ICatalogService') private catalogService: ICatalogService) {
    this._favoriteElements = new BehaviorSubject([]);

    const restored = this.persister.restore();
    if (restored) {
      this.favoriteElements = restored;
    } else {
      this.favoriteElements = {};
    }

    this.notify();
  }

  /**
   * Returns the number of currently favorite elements.
   */
  public count(): number {
    return Object.keys(this.favoriteElements).length;
  }

  /**
   * Marks an element as favorite.
   *
   * Additional information about language, version and
   * catalog is required for being able to display the
   * element afterwards.
   *
   * @param element the element to mark
   * @param version the current version of the catalog
   * @param catalog the current catalog
   * @param language the current language
   */
  public add(element: CatalogElement, version: string, catalog: string, language: string): void {
    if (!this.isFavorite(element, version, catalog, language)) {
      const elementToStore = FavoriteElement.from(element, version, catalog, language);
      this.favoriteElements[FavoriteElement.keyForFavoriteElement(elementToStore)] = elementToStore;
      this.notify();
      this.persister.persist(this.favoriteElements);

      // elements from ICD are added to diagnoses
      if (catalog === 'ICD' && !element.children) {
        this.addICDToURL(element);
      }

      // elements from CHOP are added to procedures
      if (catalog === 'CHOP' && !element.children) {
        this.addCHOPToURL(element);
      }
    }
  }

  /**
   * Remove a specific favorite
   *
   * @param element the element to remove from favorites
   */
  public removeByFavoriteElement(element: FavoriteElement): void {
    const id = FavoriteElement.keyForFavoriteElement(element);
    this.removeFavouriteElementFromUrl(element);
    this.removeById(id);

  }

  /**
   * Remove the matching favorite of the specified element
   * from the favorite list.
   *
   * @param element the element to remove
   * @param version the version of the element to remove
   * @param catalog the catalog of the element to remove
   * @param language the language of the element to remove
   */
  public removeByCatalogElement(element: CatalogElement, version: string, catalog: string, language: string): void {
    const id = FavoriteElement.keyForCatalogElement(element, version, catalog, language);
    this.removeCatalogElementFromUrl(element);
    this.removeById(id);
  }

  /**
   * Remove the favorite with the specified id.
   *
   * @param id the id of the favorite to remove
   */
  private removeById(id: string): void {
    if (this.favoriteElements[id]) {
      delete this.favoriteElements[id];
      this.notify();
      this.persister.persist(this.favoriteElements);
    }
  }

  /**
   * Returns a value whether the specified element has already been
   * added to the favorite elements.
   *
   * @param element the element to check for being marked
   * @param version the version of the element
   * @param catalog the catalog of the element
   * @param language the language of the element
   */
  public isFavorite(element: CatalogElement, version: string, catalog: string, language: string): boolean {
    const key = FavoriteElement.keyForCatalogElement(element, version, catalog, language);
    return this.favoriteElements[key] !== undefined;
  }

  /**
   * Get all favorite elements as observable. Subscribers can
   * subscribe to changes on those elements.
   */
  public getFavoriteElements(): Observable<FavoriteElement[]> {
    return this._favoriteElements.asObservable();
  }

  /**
   * Notify subscribers about the change of the collection.
   */
  private notify(): void {
    const elements = [];
    const keys = Object.keys(this.favoriteElements);
    keys.forEach(key => {
      elements.push(this.favoriteElements[key]);
    });
    this._favoriteElements.next(elements);
  }

  private addICDToURL(element: CatalogElement)  {
      this.urlDiagnose += element.code + '_';
      console.log('urlDiagnose: ' + this.urlDiagnose)
  }

  private addCHOPToURL(element: CatalogElement) {
    this.urlProcedure += element.code + '_';
    console.log('urlProcedure: ' + this.urlProcedure)

  }

  private removeCatalogElementFromUrl(element: CatalogElement)  {
    if (this.urlDiagnose.includes(element.code)) {
      this.urlDiagnose = this.urlDiagnose.substr(0, this.urlDiagnose.indexOf(element.code)) +
        this.urlDiagnose.substr(this.urlDiagnose.indexOf(element.code) + element.code.length + 1);
    }

    if (this.urlProcedure.includes(element.code)) {
      this.urlProcedure = this.urlProcedure.substr(0, this.urlProcedure.indexOf(element.code)) +
        this.urlProcedure.substr(this.urlProcedure.indexOf(element.code) + element.code.length + 1);
    }
  }

  private removeFavouriteElementFromUrl(element: FavoriteElement)  {
    if (this.urlDiagnose.includes(element.code)) {
      this.urlDiagnose = this.urlDiagnose.substr(0, this.urlDiagnose.indexOf(element.code)) +
        this.urlDiagnose.substr(this.urlDiagnose.indexOf(element.code) + element.code.length + 1);
    }

    if (this.urlProcedure.includes(element.code)) {
      this.urlProcedure = this.urlProcedure.substr(0, this.urlProcedure.indexOf(element.code)) +
        this.urlProcedure.substr(this.urlProcedure.indexOf(element.code) + element.code.length + 1);
    }
  }

  public getSwissDRGUrl(): string {
    if (this.urlSwissDRGGrouper.length < 80) {
      return '';
    } else {
      this.url = '';
      this.url =  this.urlSwissDRGGrouper + this.urlDiagnose + this.urlProcedure +
        '&provider=acute&locale=' + this.catalogService.getLocale();
      return this.url;
    }
  }
  public getCasematchUrl(): string {
    if (this.urlCasematch.length < 90) {
      return '';
    } else {
      this.url = '';
      this.url = this.urlCasematch.substr(0, this.urlCasematch.indexOf('locale'))
        + 'locale=' + this.catalogService.getLocale() + this.urlCasematch.substr(this.urlCasematch.indexOf('locale') + 9)
        + this.urlDiagnose + this.urlProcedure;
        return this.url
    }
  }
}
