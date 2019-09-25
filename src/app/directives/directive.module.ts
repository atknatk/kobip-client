import { NgModule } from '@angular/core';
import { MaskDirective } from './mask.directive';
import { ContentEditableDirective } from './contenteditable.directive';

const directives = [
  MaskDirective,
  ContentEditableDirective
  ,  // TooltipDirective
];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})

export class DirectiveModule {
}
