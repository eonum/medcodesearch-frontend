import { TestBed, inject } from '@angular/core/testing';

import { CatalogResolver } from './catalog-resolver.service';

describe('CatalogResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogResolver]
    });
  });

  it('should ...', inject([CatalogResolver], (service: CatalogResolver) => {
    expect(service).toBeTruthy();
  }));
});
