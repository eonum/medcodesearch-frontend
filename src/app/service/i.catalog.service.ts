import { CatalogElement } from "../model/catalog.element";

/**
 * Interface for a catalog data source
 */
export interface ICatalogService {
    init(searchableCodes: string[], retrievableCodes: string[], versionParam: string): void;
    search(version: string, query: string): Promise<CatalogElement[]>;
    getVersions(): Promise<string[]>;
    getByCode(version: string, code: string): Promise<CatalogElement>
}