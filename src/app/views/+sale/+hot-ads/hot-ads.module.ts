import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotAdsComponent } from './hot-ads.component';
import { KbLoadingModule } from '../../../components/loading/loading.module';
import { TooltipModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';
import { KbInputModule } from '../../../components/input/input.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { KbSelect2Module } from '../../../components/select2/select2.module';
import { KbFormBuilderModule } from '../../../shared/services/form-builder/form-builder.module';


const routes: Routes = [
  {
    path: '',
    component: HotAdsComponent,
  }
];


@NgModule({
  declarations: [HotAdsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KbInputModule,
    IboxtoolsModule,
    RouterModule.forChild(routes),
    KbLoadingModule,
    TooltipModule.forRoot(),
    TranslateModule,
    MomentModule,
    NgxPaginationModule,
    KbSelect2Module,
    KbFormBuilderModule
  ],
  exports: [HotAdsComponent],
})

export class HotAdsModule {
}
