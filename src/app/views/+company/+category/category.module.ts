import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { CategoryComponent } from './category.component';
import { RouterModule, Routes } from '@angular/router';
import { KbDuallistModule } from '../../../components/duallist/duallist.module';

const routes: Routes = [{
  path: '',
  component: CategoryComponent
}];

@NgModule({
  declarations: [CategoryComponent],
  imports: [IboxtoolsModule, RouterModule.forChild(routes), KbDuallistModule],
  exports: [CategoryComponent, RouterModule],
})

export class CategoryModule {
}
