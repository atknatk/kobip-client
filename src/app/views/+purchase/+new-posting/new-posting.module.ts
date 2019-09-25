import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { NewPostingComponent } from './new-posting.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../../../directives/directive.module';
import { KbFormBuilderModule } from '../../../shared/services/form-builder/form-builder.module';
import { NewPostingGeneralComponent } from './new-posting-general/new-posting-general.component';
import { NewPostingDeliveryComponent } from './new-posting-delivery/new-posting-delivery.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NewPostingLanguageComponent } from './new-posting-language/new-posting-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { KbInputModule } from '../../../components/input/input.module';
import { NewPostingBrandComponent } from './new-posting-brand/new-posting-brand.component';
import { NewPostingDescriptionComponent } from './new-posting-description/new-posting-description.component';
import { KbTransportTypeModule } from '../../../shared/views/transport-type/transport-type.module';
import { NewPostingFileuploadComponent } from './new-posting-fileupload/new-posting-fileupload.component';
import { NewPostingAmountComponent } from './new-posting-amount/new-posting-amount.component';
import { KbDuallistModule } from '../../../components/duallist/duallist.module';
import { FileUploadService } from '../../../shared/services/fileupload/file-upload.service';


const routes: Routes = [
  {
    path: '',
    component: NewPostingComponent,
  }
];

const components = [
  NewPostingComponent,
  NewPostingGeneralComponent,
  NewPostingDeliveryComponent,
  NewPostingLanguageComponent,
  NewPostingBrandComponent,
  NewPostingDescriptionComponent,
  NewPostingFileuploadComponent,
  NewPostingAmountComponent
];


@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IboxtoolsModule,
    RouterModule.forChild(routes),
    DirectiveModule,
    KbFormBuilderModule,
    BsDropdownModule.forRoot(),
    TranslateModule,
    KbInputModule,
    KbTransportTypeModule,
    KbDuallistModule
  ],
  exports: [...components],
  providers: [FileUploadService]
})

export class NewPostingModule {
}
