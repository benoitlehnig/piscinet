import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { customClaims } from '@angular/fire/auth-guard';

const adminOnly = () => pipe(customClaims, map(claims => claims.admin === true));
const superAdminOnly = () => pipe(customClaims, map(claims => claims.superAdmin === true));


import { PiscinistPortalPage } from './piscinist-portal.page';

const routes: Routes = [
{
	path: '',
	component: PiscinistPortalPage,
	children: [
	
	{
		path: 'customers',
		loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
	},
	{
		path: 'visits',
		loadChildren: () => import('./visits/visits.module').then( m => m.VisitsPageModule)
	},
	{
		path: 'employees',
		loadChildren: () => import('./employees/employees.module').then( m => m.EmployeesPageModule),
		canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }

	},
	{
		path: 'alarms',
		loadChildren: () => import('./alarms/alarms.module').then( m => m.AlarmsPageModule)
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
		canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }

	},
	{
		path: 'super-admin',
		loadChildren: () => import('./super-admin/super-admin.module').then( m => m.SuperAdminPageModule),
		canActivate: [AngularFireAuthGuard], data: { authGuardPipe: superAdminOnly }

	},
	{
		path: '',
		redirectTo: 'customers',
		pathMatch: 'full'
	}
	]
}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PiscinistPortalPageRoutingModule {}
