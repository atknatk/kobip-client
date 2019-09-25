import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { KbLoggerService, LoggerConfig } from './logger.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class KbLoggerModule {
  static forRoot(config: LoggerConfig | null | undefined): ModuleWithProviders {
    return {
      ngModule: KbLoggerModule,
      providers: [
        {provide: LoggerConfig, useValue: config || {}},
        KbLoggerService,
      ]
    };
  }
}
