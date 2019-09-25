import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { GeneralComponent } from './general.component';
import { TranslateModule } from '@ngx-translate/core';
import { KbInputModule } from '../../../components/input/input.module';
import { GeneralEditComponent } from './edit/general-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KbLoadingModule } from '../../../components/loading/loading.module';
import { GeneralService } from './general.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../../../directives/directive.module';
import { KbValidationModule } from '../../../components/validation/validation.module';
import { KbSelectModule } from '../../../components/select/select.module';
import { KbDuallistModule } from '../../../components/duallist/duallist.module';
import { LocalizeRouterModule } from '../../../shared/utils/localize-router/localize-router.module';
import { KbFileCropModule } from '../../../components/filecrop/filecrop.module';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
  },
  {
    path: 'edit/:id',
    component: GeneralEditComponent,
  }
];

@NgModule({
  declarations: [
    GeneralComponent,
    GeneralEditComponent
  ],
  imports: [
    CommonModule,
    IboxtoolsModule,
    TranslateModule,
    KbInputModule,
    KbLoadingModule,
    KbValidationModule,
    ReactiveFormsModule,
    DirectiveModule,
    KbSelectModule,
    KbDuallistModule,
    RouterModule.forChild(routes),
    LocalizeRouterModule,
    KbFileCropModule
  ],
  exports: [
    GeneralComponent,
    GeneralEditComponent,
    RouterModule
  ],
  providers: [
    GeneralService
  ]
})

export class GeneralModule {
}
