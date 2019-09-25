import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from '../../shared/utils/localize-router/localize-router.module';
import { NgModule } from '@angular/core';

const companyRoutes: Routes = [
  {
    path: 'category',
    loadChildren: './+category/category.module#CategoryModule',
  },
  {
    path: 'employee',
    loadChildren: './+employee/employee.module#EmployeeModule',
  },
  {
    path: 'expense',
    loadChildren: './+expense/expense.module#ExpenseModule',
    data: {
      i18n: 'app'
    },
  },
  {
    path: 'general',
    loadChildren: './+general/general.module#GeneralModule'
  },
  {
    path: 'partner',
    loadChildren: './+partner/partner.module#PartnerModule',
    data: {
      i18n: 'app'
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(companyRoutes),
    LocalizeRouterModule.forChild(companyRoutes)
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class CompanyRoutingModule {
}
