import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSwissDrgComponent } from './detail-swiss-drg.component';

describe('DetailSwissDrgComponent', () => {
  let component: DetailSwissDrgComponent;
  let fixture: ComponentFixture<DetailSwissDrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSwissDrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSwissDrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
