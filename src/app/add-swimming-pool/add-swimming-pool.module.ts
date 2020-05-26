import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import { AddSwimmingPoolPageRoutingModule } from './add-swimming-pool-routing.module';

import { AddSwimmingPoolPage } from './add-swimming-pool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddSwimmingPoolPageRoutingModule
  ],
  declarations: [AddSwimmingPoolPage]
})
export class AddSwimmingPoolPageModule {}
