import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { TechnicalPageRoutingModule } from './technical-routing.module';

import { TechnicalPage } from './technical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    TechnicalPageRoutingModule
  ],
  declarations: [TechnicalPage,TranslatePipe]
})
export class TechnicalPageModule {}
