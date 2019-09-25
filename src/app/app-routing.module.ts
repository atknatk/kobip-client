import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/common/layouts/blankLayout.component';
import { BasicLayoutComponent } from './components/common/layouts/basicLayout.component';
import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterSettings } from './shared/utils/localize-router/localize-router.config';
import { LocalizeRouterHttpLoader } from './shared/utils/localize-router/http-loader';
import { LocalizeRouterModule } from './shared/utils/localize-router/localize-router.module';
import { LocalizeParser } from './shared/utils/localize-router/localize-router.parser';
import { LocalizeRouterService } from './shared/utils/localize-router/localize-router.service';

// import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';

export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

export const routes: Routes = [


  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {
    path: 'company',
    component: BasicLayoutComponent,
    loadChildren: 'app/views/+company/company.module#CompanyModule'
  },
  {
    path: 'personal',
    component: BasicLayoutComponent,
    loadChildren: 'app/views/+personal/personal.module#PersonalModule'
  },
  {
    path: 'purchase',
    component: BasicLayoutComponent,
    loadChildren: 'app/views/+purchase/purchase.module#PurchaseModule'
  },
  {
    path: 'sale',
    component: BasicLayoutComponent,
    loadChildren: 'app/views/+sale/sale.module#SaleModule'
  },
  {path: 'error', component: BlankLayoutComponent, loadChildren: 'app/views/+error/error.module#ErrorModule'},
  {path: 'auth', component: BlankLayoutComponent, loadChildren: 'app/views/+auth/auth.module#AuthModule'},
  {path: '**', redirectTo: '/error/404'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: HttpLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    })
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AppRoutingModule {

}
