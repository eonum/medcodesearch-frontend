import { IFavoriteElementService } from './i.favorite.element.service';
import { CatalogElement } from '../../model/catalog.element';
import { FavoriteElement } from '../../model/favorite.element';
import { Observable } from 'rxjs/Observable';

export class FavoriteElementServiceMock implements IFavoriteElementService {
  public count(): number {
    return 0;
  }
  public add(element: CatalogElement, version: string, catalog: string, language: string): void {

  }
  public isFavorite(element: CatalogElement, version: string, catalog: string, language: string): boolean {
    return false;
  }
  public getFavoriteElements(): Observable<FavoriteElement[]> {
    return Observable.from([]);
  }
  public removeByFavoriteElement(element: FavoriteElement): void {

  }
  public removeByCatalogElement(element: CatalogElement, version: string, catalog: string, language: string): void {

  }
}
