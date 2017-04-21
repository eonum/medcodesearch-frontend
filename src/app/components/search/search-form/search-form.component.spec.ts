import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../../router-stub';
import { ICDCatalog } from '../../../catalog/icd.catalog';
import { CHOPCatalog } from '../../../catalog/chop.catalog';
import { SwissDrgCatalog } from '../../../catalog/swissdrg.catalog';
import { CatalogServiceMock } from '../../../service/catalog.service.mock';
import { ICatalogService } from '../../../service/i.catalog.service';
import { Catalog } from '../../../catalog/catalog';
import { By } from '@angular/platform-browser';
import { ModalModule } from 'ng2-bootstrap';


describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let catalogService: ICatalogService;
  let catalog: Catalog;
  let query: string;
  let buttons: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
      ],
      declarations: [SearchFormComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;

    catalogService = fixture.debugElement.injector.get('ICatalogService');
    buttons = fixture.debugElement.queryAll(By.css('button'));

    catalog = new SwissDrgCatalog(catalogService);
    component.catalog = catalog;
    component.query = 'Search query';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the catalog names', () => {
    console.log(buttons[0]);
    console.log('Buttons')
  });
});
