import { NgModule } from '@angular/core';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { routing } from './auth.router';
import { LoginModule } from './+login/login.module';
import { ForgotModule } from './+forgot/forgot.module';
import { RegisterModule } from './+register/register.module';
import { KbLoadingModule } from '../../components/loading/loading.module';

const modules = [
  LoginModule,
  ForgotModule,
  RegisterModule,
  IboxtoolsModule,
  routing
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [],
})
export class AuthModule {
}
