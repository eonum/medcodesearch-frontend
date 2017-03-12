import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSelectComponent } from './catalog-select.component';

describe('CatalogSelectComponent', () => {
  let component: CatalogSelectComponent;
  let fixture: ComponentFixture<CatalogSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
