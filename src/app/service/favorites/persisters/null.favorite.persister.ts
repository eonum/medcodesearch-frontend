import { IFavoritePersister } from './i.favorite.persister';
import { FavoriteElement } from '../../../model/favorite.element';

/**
 * Implementation of {@link IFavoritePersister} which doesn't
 * persist anything.
 */
export class NullFavoritePersister implements IFavoritePersister {

  public persist(elementsToPersist: { [key: string]: FavoriteElement }, numberOfElements: number): void {

  }

  public restore(): { elements: { [key: string]: FavoriteElement }, numberOfElements: number } {
    return null;
  }
}
