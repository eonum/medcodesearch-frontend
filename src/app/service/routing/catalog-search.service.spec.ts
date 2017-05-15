import { NullLoggerService } from '../logging/null.logger.service';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { CatalogSearchService } from './catalog-search.service';
import * as TypeMoq from 'typemoq';
import { CatalogElement } from '../../model/catalog.element';

describe('Catalog Search Service', () => {
  const swissDrgMock = TypeMoq.Mock.ofType<SwissDrgCatalog>();
  const icdMock = TypeMoq.Mock.ofType<ICDCatalog>();
  const chopMock = TypeMoq.Mock.ofType<CHOPCatalog>();

  let notified: boolean;
  let results: CatalogElement[];
  let numberOfResultsToSkip = 0;

  function createSubscriber(expectations: () => void): ((result: CatalogElement[]) => void) {
    return (result: CatalogElement[]) => {
      if (numberOfResultsToSkip <= 0) {
        notified = true;
        results = result;
        expectations();
      }

      numberOfResultsToSkip--;
    };
  }

  beforeAll(() => {
    swissDrgMock.setup(x => x.getName()).returns(() => 'SwissDRG');
    icdMock.setup(x => x.getName()).returns(() => 'ICD');
    chopMock.setup(x => x.getName()).returns(() => 'CHOP');
  });

  beforeEach(() => {
    notified = false;
    results = null;
    numberOfResultsToSkip = 0;
  });

  it('Should create', () => {
    const service = new CatalogSearchService(null, swissDrgMock.object, chopMock.object, icdMock.object, new NullLoggerService());
    expect(service).toBeTruthy();
  });

  it('Should notify subscriber with null on empty search', () => {
    numberOfResultsToSkip = 1; // Initial result

    const subscriber = createSubscriber(() => {
      expect(notified).toBe(true);
      expect(results).toBeFalsy();
    });

    const service = new CatalogSearchService(null, swissDrgMock.object, chopMock.object, icdMock.object, new NullLoggerService());
    service.subscribe(subscriber);
    service.search(null);
  });

  it('Should notify subscriber with results on search', () => {
    const res: CatalogElement[] = [
      { code: 'Content 1', text: 'Description content 1', url: '/url/to/content1', type: 'drgs' },
      { code: 'Content 2', text: 'Description content 2', url: '/url/to/content2', type: 'drgs' }
    ];

    numberOfResultsToSkip = 2; // Inital result on subscribe and empty result

    const subscriber = createSubscriber(() => {
      expect(notified).toBe(true);
      expect(results).toBeTruthy();
      expect(results.length).toBe(2);
    });

    swissDrgMock.setup(x => x.search('V1.0', 'content')).returns(() => Promise.resolve(res));

    const service = new CatalogSearchService(null, swissDrgMock.object, chopMock.object, icdMock.object, new NullLoggerService());
    service.subscribe(subscriber);
    service.search({ 'catalog': 'SwissDRG', 'version': 'V1.0', 'query': 'content' });
  });

  it('Should send analytics', () => {
    swissDrgMock.setup(x => x.sendAnalytics('drg', 'A12', 'content', 'V1.0')).verifiable(TypeMoq.Times.once());
    const service = new CatalogSearchService(null, swissDrgMock.object, chopMock.object, icdMock.object, new NullLoggerService());

    service.sendAnalytics({ 'catalog': 'SwissDRG', 'version': 'V1.0', 'query': 'content' }, 'drg', 'A12');
    swissDrgMock.verifyAll();
  });
});
