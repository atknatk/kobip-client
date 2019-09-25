import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { CompletedPostingComponent } from './completed-posting.component';


@NgModule({
  declarations: [CompletedPostingComponent],
  imports: [IboxtoolsModule],
  exports: [CompletedPostingComponent],
})

export class CompletedPostingModule {
}
