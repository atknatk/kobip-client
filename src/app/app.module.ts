import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { LayoutsModule } from './components/common/layouts/layouts.module';
import { ViewsModule } from './views/views.module';
import { TranslateLoader, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { KbSimpleNotificationsModule } from './components/notification/simple/simple-notifications.module';
import { KbLoadingModule } from './components/loading/loading.module';
import { ANIMATION_TYPES } from './components/loading/loading-animation-type';
import { DirectiveModule } from './directives/directive.module';
import { KbEnumService } from './shared/services/enum/enum.service';
import { AppRoutingModule } from './app-routing.module';
import * as moment from 'moment';
import { isDebugMode, KbLoggerLevel, KbLoggerService } from './shared/services/log/logger.service';
import { KbLoggerModule } from './shared/services/log/logger.module';
import { SignalrService } from './shared/services/signalr/signalr.service';
import { SingletonService } from './shared/services/singleton.service';

/*
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/kobip-', '.json');
}
*/

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/kobip-', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    /*ViewsModule,*/
    LayoutsModule,
    AppRoutingModule,
    DirectiveModule,
    KbSimpleNotificationsModule.forRoot(),
    KbLoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      primaryColour: '#fed700',
      secondaryColour: '#5fba7d',
      tertiaryColour: '#4484c1',
      backdropBackgroundColour: 'rgba(0, 0, 0, 0.4)'
    }),
    KbLoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: isDebugMode ? KbLoggerLevel.DEBUG : KbLoggerLevel.ERROR,
      serverLogLevel: KbLoggerLevel.ERROR
    }),
    ComponentsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: TranslatePipe, useValue: TranslatePipe, multi: true},
    TranslateService,
    KbEnumService,
    SingletonService,
    SignalrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService, logger: KbLoggerService,
              signalr: SignalrService) {
    const lang = translate.getBrowserLang();
    translate.setDefaultLang('tr');
    translate.use('tr');
    moment.locale('tr');
    logger.debug('AppModule', 'App is starting');
    // this.clearSelection();
    signalr.connectChat();
  }

  // clearSelection() {
  //   if (document['selection'] && document['selection'].empty) {
  //     document['selection'].empty();
  //   } else if (window.getSelection) {
  //     const sel = window.getSelection();
  //     sel.removeAllRanges();
  //   }
  // }
}

