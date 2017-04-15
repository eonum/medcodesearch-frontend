import { TestBed, inject, async } from '@angular/core/testing';

import { CatalogResolver } from './catalog-resolver.service';
import { RouterStub, ActivatedRouteStub } from '../../router-stub';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { CatalogServiceMock } from '../catalog.service.mock';
import * as TypeMoq from "typemoq";
import { NullLoggerService } from "../null.logger.service";

describe('CatalogResolver', () => {

  let routeMock: TypeMoq.IMock<ActivatedRouteSnapshot>
  let routeParams: { catalog: string, version?: string, language: string };
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [CatalogResolver, { provide: Router, useClass: RouterStub },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
        { provide: 'ILoggerService', useClass: NullLoggerService }]
    });

    routeMock = TypeMoq.Mock.ofType<ActivatedRouteSnapshot>();

  });

  it('should be', inject([CatalogResolver], (service: CatalogResolver) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve the route to the SwissDrgCatalog',
    async(inject([CatalogResolver], (service: CatalogResolver) => {

      routeParams = {
        catalog: 'swissdrg',
        version: 'V4.0',
        language: 'de'
      }
      routeMock.setup(x => x.params).returns(() => routeParams);

      service.resolve(routeMock.object).then(
        catalog => expect(catalog.getDomain()).toBe('swissdrg')
      )

    })));




});
