import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSwimmingPoolPage } from './add-swimming-pool.page';

const routes: Routes = [
  {
    path: '',
    component: AddSwimmingPoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSwimmingPoolPageRoutingModule {}
