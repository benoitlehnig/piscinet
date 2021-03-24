import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CGUPageRoutingModule } from './cgu-routing.module';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { CGUPage } from './cgu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CGUPageRoutingModule
  ],
  declarations: [CGUPage]
})
export class CGUPageModule {}
