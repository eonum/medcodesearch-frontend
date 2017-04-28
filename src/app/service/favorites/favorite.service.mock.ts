import { IFavoriteElementService } from './i.favorite.element.service';
import { CatalogElement } from '../../model/catalog.element';
import { FavoriteElement } from '../../model/favorite.element';
import { Observable } from 'rxjs/Observable';

export class FavoriteElementServiceMock implements IFavoriteElementService {
    count(): number {
        return 0;
    }
    add(element: CatalogElement, version: string, catalog: string, language: string): void {
        
    }
    remove(element: FavoriteElement): void {
        
    }
    isFavorite(element: CatalogElement, version: string, catalog: string, language: string): boolean {
        return false;
    }
    getFavoriteElements(): Observable<FavoriteElement[]> {
        return Observable.from([]);
    }
}