import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import { PicturesPageRoutingModule } from './pictures-routing.module';

import { PicturesPage } from './pictures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PicturesPageRoutingModule
  ],
  declarations: [PicturesPage]
})
export class PicturesPageModule {}
