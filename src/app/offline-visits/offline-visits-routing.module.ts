import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfflineVisitsPage } from './offline-visits.page';

const routes: Routes = [
  {
    path: '',
    component: OfflineVisitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflineVisitsPageRoutingModule {}
