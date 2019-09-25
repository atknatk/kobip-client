import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal.component';
import { PersonalEditComponent } from './edit/personal-edit.component';

export const personalRoutes: Routes = [
  {
    path: 'info',
    component: PersonalComponent,
  },
  {
    path: 'edit/:id',
    component: PersonalEditComponent,
  }
];
export const personalRouting = RouterModule.forChild(personalRoutes);
