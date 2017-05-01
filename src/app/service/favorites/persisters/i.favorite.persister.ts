import { FavoriteElement } from '../../../model/favorite.element';

export interface IFavoritePersister {
  persist(elementsToPersist: { [key: string]: FavoriteElement }, numberOfElements: number): void;
  restore(): { elements: { [key: string]: FavoriteElement }, numberOfElements: number };
}
