import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { ExpenseComponent } from './expense.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ExpenseComponent
}];


@NgModule({
  declarations: [ExpenseComponent],
  imports: [IboxtoolsModule, RouterModule.forChild(routes)],
  exports: [ExpenseComponent, RouterModule],
})

export class ExpenseModule {
}
