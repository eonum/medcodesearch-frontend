import { CatalogElement } from "../model/catalog.element";

export interface ICatalogService {
    init(searchableCodes: string[], retrievableCodes: string[], versionParam: string): void;
    search(version: string, query: string): Promise<CatalogElement[]>;
    getVersions(): Promise<string[]>;
    getByCode(version: string, code: string): Promise<CatalogElement>
}