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
			loadChildren: '../../swimming-pool/information/information.module#InformationPageModule'
		}
		]
	},
	{
		path: 'visits',
		children: [
		{
			path: '',
			loadChildren: '../../swimming-pool/visits/visits.module#VisitsPageModule'
		}
		]
	},     
	
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
