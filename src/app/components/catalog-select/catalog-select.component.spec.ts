import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSelectComponent } from './catalog-select.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpModule, Http } from "@angular/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../../app.module";

describe('CatalogSelectComponent', () => {
  let component: CatalogSelectComponent;
  let fixture: ComponentFixture<CatalogSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        HttpModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        })
      ],
      declarations: [ CatalogSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
