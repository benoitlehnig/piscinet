import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { customClaims } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const adminOnly = () => pipe(customClaims, map(claims => claims.admin === true));


const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'customers/:id',
    loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'edit-customer',
    loadChildren: () => import('./add-customer/add-customer.module').then( m => m.AddCustomerPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }
  },
  {
    path: 'customers/:id/edit-swimming-pool',
    loadChildren: () => import('./add-swimming-pool/add-swimming-pool.module').then( m => m.AddSwimmingPoolPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'edit-employee',
    loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then( m => m.EmployeesPageModule)
  },
  {
    path: 'employees/:id',
    loadChildren: () => import('./employee/employee.module').then( m => m.EmployeePageModule)
  },
  
  {
    path: 'customers/:id/swimming-pool/:sid',
    loadChildren: () => import('./swimming-pool/swimming-pool.module').then( m => m.SwimmingPoolPageModule)
  },
  {
    path: 'customers/:id/swimming-pool/:sid/edit-swimming-pool',
    loadChildren: () => import('./add-swimming-pool/add-swimming-pool.module').then( m => m.AddSwimmingPoolPageModule)
  },
  {
    path: 'customers/:id/add-visit/:sid',
    loadChildren: () => import('./add-visit/add-visit.module').then( m => m.AddVisitPageModule)
  },
  {
    path: 'visits',
    loadChildren: () => import('./visits/visits.module').then( m => m.VisitsPageModule)
  },
  {
    path: 'visits/:vid',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule)
  },
  {
    path: 'myProfile',
    loadChildren: () => import('./customer/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
