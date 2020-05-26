import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitPage } from './visit.page';

const routes: Routes = [
  {
    path: '',
    component: VisitPage,
     children: [
      {
        path: 'maintenance',
        children: [
          {
            path: '',
            loadChildren: '../visit/maintenance/maintenance.module#MaintenancePageModule'
          }
        ]
      },
      {
        path: 'technical',
        children: [
          {
            path: '',
            loadChildren: '../visit/technical/technical.module#TechnicalPageModule'
          }
        ]
      },
      {
        path: 'observation',
        children: [
          {
            path: '',
            loadChildren: '../visit/observation/observation.module#ObservationPageModule'
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitPageRoutingModule {}
