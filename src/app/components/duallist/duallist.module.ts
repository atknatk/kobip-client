import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KbDuallistComponent } from './duallist.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { KbDuallistServerSideComponent } from './duallist-category.component';
import { KbLoadingModule } from '../loading/loading.module';
import { KbDuallistCategoryEmployeeComponent } from './duallist-category-employe.component';


@NgModule({
  declarations: [
    KbDuallistComponent,
    KbDuallistServerSideComponent,
    KbDuallistCategoryEmployeeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    KbLoadingModule
  ],
  exports: [
    KbDuallistComponent,
    KbDuallistServerSideComponent,
    KbDuallistCategoryEmployeeComponent
  ]
})

export class KbDuallistModule {
}
