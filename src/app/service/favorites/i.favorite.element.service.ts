import { CatalogElement } from '../../model/catalog.element';
import { FavoriteElement } from '../../model/favorite.element';
import { Observable } from 'rxjs/Observable';

export interface IFavoriteElementService {
  count(): number;
  add(element: CatalogElement, version: string, catalog: string, language: string): void;
  removeByFavoriteElement(element: FavoriteElement): void;
  removeByCatalogElement(element: CatalogElement, version: string, catalog: string, language: string): void;
  isFavorite(element: CatalogElement, version: string, catalog: string, language: string): boolean;
  getFavoriteElements(): Observable<FavoriteElement[]>;
  getSwissDRGUrl(): string;
  getCasematchUrl(): string;

}
