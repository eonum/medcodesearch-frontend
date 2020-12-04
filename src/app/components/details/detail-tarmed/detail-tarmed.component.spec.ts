import { DetailTarmedComponent } from './detail-tarmed.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('DetailTarmedComponent', () => {
  let component: DetailTarmedComponent;
  let fixture: ComponentFixture<DetailTarmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTarmedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTarmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
