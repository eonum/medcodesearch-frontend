import { FavoriteElementServiceMock } from '../../service/favorites/favorite.service.mock';
import { ActivatedRouteStub, RouterStub } from '../../router-stub';
import { NullLoggerService } from '../../service/logging/null.logger.service';
import { FavoriteElementComponent } from './favorite-element.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ng2-bootstrap';

describe('FavoriteElementComponent', () => {
  let component: FavoriteElementComponent;
  let fixture: ComponentFixture<FavoriteElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteElementComponent],
      imports: [TranslateModule.forRoot(), TooltipModule.forRoot(), RouterModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: 'ILoggerService', useClass: NullLoggerService },
        { provide: 'IFavoriteService', useClass: FavoriteElementServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
