import { CatalogElement } from '../model/catalog.element';
import { RememberedElement } from '../model/remembered.element';
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
 * Marked elements are shown by the {@link RememberElementComponent}.
 */
@Injectable()
export class RememberElementService {

  /**
   * Internal dictionary to store the marked elements
   */
  private rememberedElements: { [key: string]: RememberedElement };
  private numberOfElements: number;

  /**
   * BehaviorSubject to publish changes on remembered elements
   * collection.
   */
  private _rememberedElements: BehaviorSubject<RememberedElement[]>;

  public constructor() {
    this.rememberedElements = {};
    this.numberOfElements = 0;

    this._rememberedElements = new BehaviorSubject([]);
  }

  /**
   * Returns the number of currently marked elements.
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
    if (!this.isMarked(element, version, catalog, language)) {
      const elementToStore = RememberedElement.from(element, version, catalog, language);
      this.rememberedElements[elementToStore.getId()] = elementToStore;
      this.numberOfElements++;
      this.notify();
    }
  }

  /**
   * Unmark a specific element
   * 
   * @param element the element to unmark
   */
  public remove(element: RememberedElement): void {
    const id = element.getId();
    if (this.rememberedElements[id]) {
      delete this.rememberedElements[id];
      this.numberOfElements--;
      this.notify();
    }
  }

  /**
   * Returns a value whether the specified element has already been
   * added to the remembered elements.
   * 
   * @param element the element to check for being marked
   * @param version the version of the element
   * @param catalog the catalog of the element
   * @param language the language of the element
   */
  public isMarked(element: CatalogElement, version: string, catalog: string, language: string): boolean {
    const key = RememberedElement.keyForCatalogElement(element, version, catalog, language);
    return this.rememberedElements[key] !== undefined;
  }

  /**
   * Get all marked elements as observable. Subscribers can
   * subscribe to changes on those elements.
   */
  public getRememberedElements(): Observable<RememberedElement[]> {
    return this._rememberedElements.asObservable();
  }

  /**
   * Notify subscribers about the change of the collection.
   */
  private notify(): void {
    const elements = [];
    const keys = Object.keys(this.rememberedElements);
    keys.forEach(key => {
      elements.push(this.rememberedElements[key]);
    });
    this._rememberedElements.next(elements);
  }
}
