import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChopComponent } from './detail-chop.component';

describe('DetailChopComponent', () => {
  let component: DetailChopComponent;
  let fixture: ComponentFixture<DetailChopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
