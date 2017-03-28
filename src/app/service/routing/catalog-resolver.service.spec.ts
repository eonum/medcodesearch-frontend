import { TestBed, inject } from '@angular/core/testing';

import { CatalogResolver } from './catalog-resolver.service';
import {RouterStub} from '../../router-stub';
import {Router} from '@angular/router';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {CatalogServiceMock} from '../catalog.service.mock';

describe('CatalogResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogResolver,{ provide: Router, useClass: RouterStub },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        {provide: 'ICatalogService', useClass: CatalogServiceMock},]
    });
  });

  it('should ...', inject([CatalogResolver], (service: CatalogResolver) => {
    expect(service).toBeTruthy();
  }));


});
