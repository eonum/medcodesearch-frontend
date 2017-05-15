import { IFavoritePersister } from './i.favorite.persister';
import { FavoriteElement } from '../../../model/favorite.element';

/**
 * Implementation of {@link IFavoritePersister} which doesn't
 * persist anything.
 */
export class NullFavoritePersister implements IFavoritePersister {

  public persist(elementsToPersist: { [key: string]: FavoriteElement }): void {

  }

  public restore(): { [key: string]: FavoriteElement } {
    return null;
  }
}
