import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { KbInputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { KbCheckIconComponent } from './icheck-icon.component';


@NgModule({
  declarations: [KbInputComponent, KbCheckIconComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  exports: [KbInputComponent, KbCheckIconComponent]
})

export class KbInputModule {
}
