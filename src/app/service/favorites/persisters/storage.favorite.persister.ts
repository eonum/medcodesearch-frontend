import { IFavoritePersister } from './i.favorite.persister';
import { FavoriteElement } from '../../../model/favorite.element';
export class StorageFavoritePersister implements IFavoritePersister {

  public persist(elementsToPersist: { [key: string]: FavoriteElement }, numberOfElements: number): void {
    localStorage.setItem('eonum-favorites', JSON.stringify({ elements: elementsToPersist, numberOfElements: numberOfElements }));
  }

  public restore(): { elements: { [key: string]: FavoriteElement }, numberOfElements: number } {
    const retrieved = JSON.parse(localStorage.getItem('eonum-favorites'));
    return retrieved;
  }
}
