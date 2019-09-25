import { NgModule } from '@angular/core';
import { saleRouting } from './sale.router';
import { HotAdsModule } from './+hot-ads/hot-ads.module';

const modules = [
  HotAdsModule,
  saleRouting
];

@NgModule({
  imports: [...modules],
})

export class SaleModule {
}
