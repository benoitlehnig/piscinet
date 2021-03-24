import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import { SwimmingPoolPageRoutingModule } from './swimming-pool-routing.module';

import { SwimmingPoolPage } from './swimming-pool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SwimmingPoolPageRoutingModule
  ],
  declarations: [SwimmingPoolPage]
})
export class SwimmingPoolPageModule {}
