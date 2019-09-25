import { KbFormBuilder } from './form-builder.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const services = [
  KbFormBuilder
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [...services],
})
export class KbFormBuilderModule {
}
