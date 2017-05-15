import { CatalogElement } from '../model/catalog.element';
import { ICatalogService } from '../service/i.catalog.service';
import { NullLoggerService } from '../service/logging/null.logger.service';
import { SwissDrgCatalog } from './swissdrg.catalog';
import { async } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

describe('SwissDrgCatalog', () => {

  let mock: TypeMoq.IMock<ICatalogService>;

  beforeEach(() => {
    mock = TypeMoq.Mock.ofType<ICatalogService>();
  });

  it('Should initialize service when searching', async(() => {

    mock.setup(x => x.init(TypeMoq.It.isValue(
      {
        searchableTypes: ['drgs'],
        versionParam: 'drgs',
        rootElement: { type: 'mdcs', code: 'ALL' }
      }))).verifiable(TypeMoq.Times.once());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.search('V1.0', 'test').then(results => {
      mock.verifyAll();
    });
  }));

  it('Should return a list of results', async(() => {
    const catalogs: CatalogElement[] = [
      { code: 'Content 1', text: 'Description content 1', url: '/url/to/content1', type: 'drgs' },
      { code: 'Content 2', text: 'Description content 2', url: '/url/to/content2', type: 'drgs' }
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

  it('Should initialize service when retrieving element with specified code', () => {
    const elementToReturn: CatalogElement = { code: 'A12', text: 'Description', type: 'drgs', url: '/path/to/A12' };

    mock.setup(x => x.getByCode('V1.0', 'drgs', 'A12', 'de')).returns(() => Promise.resolve(elementToReturn));
    mock.setup(x => x.init(TypeMoq.It.isValue(
      {
        searchableTypes: ['drgs'],
        versionParam: 'drgs',
        rootElement: { type: 'mdcs', code: 'ALL' }
      }))).verifiable(TypeMoq.Times.once());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.getByCode('drgs', 'A12', 'V1.0', 'de').then(result => {
      mock.verifyAll();
    });
  });

  it('Should return element with specified code', () => {
    const elementToReturn: CatalogElement = { code: 'A12', text: 'Description', type: 'drgs', url: '/path/to/A12' };

    mock.setup(x => x.getByCode('V1.0', 'drgs', 'A12', 'de')).returns(() => Promise.resolve(elementToReturn));

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.getByCode('drgs', 'A12', 'V1.0', 'de').then(result => {
      expect(result).toBe(elementToReturn);
    });
  });

  it('Should initialize service when sending analytics', () => {
    mock.setup(x => x.init(TypeMoq.It.isValue(
      {
        searchableTypes: ['drgs'],
        versionParam: 'drgs',
        rootElement: { type: 'mdcs', code: 'ALL' }
      }))).verifiable(TypeMoq.Times.once());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.sendAnalytics('drgs', 'A12', 'V1.0', 'magen');
    mock.verifyAll();
  });

  it('Should send analytics', () => {
    mock.setup(x => x.sendAnalytics('V1.0', 'drgs', 'A12', 'magen')).verifiable(TypeMoq.Times.once());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object, new NullLoggerService());
    catalog.sendAnalytics('drgs', 'A12', 'magen', 'V1.0');
    mock.verifyAll();
  });
});
