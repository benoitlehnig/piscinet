import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesPage } from './employees.page';

const routes: Routes = [
{
	path: '',
	component: EmployeesPage
},
{
	path: 'edit-employee',
	loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule),
},
{
	path: ':id',
	loadChildren: () => import('./employee/employee.module').then( m => m.EmployeePageModule),
},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmployeesPageRoutingModule {}
