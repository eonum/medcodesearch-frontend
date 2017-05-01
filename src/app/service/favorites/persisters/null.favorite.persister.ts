import { IFavoritePersister } from './i.favorite.persister';
import { FavoriteElement } from '../../../model/favorite.element';
export class NullFavoritePersister implements IFavoritePersister {

  public persist(elementsToPersist: { [key: string]: FavoriteElement }, numberOfElements: number): void {

  }

  public restore(): { elements: { [key: string]: FavoriteElement }, numberOfElements: number } {
    return { elements: {}, numberOfElements: 0 };
  }
}
