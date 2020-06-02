import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { OfflineVisitsPageRoutingModule } from './offline-visits-routing.module';

import { OfflineVisitsPage } from './offline-visits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OfflineVisitsPageRoutingModule
  ],
  declarations: [OfflineVisitsPage]
})
export class OfflineVisitsPageModule {}
