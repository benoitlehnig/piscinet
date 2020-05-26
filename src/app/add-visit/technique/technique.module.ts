import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { TechniquePageRoutingModule } from './technique-routing.module';

import { TechniquePage } from './technique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    TechniquePageRoutingModule
  ],
  declarations: [TechniquePage]
})
export class TechniquePageModule {}
