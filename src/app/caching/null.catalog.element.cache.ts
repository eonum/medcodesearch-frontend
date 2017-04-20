import { CatalogElement } from '../model/catalog.element';
import { ICatalogElementCache } from "./i.catalog.element.cache";

export class NullCatalogElementCache implements ICatalogElementCache {
    getElement(language: string, catalog: string, version: string, type: string, code: string): CatalogElement { return null; }
    addElement(language: string, catalog: string, version: string, type: string, code: string, element: CatalogElement): void { }
    clear(): void { }
}