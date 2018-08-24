import { TestBed, inject } from '@angular/core/testing';
import { CatalogVersionService } from './catalog-version.service';
import { HttpClientModule } from '@angular/common/http';

describe('CatalogVersionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogVersionService],
      imports: [HttpClientModule],
    });
  });

  it('should ...', inject([CatalogVersionService], (service: CatalogVersionService) => {
    expect(service).toBeTruthy();
  }));
});
