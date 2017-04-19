import { CatalogConfiguration } from '../catalog/catalog.configuration';
import { CatalogElement } from '../model/catalog.element';

/**
 * Interface for a catalog data source
 */
export interface ICatalogService {
  init(config: CatalogConfiguration): void;
  search(version: string, query: string): Promise<CatalogElement[]>;
  getVersions(lang: string): Promise<string[]>;
  getByCode(version: string, type: string, code: string, language?: string): Promise<CatalogElement>;
  getLocale(): string;
  getLangs(): string[];
  sendAnalytics(version: string, type: string, code: string, query: string): void;
}
