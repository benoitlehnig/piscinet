import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitsPage } from './visits.page';

const routes: Routes = [
{
	path: '',
	component: VisitsPage
},
{
	path: 'edit-visit',
	loadChildren: () => import('./add-visit/add-visit.module').then( m => m.AddVisitPageModule),
},
{
	path: ':vid',
	loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule),

},
{
  path: 'offlineVisits',
  loadChildren: () => import('./offline-visits/offline-visits.module').then( m => m.OfflineVisitsPageModule),
},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VisitsPageRoutingModule {}
