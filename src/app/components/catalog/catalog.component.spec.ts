import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { RouterTestingModule } from "@angular/router/testing";
import { CatalogSelectComponent } from "../catalog-select/catalog-select.component";
import { SearchComponent } from "../search/search.component";
import { CatalogServiceMock } from "../../service/catalog.service.mock";

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule],
      declarations: [ CatalogComponent, CatalogSelectComponent, SearchComponent ],
      providers: [ {provide: "ICatalogService", useClass: CatalogServiceMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
