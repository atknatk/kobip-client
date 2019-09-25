import { BsDropdownModule } from 'ngx-bootstrap';
import { IboxtoolsComponent } from './iboxtools.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [IboxtoolsComponent],
  imports: [BsDropdownModule.forRoot()],
  exports: [IboxtoolsComponent],
})

export class IboxtoolsModule {
}
