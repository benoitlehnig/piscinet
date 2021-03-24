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
			loadChildren: () => import('../../piscinist-portal/swimming-pool/information/information.module').then( m => m.InformationPageModule)
		}
		]
	},
	{
		path: 'visits',
		children: [
		{
			path: '',
			loadChildren: () => import('../../piscinist-portal/swimming-pool/visits/visits.module').then( m => m.VisitsPageModule)
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
export class MyPoolsPageRoutingModule {}
