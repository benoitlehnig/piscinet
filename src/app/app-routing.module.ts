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
  path: 'landing-page',
  loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
},
{
  path: 'cgu',
  loadChildren: () => import('./cgu/cgu.module').then( m => m.CGUPageModule)
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
  path: 'customers',
  loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminEmployeeOnly },
},
{
  path: 'employees',
  loadChildren: () => import('./employees/employees.module').then( m => m.EmployeesPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }
},
{
  path: 'visits',
  loadChildren: () => import('./visits/visits.module').then( m => m.VisitsPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminEmployeeOnly },

},
{
  path: 'alarms',
  loadChildren: () => import('./alarms/alarms.module').then( m => m.AlarmsPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminEmployeeOnly },
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
  path: 'contact',
  loadChildren: () => import('./customer/contact/contact.module').then( m => m.ContactPageModule),
  canActivate: [AngularFireAuthGuard]

},





];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
