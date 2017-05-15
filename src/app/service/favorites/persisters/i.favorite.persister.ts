import { FavoriteElement } from '../../../model/favorite.element';

/**
 * Interface for classes which can store a collection
 * of {@link FavoriteElement}s to a persistent data store
 * like LocalStorage.
 */
export interface IFavoritePersister {
  persist(elementsToPersist: { [key: string]: FavoriteElement }): void;
  restore(): { [key: string]: FavoriteElement };
}
