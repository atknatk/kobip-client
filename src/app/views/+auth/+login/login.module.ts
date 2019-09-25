import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { KbLoadingModule } from '../../../components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    KbLoadingModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
