import { NgModule } from '@angular/core';
import { PersonalComponent } from './personal.component';
import { PersonalEditComponent } from './edit/personal-edit.component';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { personalRouting } from './personal.router';
import { PersonalService } from './personal.service';
import { TranslateModule } from '@ngx-translate/core';
import { KbLoadingModule } from '../../components/loading/loading.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KbDuallistModule } from '../../components/duallist/duallist.module';
import { DirectiveModule } from '../../directives/directive.module';
import { KbValidationModule } from '../../components/validation/validation.module';
import { KbSelectModule } from '../../components/select/select.module';
import { KbAuthViewModule } from '../../shared/views/auth/auth-view.module';
import { LocalizeRouterModule } from '../../shared/utils/localize-router/localize-router.module';
import { KbFileCropModule } from '../../components/filecrop/filecrop.module';

@NgModule({
  declarations: [PersonalComponent, PersonalEditComponent],
  imports: [
    CommonModule,
    IboxtoolsModule,
    KbLoadingModule,
    personalRouting,
    TranslateModule,
    ReactiveFormsModule,
    KbDuallistModule,
    DirectiveModule,
    KbValidationModule,
    KbSelectModule,
    KbAuthViewModule,
    LocalizeRouterModule,
    KbFileCropModule
  ],
  exports: [PersonalComponent, PersonalEditComponent],
  providers: [PersonalService]
})

export class PersonalModule {
}
