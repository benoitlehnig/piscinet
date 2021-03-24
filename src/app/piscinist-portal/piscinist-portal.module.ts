import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiscinistPortalPageRoutingModule } from './piscinist-portal-routing.module';

import { PiscinistPortalPage } from './piscinist-portal.page';

import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PiscinistPortalPageRoutingModule
  ],
  declarations: [PiscinistPortalPage]
})
export class PiscinistPortalPageModule {}
