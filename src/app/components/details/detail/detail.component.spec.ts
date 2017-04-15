import { CHOPCatalog } from '../../../catalog/chop.catalog';
import { ICDCatalog } from '../../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../../catalog/swissdrg.catalog';
import { CatalogElement } from '../../../model/catalog.element';
import { ConvertCodePipe } from '../../../pipes/convert-code.pipe';
import { CorrectVersionPipe } from '../../../pipes/correct-version.pipe';
import { ActivatedRouteStub, RouterStub } from '../../../router-stub';
import { CatalogServiceMock } from '../../../service/catalog.service.mock';
import { NullLoggerService } from '../../../service/null.logger.service';
import { RememberElementService } from '../../../service/remember.element.service';
import { SearchFormComponent } from '../../search/search-form/search-form.component';
import { DetailChopComponent } from '../detail-chop/detail-chop.component';
import { DetailIcdComponent } from '../detail-icd/detail-icd.component';
import { DetailSwissDrgComponent } from '../detail-swiss-drg/detail-swiss-drg.component';
import { DetailComponent } from './detail.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule, TooltipModule } from 'ng2-bootstrap';
import * as TypeMoq from 'typemoq';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  let route: ActivatedRouteStub;
  let mock: TypeMoq.IMock<SwissDrgCatalog>;

  /*Test data*/

  const query = 'Some search query';
  const version = 'V4.0';
  const searchResults: CatalogElement[] = [
    {
      code: 'Content 1', text: 'Description content 1', url: '/url/to/content1',
      highlight: { text: ['content'], relevantCodes: [] }, type: 'drg'
    },
    {
      code: 'Content 2', text: 'Description content 2', url: '/url/to/content2',
      highlight: { text: ['2'], relevantCodes: [] }, type: 'drg'
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        ReactiveFormsModule,
      ],
      declarations: [
        DetailComponent,
        SearchFormComponent,
        DetailSwissDrgComponent,
        DetailChopComponent,
        DetailIcdComponent,
        ConvertCodePipe,
        CorrectVersionPipe
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
        { provide: 'ILoggerService', useClass: NullLoggerService },
        RememberElementService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;

    // Set up a catalog mock
    mock = TypeMoq.Mock.ofType<SwissDrgCatalog>();
    mock.setup(x => x.getActiveVersion()).returns(() => version);
    mock.setup(x => x.search(version, query)).returns(() => Promise.resolve(searchResults));

    // Set up the activated route stub
    route = fixture.debugElement.injector.get(ActivatedRoute);
    route.setCatalog(mock.object);
    route.setTestParams({ 'query': query });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
