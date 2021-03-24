import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonPagesPage } from './common-pages.page';

const routes: Routes = [
  {
    path: '',
    component: CommonPagesPage
  },
  {
    path: 'visit:/vid',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonPagesPageRoutingModule {}
