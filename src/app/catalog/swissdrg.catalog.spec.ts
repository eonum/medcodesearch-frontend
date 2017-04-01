import { async } from '@angular/core/testing';
import { SwissDrgCatalog } from './swissdrg.catalog';
import * as TypeMoq from 'typemoq';
import { ICatalogService } from '../service/i.catalog.service';
import { CatalogElement } from '../model/catalog.element';

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
  });

  it('Should initialize service when retrieving versions', async(() => {

    mock.setup(x => x.init(
      TypeMoq.It.isValue(['drgs', 'adrgs']),
      TypeMoq.It.isValue(['drgs', 'adrgs', 'partition', 'mdc']),
      TypeMoq.It.isValue('drgs'))
    ).verifiable(TypeMoq.Times.atLeastOnce());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object);
    catalog.getVersions();
    mock.verifyAll();
  }));

  it('Should initialize service when searching', async(() => {

    mock.setup(x => x.init(
      TypeMoq.It.isValue(['drgs', 'adrgs']),
      TypeMoq.It.isValue(['drgs', 'adrgs', 'partition', 'mdc']),
      TypeMoq.It.isValue('drgs'))
    ).verifiable(TypeMoq.Times.atLeastOnce());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object);
    catalog.search('V1.0', 'test').then(results => {
      mock.verifyAll();
    });
  }));

  it('Should get a list of versions', async(() => {

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object);
    catalog.getVersions().then(versions => {
      expect(versions.length).toBe(4);
    });
  }));

  it('Should return a list of results', async(() => {
    const catalogs: CatalogElement[] = [
      { code: "Content 1", text: "Description content 1", url: "/url/to/content1" },
      { code: "Content 2", text: "Description content 2", url: "/url/to/content2" }
    ];

    mock.setup(x => x.search('V1.0', 'Content')).returns(() => Promise.resolve(catalogs));

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object);
    catalog.search('V1.0', 'Content').then(results => {
      expect(results.length).toBe(2);
    });
  }));

  it('Should return a single result by code', async(() => {
    mock.setup(x => x.getByCode('V1.0', 'P20A')).returns(() => Promise.resolve({
      code: "Content 1",
      text: "Description content 1",
      url: "/url/to/content1"
    }));

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object);
    catalog.search('V1.0', 'P20A').then(results => {
      expect(results.length).toBe(1);
    });
  }));

  it('Should throw an error because no code found', async(() => {
    mock.setup(x => x.getByCode('V1.0', 'P23')).throws(new Error());

    const catalog: SwissDrgCatalog = new SwissDrgCatalog(mock.object);
    catalog.search('V1.0', 'P23')
      .then(result => {
        fail("Got unexpected result")
      })
      .catch(reason => {
        //Ok - should throw
      });
  }));
});
