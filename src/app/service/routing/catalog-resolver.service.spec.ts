import { CHOPCatalog } from '../../catalog/chop.catalog';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { RouterStub } from '../../router-stub';
import { CatalogServiceMock } from '../catalog.service.mock';
import { NullLoggerService } from '../logging/null.logger.service';
import { CatalogResolver } from './catalog-resolver.service';
import { async, inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import * as TypeMoq from 'typemoq';
import { CatalogVersionService } from '../catalog-version.service';
import { HttpClientModule } from '@angular/common/http';
import { ILoggerService } from '../logging/i.logger.service';

describe('CatalogResolver', () => {
  let versionServiceMock;
  let router;

  function serviceFactory(logger: ILoggerService): CatalogResolver {
    versionServiceMock = TypeMoq.Mock.ofType<CatalogVersionService>();
    router = new RouterStub();
    return new CatalogResolver(router, versionServiceMock.object, logger);
  };


  let routeMock: TypeMoq.IMock<ActivatedRouteSnapshot>;
  let routeParams: { catalog: string, version?: string, language: string };
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [
        { provide: 'ILoggerService', useClass: NullLoggerService },
        {
          provide: CatalogResolver,
          useFactory: serviceFactory,
          deps: ['ILoggerService']
        },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
      ],
      imports: [HttpClientModule],

    });

    routeMock = TypeMoq.Mock.ofType<ActivatedRouteSnapshot>();

  });

  it('should be', inject([CatalogResolver], (service: CatalogResolver) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve display infos when the route is valid',
    async(inject([CatalogResolver], (service: CatalogResolver) => {

      const language = 'de';
      const catalog = 'SwissDRG';
      const version = 'V4.0';
      routeParams = { catalog: catalog, version: version, language: language };

      versionServiceMock.setup(x =>
        x.versionExists(language, catalog, version)
      ).returns(() => true);

      versionServiceMock.setup(x =>
        x.getLanguages(catalog, version)
      ).returns(() => [language]);

      versionServiceMock.setup(x =>
        x.getVersions(language, catalog)
      ).returns(() => [version]);

      versionServiceMock.setup(x =>
        x.getVersions(language, TypeMoq.It.isAnyString())
      ).returns(() => []);

      routeMock.setup(x => x.params).returns(() => routeParams);

      service.resolve(routeMock.object).then(
        catalogDisplayInfos => expect(catalogDisplayInfos).toBeTruthy()
      );
    })));


  it('should redirect to root element when only valid catalog in route',
    async(inject([CatalogResolver], (service: CatalogResolver) => {

      const language = 'de';
      const catalog = 'SwissDRG';
      const version = 'V4.0';
      routeParams = { catalog: catalog, version: version, language: language };

      versionServiceMock.setup(x =>
        x.versionExists(language, catalog, version)
      ).returns(() => false);

      versionServiceMock.setup(x =>
        x.getVersions(language, catalog)
      ).returns(() => [version]);

      versionServiceMock.setup(x =>
        x.getVersions(language, TypeMoq.It.isAnyString())
      ).returns(() => []);

      routeMock.setup(x => x.params).returns(() => routeParams);

      expect(service.resolve(routeMock.object)).toBeNull();

      expect(router.lastNavigation.url).toEqual('de/SwissDRG/V4.0/mdcs/ALL');
      expect(router.lastNavigation.extras).toEqual({ queryParamsHandling: 'merge' });
    })));

  it('should redirect to language when no version exists in catalog',
    async(inject([CatalogResolver], (service: CatalogResolver) => {

      const language = 'de';
      const catalog = 'SwissDRG';
      const version = 'V4.0';

      routeParams = { catalog: catalog, version: version, language: language };

      versionServiceMock.setup(x =>
        x.versionExists(language, catalog)
      ).returns(() => false);

      versionServiceMock.setup(x =>
        x.getVersions(language, TypeMoq.It.isAnyString())
      ).returns(() => []);

      routeMock.setup(x => x.params).returns(() => routeParams);

      expect(service.resolve(routeMock.object)).toBeNull();

      expect(router.lastNavigation.url).toEqual(language);
      expect(router.lastNavigation.extras).toEqual({ queryParamsHandling: 'merge' });
    })));
});
