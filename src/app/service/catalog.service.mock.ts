import { CatalogConfiguration } from '../catalog/catalog.configuration';
import { CatalogElement } from '../model/catalog.element';
import { ICatalogService } from './i.catalog.service';

export class CatalogServiceMock implements ICatalogService {

  private CONTENTS: CatalogElement[] = [
    { code: 'Content 1', text: 'Description content 1', url: '/url/to/content1', type: 'drgs' },
    { code: 'Content 2', text: 'Description content 2', url: '/url/to/content2', type: 'drgs' },
    { code: 'Content 3', text: 'Description content 3', url: '/url/to/content3', type: 'drgs' },
    { code: 'Content 4', text: 'Description content 4', url: '/url/to/content4', type: 'drgs' },
    { code: 'Content 5', text: 'Description content 5', url: '/url/to/content5', type: 'drgs' },
    { code: 'Content 6', text: 'Description content 6', url: '/url/to/content6', type: 'drgs' },
    { code: 'Content 7', text: 'Description content 7', url: '/url/to/content7', type: 'drgs' }
  ];

  public init(config: CatalogConfiguration): void {

  }

  public search(version: string, search: string): Promise<CatalogElement[]> {
    return Promise.resolve(this.CONTENTS);
  }

  public getVersions(language: string): Promise<string[]> {
    return Promise.resolve(['V1.0', 'V2.0', 'V3.0', 'V4.0']);
  }

  public getByCode(version: string, code: string, language?: string): Promise<CatalogElement> {
    if (code === 'P20A') {
      return Promise.resolve(this.CONTENTS[0]);
    }

    throw new Error('Not found');

  }

  public getLocale(): string {
    return 'de';
  }

  public getLangs(): string[] {
    return ['de', 'fr', 'it', 'en'];
  }

  public sendAnalytics(version: string, type: string, code: string, query: string): void {
    return;
  }
}
