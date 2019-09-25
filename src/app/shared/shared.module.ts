import { NgModule } from '@angular/core';
import { ServiceModule } from './services/service.module';

const modules = [
  ServiceModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {
}
