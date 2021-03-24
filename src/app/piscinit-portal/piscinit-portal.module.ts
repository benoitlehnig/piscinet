import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiscinitPortalPageRoutingModule } from './piscinit-portal-routing.module';

import { PiscinitPortalPage } from './piscinit-portal.page';

import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PiscinitPortalPageRoutingModule
  ],
  declarations: [PiscinitPortalPage]
})
export class PiscinitPortalPageModule {}
