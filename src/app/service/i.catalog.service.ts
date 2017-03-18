import { CatalogElement } from "../model/catalog.element";
import {Observable} from 'rxjs';

/**
 * Interface for a catalog data source
 */
export interface ICatalogService {
    init(searchableCodes: string[], retrievableCodes: string[], versionParam: string): void;
    search(version: string, query: string): Promise<CatalogElement[]>;
    getVersions(): Observable<string[]>;
    getByCode(version: string, code: string): Promise<CatalogElement>
}
