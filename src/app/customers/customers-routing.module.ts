import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { CustomersPage } from './customers.page';

const routes: Routes = [
{
  path: 'tab',
  component: CustomersPage,
  children: [
  {
    path: 'list',
    children: [
    {
      path: '',
      loadChildren: () => import('./list-view/list-view.module').then( m => m.ListViewPageModule)
    }
    ]
  },
  {
    path: 'map',
    children: [
    {
      path: '',
      loadChildren: () => import('./map-view/map-view.module').then( m => m.MapViewPageModule)
    }
    ]
  },     
  
  ]
},
{
  path: '',
  redirectTo: 'tab/list',
  pathMatch: 'full'
},
{
  path: 'list-view',
  loadChildren: () => import('./list-view/list-view.module').then( m => m.ListViewPageModule)
},
{
  path: 'map-view',
  loadChildren: () => import('./map-view/map-view.module').then( m => m.MapViewPageModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersPageRoutingModule {}
