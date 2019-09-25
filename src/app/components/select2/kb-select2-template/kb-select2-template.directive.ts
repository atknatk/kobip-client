import { Directive, Host, TemplateRef } from '@angular/core';
import { KbSelect2Component } from '../kb-select2/kb-select2.component';

@Directive({selector: '[kbSelect2Template]'})
export class KbSelect2TemplateDirective<T> {
  constructor(private templateRef: TemplateRef<T>, @Host() host: KbSelect2Component) {
    if (host instanceof KbSelect2Component) {
      host.templateRef = templateRef;
    }
  }
}
