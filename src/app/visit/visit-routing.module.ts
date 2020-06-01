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
            loadChildren: '../visit/maintenance/maintenance.module#MaintenancePageModule'
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
      {
        path: 'technical',
        children: [
          {
            path: '',
            loadChildren: '../visit/technical/technical.module#TechnicalPageModule'
          }
        ]
      },
      
     
    ]
  },
  {
    path: 'maintenance',
    loadChildren: () => import('../visit/maintenance/maintenance.module').then( m => m.MaintenancePageModule)
  },
  {
    path: 'technical',
    loadChildren: () => import('../visit/technical/technical.module').then( m => m.TechnicalPageModule)
  },
  {
    path: 'observation',
    loadChildren: () => import('../visit/observation/observation.module').then( m => m.ObservationPageModule)
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
