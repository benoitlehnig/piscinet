import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AlarmsPageRoutingModule } from './alarms-routing.module';

import { AlarmsPage } from './alarms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AlarmsPageRoutingModule
  ],
  declarations: [AlarmsPage]
})
export class AlarmsPageModule {}
