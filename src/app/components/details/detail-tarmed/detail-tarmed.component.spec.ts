import { DetailTarmedComponent } from './detail-tarmed.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MobileService } from '../../../service/mobile.service';
import { ActivatedRouteStub, RouterStub } from '../../../router-stub';
import { NullLoggerService } from '../../../service/logging/null.logger.service';
import { ConvertCodePipe } from '../../../pipes/convert-code.pipe';

describe('DetailTarmedComponent', () => {
  let component: DetailTarmedComponent;
  let fixture: ComponentFixture<DetailTarmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTarmedComponent, ConvertCodePipe],
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
    fixture = TestBed.createComponent(DetailTarmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
