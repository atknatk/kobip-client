import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KbValidationComponent } from './validation.component';
import { KbErrorMessageComponent } from './error-message/error-message.component';
import { EqualValidatorDirective } from './equal-validator.directive';


@NgModule({
  declarations: [KbValidationComponent, KbErrorMessageComponent, EqualValidatorDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [KbValidationComponent, KbErrorMessageComponent, EqualValidatorDirective],
  entryComponents: [KbErrorMessageComponent]
})

export class KbValidationModule {
}
