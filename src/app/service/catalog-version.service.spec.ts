import { TestBed, inject } from '@angular/core/testing';
import { CatalogVersionService } from './catalog-version.service';
import { HttpModule } from '@angular/http';

describe('CatalogVersionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogVersionService],
      imports: [HttpModule],
    });
  });

  it('should ...', inject([CatalogVersionService], (service: CatalogVersionService) => {
    expect(service).toBeTruthy();
  }));
});
