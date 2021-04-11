import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKlv1Component } from './detail-klv1.component';

describe('DetailKlv1Component', () => {
  let component: DetailKlv1Component;
  let fixture: ComponentFixture<DetailKlv1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKlv1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKlv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
