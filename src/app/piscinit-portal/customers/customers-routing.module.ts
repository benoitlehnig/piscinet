import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  path: 'edit-customer',
  loadChildren: () => import('./add-customer/add-customer.module').then( m => m.AddCustomerPageModule),
},

{
  path: ':id',
  loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule),
},
{
  path: ':id/edit-swimming-pool',
  loadChildren: () => import('../../swimming-pool/add-swimming-pool/add-swimming-pool.module').then( m => m.AddSwimmingPoolPageModule),
},
{
  path: ':id/swimming-pool/:sid',
  loadChildren: () => import('../../swimming-pool/swimming-pool.module').then( m => m.SwimmingPoolPageModule),
},
{
  path: ':id/swimming-pool/:sid/edit-swimming-pool',
  loadChildren: () => import('../../swimming-pool/add-swimming-pool/add-swimming-pool.module').then( m => m.AddSwimmingPoolPageModule),

},
{
  path: ':id/swimming-pool/:sid/add-visit',
  loadChildren: () => import('../../visits/add-visit/add-visit.module').then( m => m.AddVisitPageModule),
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersPageRoutingModule {}
