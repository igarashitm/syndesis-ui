/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RestangularModule } from 'ngx-restangular';
import { OAuthModule } from 'angular-oauth2-oidc-hybrid';
import { NotificationModule } from 'patternfly-ng';

import { CollapseModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { ConfigService } from './config.service';
import { UserService } from './common/user.service';
import { NavigationService } from './common/navigation.service';
import { StoreModule } from './store/store.module';

import { TestSupportService } from './store/test-support.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RestangularModule,
        StoreModule,
        ModalModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        OAuthModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        NotificationModule,
      ],
      providers: [
        ConfigService,
        UserService,
        TestSupportService,
        NavigationService,
        MockBackend,
        { provide: RequestOptions, useClass: BaseRequestOptions },
        {
          provide: Http,
          useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, RequestOptions],
        },
      ],
      declarations: [AppComponent],
    });
    TestBed.compileComponents();
  });

  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );

  it(
    `should have as title 'Syndesis'`,
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('Syndesis');
    }),
  );
});
