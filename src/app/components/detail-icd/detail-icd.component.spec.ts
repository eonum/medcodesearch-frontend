import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIcdComponent } from './detail-icd.component';

describe('DetailIcdComponent', () => {
  let component: DetailIcdComponent;
  let fixture: ComponentFixture<DetailIcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailIcdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailIcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
