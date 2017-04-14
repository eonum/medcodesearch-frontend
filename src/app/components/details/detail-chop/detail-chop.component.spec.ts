import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailChopComponent} from './detail-chop.component';
import {TranslateModule} from '@ngx-translate/core';
import {ConvertCodePipe} from '../../../pipes/convert-code.pipe';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../../router-stub';
import { NullLoggerService } from "../../../service/null.logger.service";

describe('DetailChopComponent', () => {
  let component: DetailChopComponent;
  let fixture: ComponentFixture<DetailChopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailChopComponent, ConvertCodePipe],
      imports: [RouterModule, TranslateModule.forRoot(), TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        {provide: 'ILoggerService', useClass: NullLoggerService}]
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
