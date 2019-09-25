import { NgModule } from '@angular/core';
import { CategoryModule } from './+category/category.module';
import { EmployeeModule } from './+employee/employee.module';
import { ExpenseModule } from './+expense/expense.module';
import { GeneralModule } from './+general/general.module';
import { PartnerModule } from './+partner/partner.module';
import { CompanyRoutingModule } from './company-routing.module';

const modules = [
  CompanyRoutingModule,
  CategoryModule,
  EmployeeModule,
  ExpenseModule,
  GeneralModule,
  PartnerModule,
];

@NgModule({
  imports: [...modules]
})

export class CompanyModule {
}
