import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { KbFileCropComponent } from './filecrop.component';
import { KbLoadingModule } from '../loading/loading.module';


@NgModule({
  declarations: [KbFileCropComponent],
  imports: [
    CommonModule,
    TranslateModule,
    KbLoadingModule
  ],
  exports: [KbFileCropComponent]
})

export class KbFileCropModule {
}
