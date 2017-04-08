import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DetailIcdComponent } from './detail-icd.component';
import { ConvertCodePipe } from "../../../pipes/convert-code.pipe";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { ActivatedRouteStub, RouterStub } from "../../../router-stub";

describe('DetailIcdComponent', () => {
  let component: DetailIcdComponent;
  let fixture: ComponentFixture<DetailIcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailIcdComponent, ConvertCodePipe],
      imports: [RouterModule, TranslateModule.forRoot(), TranslateModule.forRoot()],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }]
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
