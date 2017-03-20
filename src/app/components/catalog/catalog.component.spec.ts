import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { RouterTestingModule } from "@angular/router/testing";
import { CatalogSelectComponent } from "../catalog-select/catalog-select.component";
import { SearchComponent } from "../search/search.component";
import { CatalogService } from "../../service/catalog.service";
import * as TypeMoq from "typemoq";
import { ICatalogService } from "../../service/i.catalog.service";

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    const mock: TypeMoq.IMock<ICatalogService> = TypeMoq.Mock.ofType<ICatalogService>();

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule],
      declarations: [ CatalogComponent, CatalogSelectComponent, SearchComponent ],
      providers: [ {provide: "ICatalogService", useValue: mock.object} ]
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
