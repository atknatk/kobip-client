import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { KbInputModule } from '../../../components/input/input.module';
import { KbValidationModule } from '../../../components/validation/validation.module';
import { TranslateModule } from '@ngx-translate/core';
import { KbLoadingModule } from '../../../components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    KbInputModule,
    KbValidationModule,
    TranslateModule,
    KbLoadingModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {
}
