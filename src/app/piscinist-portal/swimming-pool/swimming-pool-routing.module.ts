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
			loadChildren: () => import('../../common-pages/swimming-pool-read-only/information/information.module').then( m => m.InformationPageModule)

		}
		]
	},
	{
		path: 'visits',
		children: [
		{
			path: '',
			loadChildren: () => import('../../common-pages/swimming-pool-read-only/visits/visits.module').then( m => m.VisitsPageModule)
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
	}   ,
	{
		path: 'pictures',
		children: [
		{
			path: '',
			loadChildren: () => import('./pictures/pictures.module').then( m => m.PicturesPageModule)
		}
		]
	}     
	
	]
},
{
	path: '',
	redirectTo: 'tab/information',
	pathMatch: 'full'
}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SwimmingPoolPageRoutingModule {}
