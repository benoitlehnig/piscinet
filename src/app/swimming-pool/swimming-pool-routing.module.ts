import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwimmingPoolPage } from './swimming-pool.page';

const routes: Routes = [
{
	path: 'tab',
	component: SwimmingPoolPage,
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
	{
		path: 'statistics',
		children: [
		{
			path: '',
			loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
		}
		]
	}    
	
	]
},
{
	path: 'information',
	loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
},
{
	path: 'visits',
	loadChildren: () => import('./visits/visits.module').then( m => m.VisitsPageModule)
},
{
	path: '',
	redirectTo: 'tab/information',
	pathMatch: 'full'
},
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
  }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SwimmingPoolPageRoutingModule {}
