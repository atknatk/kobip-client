import {NgModule} from '@angular/core';
import {IboxtoolsModule} from '../../../components/common/iboxtools/iboxtools.module';
import { DraftPostingComponent } from './draft-posting.component';


@NgModule({
  declarations: [DraftPostingComponent],
  imports: [ IboxtoolsModule],
  exports: [DraftPostingComponent],
})

export class DraftPostingModule {
}
