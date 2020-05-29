import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitPage } from './visit.page';

const routes: Routes = [
  {
    path: 'visit',
    component: VisitPage,
     children: [
      {
        path: 'maintenance',
        children: [
          {
            path: '',
            loadChildren: './maintenance/maintenance.module#MaintenancePageModule'
          }
        ]
      },
      {
        path: 'observation',
        children: [
          {
            path: '',
            loadChildren: './observation/observation.module#ObservationPageModule'
          }
        ]
      },
      {
        path: 'technical',
        children: [
          {
            path: '',
            loadChildren: './technical/technical.module#TechnicalPageModule'
          }
        ]
      },
      
     
    ]
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then( m => m.MaintenancePageModule)
  },
  {
    path: 'technical',
    loadChildren: () => import('./technical/technical.module').then( m => m.TechnicalPageModule)
  },
  {
    path: 'observation',
    loadChildren: () => import('./observation/observation.module').then( m => m.ObservationPageModule)
  },
  {
    path: '',
    redirectTo: 'visit/maintenance',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitPageRoutingModule {}
