import { RouterModule, Routes } from '@angular/router';

export const purchaseRoutes: Routes = [
  {
    path: 'newposting',
    loadChildren: './+new-posting/new-posting.module#NewPostingModule',
  }
];
export const purchaseRouting = RouterModule.forChild(purchaseRoutes);
