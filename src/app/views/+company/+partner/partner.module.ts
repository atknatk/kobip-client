import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { PartnerComponent } from './partner.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { KbLoadingModule } from '../../../components/loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent
  }
];


@NgModule({
  declarations: [PartnerComponent],
  imports: [
    CommonModule,
    KbLoadingModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    IboxtoolsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [PartnerComponent, RouterModule],
})

export class PartnerModule {
}
