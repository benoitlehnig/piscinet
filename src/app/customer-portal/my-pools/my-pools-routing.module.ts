import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPoolsPage } from './my-pools.page';

const routes: Routes = [

{
	path: '',
	component: MyPoolsPage,
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
		path: '',
		redirectTo: 'information',
		pathMatch: 'full'
	},
	]
}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MyPoolsPageRoutingModule {}
