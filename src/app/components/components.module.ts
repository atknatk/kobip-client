import { NgModule } from '@angular/core';
import { KbConfirmationsModule } from './notification/confirmations/confirmations.module';
import { KbValidationModule } from './validation/validation.module';

const modules = [
  KbConfirmationsModule,
  KbValidationModule
]

@NgModule({
  imports: [...modules],
  exports: [...modules],
})

export class ComponentsModule {
}
