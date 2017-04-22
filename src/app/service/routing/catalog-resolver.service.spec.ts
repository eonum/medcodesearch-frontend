import {CHOPCatalog} from '../../catalog/chop.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {RouterStub} from '../../router-stub';
import {CatalogServiceMock} from '../catalog.service.mock';
import {NullLoggerService} from '../logging/null.logger.service';
import {CatalogResolver} from './catalog-resolver.service';
import {async, inject, TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import * as TypeMoq from 'typemoq';

describe('CatalogResolver', () => {

  let routeMock: TypeMoq.IMock<ActivatedRouteSnapshot>;
  let routeParams: { catalog: string, version?: string, language: string };
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [CatalogResolver, {provide: Router, useClass: RouterStub},
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        {provide: 'ICatalogService', useClass: CatalogServiceMock},
        {provide: 'ILoggerService', useClass: NullLoggerService}]
    });

    routeMock = TypeMoq.Mock.ofType<ActivatedRouteSnapshot>();

  });

  it('should be', inject([CatalogResolver], (service: CatalogResolver) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve the route',
    async(inject([CatalogResolver], (service: CatalogResolver) => {

      routeParams = {
        catalog: 'SwissDRG',
        version: 'V4.0',
        language: 'de'
      };
      routeMock.setup(x => x.params).returns(() => routeParams);

      service.resolve(routeMock.object).then(
        catalogDisplayInfos => expect(catalogDisplayInfos).toBeTruthy()
      );
    })));

  // TODO write test
});
