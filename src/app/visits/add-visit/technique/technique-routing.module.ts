import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechniquePage } from './technique.page';

const routes: Routes = [
  {
    path: '',
    component: TechniquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechniquePageRoutingModule {}
