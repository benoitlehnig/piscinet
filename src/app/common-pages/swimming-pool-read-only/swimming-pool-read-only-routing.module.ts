import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwimmingPoolReadOnlyPage } from './swimming-pool-read-only.page';

const routes: Routes = [
  {
    path: '',
    component: SwimmingPoolReadOnlyPage,
    children: [
  {
    path: 'information',
    children: [
    {
      path: '',
      loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
    }
    ]
  },
  {
    path: 'visits',
    children: [
    {
      path: '',
      loadChildren: () => import('./visits/visits.module').then( m => m.VisitsPageModule)
    }
    ]
  },   
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwimmingPoolReadOnlyPageRoutingModule {}
