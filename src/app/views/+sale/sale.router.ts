import { RouterModule, Routes } from '@angular/router';

export const saleRoutes: Routes = [
  {
    path: 'hotads',
    loadChildren: './+hot-ads/hot-ads.module#HotAdsModule',
  }
];
export const saleRouting = RouterModule.forChild(saleRoutes);
