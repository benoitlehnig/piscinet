import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { MyPoolsPageRoutingModule } from './my-pools-routing.module';

import { MyPoolsPage } from './my-pools.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MyPoolsPageRoutingModule
  ],
  declarations: [MyPoolsPage]
})
export class MyPoolsPageModule {}
