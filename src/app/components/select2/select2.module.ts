import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KbSelect2Component } from './kb-select2/kb-select2.component';
import { KbSelect2ResultsComponent } from './kb-select2-results/kb-select2-results.component';
import { CommonModule } from '@angular/common';
import { KbSelect2TemplateDirective } from './kb-select2-template/kb-select2-template.directive';

@NgModule({
  declarations: [
    KbSelect2Component,
    KbSelect2ResultsComponent,
    KbSelect2TemplateDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    KbSelect2Component,
    KbSelect2ResultsComponent,
    KbSelect2TemplateDirective
  ]
})
export class KbSelect2Module {
}
