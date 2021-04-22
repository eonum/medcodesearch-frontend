import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailKlv1Component } from './detail-klv1.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MobileService } from '../../../service/mobile.service';
import { ActivatedRouteStub, RouterStub } from '../../../router-stub';
import { NullLoggerService } from '../../../service/logging/null.logger.service';

describe('DetailKlv1Component', () => {
  let component: DetailKlv1Component;
  let fixture: ComponentFixture<DetailKlv1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKlv1Component ],
      imports: [RouterModule, TranslateModule.forRoot(), TranslateModule.forRoot()],
      providers: [
        MobileService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: 'ILoggerService', useClass: NullLoggerService }]
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
