import { Highlight } from '../model/Highlight';
import { CatalogElement } from '../model/catalog.element';
import { catalogConfigurations } from '../catalog/catalog.configuration';
import { ICatalogService } from './i.catalog.service';
import { NullLoggerService } from './logging/null.logger.service';
import { CatalogService } from './catalog.service';
import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as TypeMoq from 'typemoq';

describe('CatalogService', () => {

  let catalogService: ICatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CatalogService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: 'ILoggerService', useClass: NullLoggerService }
      ],
      imports: [
        HttpModule,
        TranslateModule.forRoot()
      ]
    });
  });

  beforeEach(inject([TranslateService, CatalogService], (translate: TranslateService, service: CatalogService) => {
    translate.use('de');
    catalogService = service;
    catalogService.init(catalogConfigurations['SwissDRG']);
  }));

  it('Should create', inject([MockBackend], (mockBackend: MockBackend) => {
    expect(catalogService).toBeDefined();
  }));

  it('Should return current locale', inject([MockBackend], (mockBackend: MockBackend) => {
    expect(catalogService.getLocale()).toBe('de');
  }));

  it('Should return available langs', inject([MockBackend], (mockBackend: MockBackend) => {
    const langs = catalogService.getLangs();
    expect(langs).toEqual(['de']);
  }));

  it('Should return version list', inject([MockBackend], (mockBackend: MockBackend) => {
    const version = ['V1.0', 'V2.0'];

    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe('https://search.eonum.ch/de/drgs/versions');

      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(version)
      })));
    });

    catalogService.getVersions('de').then((result: string[]) => {
      expect(result.length).toBe(2);
      expect(result[0]).toBe('V1.0');
      expect(result[1]).toBe('V2.0');
    });
  }));

  it('Should return element and assign type, name and url', inject([MockBackend], (mockBackend: MockBackend) => {
    const elementToReturn: CatalogElement = new CatalogElement();
    elementToReturn.code = 'A12';
    elementToReturn.text = 'Description of the element';
    elementToReturn.highlight = new Highlight();
    elementToReturn.highlight.text = ['Description of the <pre>element</pre>'];

    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe('https://search.eonum.ch/de/drgs/V1.0/A_12?show_detail=1');

      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(elementToReturn)
      })));
    });

    catalogService.getByCode('V1.0', 'drgs', 'A_12', 'de').then((returned: CatalogElement) => {
      expect(returned).toBeDefined;
      expect(returned.code).toBe('A_12');
      expect(returned.name).toBe('A12');
      expect(returned.url).toBe('/de/drgs/V1.0/A_12');
      expect(returned.type).toBe('drgs');
    });
  }));

  it('Should throw error when service request fails', inject([MockBackend], (mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe('https://search.eonum.ch/de/drgs/V1.0/A_12?show_detail=1');

      connection.mockRespond(new Response(new ResponseOptions({
        status: 404,
        statusText: 'Not found'
      })));
    });

    catalogService.getByCode('V1.0', 'drgs', 'A_12', 'de').then((result: CatalogElement) => {
      fail('Got unexpected result');
    })
      .catch((error: Error) => {
        expect(error).toBeDefined();
      });
  }));

  it('Should append query when sending analytics', inject([MockBackend], (mockBackend: MockBackend) => {
    const elementToReturn: CatalogElement = new CatalogElement();
    elementToReturn.code = 'A12';
    elementToReturn.text = 'Description of the element';
    elementToReturn.highlight = new Highlight();
    elementToReturn.highlight.text = ['Description of the <pre>element</pre>'];

    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe('https://search.eonum.ch/de/drgs/V1.0/A_12?show_detail=1&query=magen');

      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(elementToReturn)
      })));
    });

    catalogService.sendAnalytics('V1.0', 'drgs', 'A_12', 'magen');
  }));

  it('Should return search results and assign types', inject([MockBackend], (mockBackend: MockBackend) => {
    const elementsToReturn = [
      { code: 'A12', text: 'description 1', url: '/de/drgs/V1.0/A_12' },
      { code: 'A13', text: 'description 2', url: '/de/drgs/V1.0/A_13' },
    ];

    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe('https://search.eonum.ch/de/drgs/V1.0/search?highlight=1&search=magen');

      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(elementsToReturn)
      })));
    });

    catalogService.search('V1.0', 'magen').then((results: CatalogElement[]) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(2);
      expect(results[0].type).toBe('drgs');
      expect(results[0].code).toBe('A12');
      expect(results[1].type).toBe('drgs');
      expect(results[1].code).toBe('A13');
    });
  }));

  it('Should return empty search result on error', inject([MockBackend], (mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe('https://search.eonum.ch/de/drgs/V1.0/search?highlight=1&search=magen');

      connection.mockRespond(new Response(new ResponseOptions({
        status: 404,
        statusText: 'Not found'
      })));
    });

    catalogService.search('V1.0', 'magen').then((results: CatalogElement[]) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(0);
    });
  }));
});
