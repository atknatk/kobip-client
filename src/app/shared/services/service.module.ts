import { NgModule } from '@angular/core';
import { KbStorageService } from './storage/storage.service';
import { KbHttpService } from './http/http.service';
import { KbTokenService } from './auth/token.service';
import { KbNotificationService } from './notification/notification.service';
import { KbHashId } from './hashids/hashids.service';
import { JWTInterceptor } from './http/jwt-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KbFixDataService } from './fixdata/fix-data.service';

const services = [
  KbHttpService,
  KbTokenService,
  KbStorageService,
  KbNotificationService,
  KbHashId,
  KbFixDataService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JWTInterceptor,
    multi: true,
  },
  // KbFormBuilder
];

@NgModule({
  providers: [...services],
})
export class ServiceModule {
}
