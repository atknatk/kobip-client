import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { KbAuthViewComponent } from './auth-view.component';
import { KbAuthViewEditComponent } from './auth-view-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [KbAuthViewComponent, KbAuthViewEditComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [KbAuthViewComponent, KbAuthViewEditComponent],
})

export class KbAuthViewModule {
}
