import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CustomerPortalPage } from './customer-portal.page';

const routes: Routes = [
{
	path: '',
	component: CustomerPortalPage,
	children: [
	
	{
		path: 'profile',
		loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
	},

	{
		path: 'pools',
		loadChildren: () => import('./my-pools/my-pools.module').then( m => m.MyPoolsPageModule)
	},
	{
		path: 'contact',
		loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
	},
	{
		path: '',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
	]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CustomerPortalPageRoutingModule {}
