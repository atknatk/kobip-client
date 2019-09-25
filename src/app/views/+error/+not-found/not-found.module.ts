import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [{
  path: '',
  component: NotFoundComponent
}];


@NgModule({
  declarations: [NotFoundComponent],
  imports: [IboxtoolsModule, RouterModule.forChild(routes)],
  exports: [NotFoundComponent, RouterModule],
})

export class NotFoundModule {
}
