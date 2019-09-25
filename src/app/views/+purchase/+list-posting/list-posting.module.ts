import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { ListPostingComponent } from './list-posting.component';


@NgModule({
  declarations: [ListPostingComponent],
  imports: [IboxtoolsModule],
  exports: [ListPostingComponent],
})

export class ListPostingModule {
}
