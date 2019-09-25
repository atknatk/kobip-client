import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';
import { SelectDropdownComponent } from './select-dropdown.component';
import { TranslateModule } from '@ngx-translate/core';

export * from './option.interface';
export * from './select.component';

@NgModule({
  declarations: [
    SelectComponent,
    SelectDropdownComponent
  ],
  exports: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ]
})
export class KbSelectModule {
}
