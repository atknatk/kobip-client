import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { KbTransportTypeComponent } from './transport-type.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [KbTransportTypeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [KbTransportTypeComponent],
})

export class KbTransportTypeModule {
}
