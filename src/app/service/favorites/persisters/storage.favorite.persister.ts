import { IFavoritePersister } from './i.favorite.persister';
import { FavoriteElement } from '../../../model/favorite.element';

declare var localStorage: any;

/**
 * Implementation of {@link IFavoritePersister} which uses the
 * browsers LocalStorage API to store elements.
 */
export class StorageFavoritePersister implements IFavoritePersister {

  private readonly storageKey = 'eonum-favorites';

  /**
   * Check whether local storage is available.
   */
  private testLocalStorage(): boolean {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Persists specified data to LocalStorage.
   * @param elementsToPersist the elements to store
   * @param numberOfElements the number of elements to store
   */
  public persist(elementsToPersist: { [key: string]: FavoriteElement }): void {
    if (!this.testLocalStorage()) {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(elementsToPersist));
  }

  /**
   * Restore the previously stored elements from the LocalStorage.
   * Returns null if no elements can be restored.
   */
  public restore(): { [key: string]: FavoriteElement } {
    if (this.testLocalStorage()) {
      return JSON.parse(localStorage.getItem(this.storageKey));
    }

    return null;
  }
}
