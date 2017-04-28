import { IFavoriteElementService } from './i.favorite.element.service';
import { CatalogElement } from '../../model/catalog.element';
import { FavoriteElement } from '../../model/favorite.element';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

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
  private numberOfElements: number;

  /**
   * BehaviorSubject to publish changes on favorite elements
   * collection.
   */
  private _favoriteElements: BehaviorSubject<FavoriteElement[]>;

  public constructor() {
    this.favoriteElements = {};
    this.numberOfElements = 0;

    this._favoriteElements = new BehaviorSubject([]);
  }

  /**
   * Returns the number of currently favorite elements.
   */
  public count(): number {
    return this.numberOfElements;
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
      this.favoriteElements[elementToStore.getId()] = elementToStore;
      this.numberOfElements++;
      this.notify();
    }
  }

  /**
   * Unmark a specific element
   * 
   * @param element the element to unmark
   */
  public remove(element: FavoriteElement): void {
    const id = element.getId();
    if (this.favoriteElements[id]) {
      delete this.favoriteElements[id];
      this.numberOfElements--;
      this.notify();
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
}
