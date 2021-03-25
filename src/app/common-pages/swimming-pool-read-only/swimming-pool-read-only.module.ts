import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwimmingPoolReadOnlyPageRoutingModule } from './swimming-pool-read-only-routing.module';

import { SwimmingPoolReadOnlyPage } from './swimming-pool-read-only.page';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SwimmingPoolReadOnlyPageRoutingModule
  ],
  declarations: [SwimmingPoolReadOnlyPage]
})
export class SwimmingPoolReadOnlyPageModule {}
