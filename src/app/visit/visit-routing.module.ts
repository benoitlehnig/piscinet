import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitPage } from './visit.page';



const routes: Routes = [
  {
    path: 'visit',
    component: VisitPage,
     children: [
     {
        path: 'general',
        children: [
          {
            path: '',
            loadChildren: () => import('./general/general.module').then( m => m.GeneralPageModule)
          }
        ]
      },
      {
        path: 'maintenance',
        children: [
          {
            path: '',
            loadChildren: () => import('./maintenance/maintenance.module').then( m => m.MaintenancePageModule)
          }
        ]
      },
      {
        path: 'observation',
        children: [
          {
            path: '',
            loadChildren:  () => import('./observation/observation.module').then( m => m.ObservationPageModule)
          }
        ]
      },
      {
        path: 'technical',
        children: [
          {
            path: '',
            loadChildren: () => import('./technical/technical.module').then( m => m.TechnicalPageModule)
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
    path: 'general',
    loadChildren: () => import('./general/general.module').then( m => m.GeneralPageModule)
  },
  {
    path: '',
    redirectTo: 'visit/general',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitPageRoutingModule {}
