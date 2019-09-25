import { NgModule } from '@angular/core';
import { PersonalModule } from './+personal/personal.module';
import { PurchaseModule } from './+purchase/purchase.module';
import { CompanyModule } from './+company/company.module';
import { AuthModule } from './+auth/auth.module';
import { ErrorModule } from './+error/error.module';
import { SaleModule } from './+sale/sale.module';

@NgModule({
  declarations: [],
  imports: [
    CompanyModule,
    PersonalModule,
    PurchaseModule,
    SaleModule,
    ErrorModule,
    AuthModule],
  exports: [],
})

export class ViewsModule {
}
