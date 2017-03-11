import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { TranslateService, TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory } from "./app.module";
import {SearchComponent} from "./components/search/search.component";
import {LanguageComponent} from "./components/language/language.component";
import {CatalogueComponent} from "./components/catalogue/catalogue.component";
import { HttpModule, Http } from "@angular/http";

describe('AppComponent', () => {
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
      declarations: [
        AppComponent,
        SearchComponent,
        CatalogueComponent,
        LanguageComponent,
        SearchComponent
      ],
      providers: [  ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('medcodelogic');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('medcodelogic');
  }));
});
