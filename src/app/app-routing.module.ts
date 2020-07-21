import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { customClaims } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const adminOnly = () => pipe(customClaims, map(claims => claims.admin === true));
const superAdminOnly = () => pipe(customClaims, map(claims => claims.superAdmin === true));
const adminEmployeeOnly = () => pipe(customClaims, map(claims => (claims.admin === true || claims.employee ===true)));


const routes: Routes = [
{
  path: '',
  redirectTo: 'landing-page',
  pathMatch: 'full'
},
{
  path: 'customers',
  loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminEmployeeOnly },
},
{
  path: 'customers/:id',
  loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule),
  canActivate: [AngularFireAuthGuard]

},
{
  path: 'edit-customer',
  loadChildren: () => import('./add-customer/add-customer.module').then( m => m.AddCustomerPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }
},
{
  path: 'customers/:id/edit-swimming-pool',
  loadChildren: () => import('./add-swimming-pool/add-swimming-pool.module').then( m => m.AddSwimmingPoolPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminEmployeeOnly }
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
},
{
  path: 'login/:accountId',
  loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
},
{
  path: 'edit-employee',
  loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }
},
{
  path: 'employees',
  loadChildren: () => import('./employees/employees.module').then( m => m.EmployeesPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }
},
{
  path: 'employees/:id',
  loadChildren: () => import('./employee/employee.module').then( m => m.EmployeePageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }
},

{
  path: 'customers/:id/swimming-pool/:sid',
  loadChildren: () => import('./swimming-pool/swimming-pool.module').then( m => m.SwimmingPoolPageModule),
  canActivate: [AngularFireAuthGuard]
},
{
  path: 'customers/:id/swimming-pool/:sid/edit-swimming-pool',
  loadChildren: () => import('./add-swimming-pool/add-swimming-pool.module').then( m => m.AddSwimmingPoolPageModule),
  canActivate: [AngularFireAuthGuard]

},
{
  path: 'customers/:id/swimming-pool/:sid/add-visit',
  loadChildren: () => import('./add-visit/add-visit.module').then( m => m.AddVisitPageModule),
  canActivate: [AngularFireAuthGuard]

},
{
  path: 'visits',
  loadChildren: () => import('./visits/visits.module').then( m => m.VisitsPageModule),
  canActivate: [AngularFireAuthGuard]

},
{
  path: 'visits/:vid',
  loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule),
  canActivate: [AngularFireAuthGuard]

},
{
  path: 'edit-visit',
  loadChildren: () => import('./add-visit/add-visit.module').then( m => m.AddVisitPageModule),
  canActivate: [AngularFireAuthGuard]
},
{
  path: 'myProfile',
  loadChildren: () => import('./customer/my-profile/my-profile.module').then( m => m.MyProfilePageModule),
  canActivate: [AngularFireAuthGuard]

},
{
  path: 'myPools',
  loadChildren: () => import('./customer/my-pools/my-pools.module').then( m => m.MyPoolsPageModule),
  canActivate: [AngularFireAuthGuard]

},
{
  path: 'offlineVisits',
  loadChildren: () => import('./offline-visits/offline-visits.module').then( m => m.OfflineVisitsPageModule),
  canActivate: [AngularFireAuthGuard]

},
{
  path: 'alarms',
  loadChildren: () => import('./alarms/alarms.module').then( m => m.AlarmsPageModule)
},
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
},
{
  path: 'super-admin',
  loadChildren: () => import('./super-admin/super-admin.module').then( m => m.SuperAdminPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: superAdminOnly }
},
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  }


];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
