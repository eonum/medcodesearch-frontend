import { ActivatedRouteStub, RouterStub } from '../../router-stub';
import { NullLoggerService } from '../../service/logging/null.logger.service';
import { RememberElementService } from '../../service/remember.element.service';
import { RememberElementComponent } from './remember-element.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ng2-bootstrap';

describe('RememberElementComponent', () => {
  let component: RememberElementComponent;
  let fixture: ComponentFixture<RememberElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RememberElementComponent],
      imports: [TranslateModule.forRoot(), TooltipModule.forRoot(), RouterModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: 'ILoggerService', useClass: NullLoggerService },
        RememberElementService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
