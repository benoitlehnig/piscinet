import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPoolsPage } from './my-pools.page';

const routes: Routes = [
{
	path: 'tab',
	component: MyPoolsPage,
	children: [
	{
		path: 'information',
		children: [
		{
			path: '',
			loadChildren: () => import('../../swimming-pool/information/information.module').then( m => m.InformationPageModule)
		}
		]
	},
	{
		path: 'visits',
		children: [
		{
			path: '',
	loadChildren: () => import('../../swimming-pool/visits/visits.module').then( m => m.VisitsPageModule)
		}
		]
	}
	]
},
{
	path: 'information',
	loadChildren: () => import('../../swimming-pool/information/information.module').then( m => m.InformationPageModule)
},
{
	path: 'visits',
	loadChildren: () => import('../../swimming-pool/visits/visits.module').then( m => m.VisitsPageModule)
},
{
	path: 'statistics',
	// loadChildren: () => import('../../swimming-poolstatistics/statistics.module').then( m => m.StatisticsPageModule)
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
export class MyPoolsPageRoutingModule {}
