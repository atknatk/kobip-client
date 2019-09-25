import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { EmployeeComponent } from './employee.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KbLoadingModule } from '../../../components/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { KbAuthViewModule } from '../../../shared/views/auth/auth-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

const routes: Routes = [{
  path: '',
  component: EmployeeComponent
}];

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    IboxtoolsModule,
    CommonModule,
    KbLoadingModule,
    TranslateModule,
    KbAuthViewModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule,
    RouterModule.forChild(routes)
  ],
  exports: [EmployeeComponent, RouterModule],
})

export class EmployeeModule {
}
