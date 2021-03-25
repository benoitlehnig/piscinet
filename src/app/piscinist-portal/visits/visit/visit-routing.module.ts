import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitPage } from './visit.page';



const routes: Routes = [
{
  path: '',
  component: VisitPage,
  children: [
  {
    path: 'general',
    children: [
    {
      path: '',
      loadChildren: () => import('../../../common-pages/visit-read-only/general/general.module').then( m => m.GeneralPageModule)
    }
    ]
  },
  {
    path: 'maintenance',
    children: [
    {
      path: '',
      loadChildren: () => import('../../../common-pages/visit-read-only/maintenance/maintenance.module').then( m => m.MaintenancePageModule)

    }
    ]
  },
  {
    path: 'observation',
    children: [
    {
      path: '',
      loadChildren: () => import('../../../common-pages/visit-read-only/observation/observation.module').then( m => m.ObservationPageModule)
    }
    ]
  },
  {
    path: 'technical',
    children: [
    {
      path: '',
      loadChildren: () => import('../../../common-pages/visit-read-only/technical/technical.module').then( m => m.TechnicalPageModule)
    }
    ]
  },
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full'
  }


  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitPageRoutingModule {}
