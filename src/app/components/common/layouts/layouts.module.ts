import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap';

import { BasicLayoutComponent } from './basicLayout.component';
import { BlankLayoutComponent } from './blankLayout.component';
import { TopNavigationLayoutComponent } from './topNavigationlayout.component';

import { NavigationComponent } from './../navigation/navigation.component';
import { FooterComponent } from './../footer/footer.component';
import { TopNavbarComponent } from './../topnavbar/topnavbar.component';
import { TopNavigationNavbarComponent } from './../topnavbar/topnavigationnavbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LocalizeRouterModule } from '../../../shared/utils/localize-router/localize-router.module';


@NgModule({
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavigationLayoutComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TranslateModule,
    LocalizeRouterModule
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavigationLayoutComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
  providers: [
    TranslateService
  ]
})

export class LayoutsModule {
}
