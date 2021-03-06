import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { customClaims } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const adminOnly = () => pipe(customClaims, map(claims => claims.admin === true));
const customerOnly = () => pipe(customClaims, map(claims => claims.customer === true));
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
  path: 'login',
  loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
},
{
  path: 'login/:accountId',
  loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
},
{
  path: 'customerPortal',
  loadChildren: () => import('./customer-portal/customer-portal.module').then( m => m.CustomerPortalPageModule),
  canActivate: [AngularFireAuthGuard],data: { authGuardPipe: customerOnly }

},
{
  path: 'piscinistPortal',
  loadChildren: () => import('./piscinist-portal/piscinist-portal.module').then( m => m.PiscinistPortalPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminEmployeeOnly },
}

];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
