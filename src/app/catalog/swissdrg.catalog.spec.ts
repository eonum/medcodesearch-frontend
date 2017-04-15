import { CatalogElement } from '../model/catalog.element';
import { ICatalogService } from '../service/i.catalog.service';
import { NullLoggerService } from '../service/logging/null.logger.service';
import { SwissDrgCatalog } from './swissdrg.catalog';
import { async } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

describe("SwissDrgCatalog", () => {

  let mock: TypeMoq.IMock<ICatalogService>;

  beforeEach(() => {
    mock = TypeMoq.Mock.ofType<ICatalogService>();
    mock.setup(service =>
      service.getVersions(TypeMoq.It.isAnyString())
    ).returns(() => Promise.resolve(['V1.0', 'V2.0', 'V3.0', 'V4.0']));

    mock.setup(service =>
      service.getLangs()
    ).returns(() => ['de', 'en']);

    mock.setup(service => service.getLocale()).returns(() => 'de');
  });

  it('Should initialize service when retrieving versions', async(() => {

    mock.setup(x => x.init(TypeMoq.It.isValue(
      {
        searchableTypes: ['drgs'],
        retrievableTypes: ['drgs', 'adrgs', 'partition', 'mdcs'],
        versionParam: 'drgs',
        rootElementType: 'mdcs'
      }))).verifiable(TypeMoq.Times.atLeastOnce());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.getVersions();
    mock.verifyAll();
  }));

  it('Should initialize service when searching', async(() => {

    mock.setup(x => x.init(TypeMoq.It.isValue(
      {
        searchableTypes: ['drgs'],
        retrievableTypes: ['drgs', 'adrgs', 'partition', 'mdcs'],
        versionParam: 'drgs',
        rootElementType: 'mdcs'
      }))).verifiable(TypeMoq.Times.atLeastOnce());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.search('V1.0', 'test').then(results => {
      mock.verifyAll();
    });
  }));

  it('Should get a list of versions', async(() => {
    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.getVersions().then(versions => {
      expect(versions.length).toBe(4);
    });
  }));

  it('Should get a list of versions from cache', async(() => {
    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.getVersions().then(outerVersions => {
      catalog.getVersions().then(versions => {
        expect(versions.length).toBe(4);
      });
    });
  }));

  it('Should return a list of results', async(() => {
    const catalogs: CatalogElement[] = [
      { code: "Content 1", text: "Description content 1", url: "/url/to/content1", type: "drgs" },
      { code: "Content 2", text: "Description content 2", url: "/url/to/content2", type: "drgs" }
    ];

    mock.setup(x => x.search('V1.0', 'Content')).returns(() => Promise.resolve(catalogs));

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.search('V1.0', 'Content').then(results => {
      expect(results.length).toBe(2);
    });
  }));

  it('Should return empty array if error is thrown', async(() => {
    mock.setup(x => x.search('V1.0', 'P23')).returns(() => Promise.resolve([]));

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.search('V1.0', 'P23')
      .then(result => {
        expect(result.length).toBe(0);
      });
  }));

  it('Should return "V1.0" after version is activated', async(() => {
    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.activateVersion('V1.0').then(res => {
      expect(catalog.getActiveVersion()).toBe('V1.0');
    });
  }));

  it('Should return the root element', async(() => {
    const root: CatalogElement = { code: 'ALL', text: 'The root', url: 'url/to/root', type: 'drgs' };
    mock.setup(x => x.getByCode('V1.0', 'mdcs', 'ALL')).returns(() => {
      return Promise.resolve(root);
    });

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.activateVersion('V1.0').then(res => {
      catalog.getRootElement().then(element => {
        expect(element).toBe(root);
      });
    });
  }));

  it('Should have version "V4.0" in current lang', async(() => {
    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.activateVersion('V1.0').then(res => {
      const result = catalog.hasVersionInCurrentLanguage('V4.0');
      expect(result).toBe(true);
    });
  }));

  it('Should not have version "V5.0" in current lang', async(() => {
    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.activateVersion('V1.0').then(res => {
      const result = catalog.hasVersionInCurrentLanguage('V5.0');
      expect(result).toBe(false);
    });
  }));

  it('Should not have version "V4.0" in current lang if versions are not loaded', async(() => {
    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    const result = catalog.hasVersionInCurrentLanguage('V4.0');
    expect(result).toBe(false);
  }));
});
