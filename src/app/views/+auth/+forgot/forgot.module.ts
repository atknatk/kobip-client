import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot.component';
import { ForgotRoutingModule } from './forgot-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule {
}
