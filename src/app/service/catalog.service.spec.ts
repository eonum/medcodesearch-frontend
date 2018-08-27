import { Highlight } from '../model/Highlight';
import { CatalogElement } from '../model/catalog.element';
import { catalogConfigurations } from '../catalog/catalog.configuration';
import { NullLoggerService } from './logging/null.logger.service';
import { CatalogService } from './catalog.service';
import { inject, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CatalogService', () => {

  let catalogService: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CatalogService,
        { provide: 'ILoggerService', useClass: NullLoggerService }
      ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    });
    catalogService = TestBed.get(CatalogService);
  });

  beforeEach(inject([TranslateService, CatalogService], (translate: TranslateService, service: CatalogService) => {
    translate.use('de');
    catalogService = service;
    catalogService.init(catalogConfigurations['SwissDRG']);
  }));

  it('Should create', () => {
    expect(catalogService).toBeDefined();
  });

  it('Should return current locale', () => {
    expect(catalogService.getLocale()).toBe('de');
  });

  it('Should return available langs', () => {
    const langs = catalogService.getLangs();
    expect(langs).toEqual(['de']);
  });

  it('Should return version list', () => {
    const version = ['V1.0', 'V2.0'];
    const spy = spyOn(catalogService, 'getVersions');
    spy.and.callFake(() => {
      return new Promise((resolve, reject) => {
        resolve(version);
      })
    });

    catalogService.getVersions('de').then((result: string[]) => {
      expect(result.length).toBe(2);
      expect(result[0]).toBe('V1.0');
      expect(result[1]).toBe('V2.0');
    });

  });

  it('Should return element and assign type, name and url', () => {
    const elementToReturn: CatalogElement = new CatalogElement();
    elementToReturn.code = 'A_12';
    elementToReturn.text = 'Description of the element';
    elementToReturn.highlight = new Highlight();
    elementToReturn.highlight.text = ['Description of the <pre>element</pre>'];

    catalogService.getByCode('V1.0', 'drgs', 'A_12', 'de').then((returned: CatalogElement) => {
      console.log('returned', returned)
      expect(returned).toBeDefined();
      expect(returned.code).toBe('A_12');
      expect(returned.name).toBe('A12');
      expect(returned.url).toBe('/de/drgs/V1.0/A_12');
      expect(returned.type).toBe('drgs');
    });

  });

  it('Should throw error when service request fails', () => {
    catalogService.getByCode('V1.0', 'drgs', 'A_12', 'de').then((result: CatalogElement) => {
      fail('Got unexpected result');
    })
      .catch((error: Error) => {
        expect(error).toBeDefined();
      });
  });

  it('Should append query when sending analytics', () => {
    const elementToReturn: CatalogElement = new CatalogElement();
    elementToReturn.code = 'A12';
    elementToReturn.text = 'Description of the element';
    elementToReturn.highlight = new Highlight();
    elementToReturn.highlight.text = ['Description of the <pre>element</pre>'];

    catalogService.sendAnalytics('V1.0', 'drgs', 'A_12', 'magen');
  });

  it('Should return search results and assign types', () => {
    const elementsToReturn = [
      { code: 'A12', text: 'description 1', url: '/de/drgs/V1.0/A_12' },
      { code: 'A13', text: 'description 2', url: '/de/drgs/V1.0/A_13' },
    ];

    catalogService.search('V1.0', 'magen').then((results: CatalogElement[]) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(2);
      expect(results[0].type).toBe('drgs');
      expect(results[0].code).toBe('A12');
      expect(results[1].type).toBe('drgs');
      expect(results[1].code).toBe('A13');
    });
  });

  it('Should return empty search result on error', () => {
    catalogService.search('V1.0', 'magen').then((results: CatalogElement[]) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(0);
    });
  });
});
