import { IFavoritePersister } from './i.favorite.persister';
import { FavoriteElement } from '../../../model/favorite.element';

declare var sessionStorage: any;

/**
 * Implementation of {@link IFavoritePersister} which uses the
 * browsers SessionStorage API to store elements.
 */
export class SessionFavoritePersister implements IFavoritePersister {

  private readonly storageKey = 'eonum-favorites';

  /**
   * Check whether local storage is available.
   */
  private testLocalStorage(): boolean {
    const test = 'test';
    try {
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Persists specified data to SessionStorage.
   * @param elementsToPersist the elements to store
   * @param numberOfElements the number of elements to store
   */
  public persist(elementsToPersist: { [key: string]: FavoriteElement }): void {
    if (!this.testLocalStorage()) {
      return;
    }

    sessionStorage.setItem(this.storageKey, JSON.stringify(elementsToPersist));
  }

  /**
   * Restore the previously stored elements from the SessionStorage.
   * Returns null if no elements can be restored.
   */
  public restore(): { [key: string]: FavoriteElement } {
    if (this.testLocalStorage()) {
      return JSON.parse(sessionStorage.getItem(this.storageKey));
    }

    return null;
  }
}
