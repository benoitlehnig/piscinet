import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperAdminPage } from './super-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminPage
  },
  {
    path: 'add-account',
    loadChildren: () => import('./add-account/add-account.module').then( m => m.AddAccountPageModule)
  },
  {
    path: 'account/:id',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'account/:id/add-admin',
    loadChildren: () => import('./add-admin/add-admin.module').then( m => m.AddAdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminPageRoutingModule {}
