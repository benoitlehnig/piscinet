import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVisitPage } from './add-visit.page';

const routes: Routes = [
{
  path: 'addVisit',
  component: AddVisitPage,
  children: [
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
    path: 'technique',
    children: [
    {
      path: '',
      loadChildren: () => import('./technique/technique.module').then( m => m.TechniquePageModule)
    }
    ]
  },
  {
    path: 'observation',
    children: [
    {
      path: '',
      loadChildren: () => import('./observation/observation.module').then( m => m.ObservationPageModule)
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
  path: 'technique',
  loadChildren: () => import('./technique/technique.module').then( m => m.TechniquePageModule)
},
{
  path: 'observation',
  loadChildren: () => import('./observation/observation.module').then( m => m.ObservationPageModule)
},
{
  path: '',
  redirectTo: 'addVisit/maintenance',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVisitPageRoutingModule {}
