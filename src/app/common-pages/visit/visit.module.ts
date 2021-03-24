import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { VisitPageRoutingModule } from './visit-routing.module';

import { VisitPage } from './visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VisitPageRoutingModule
  ],
  declarations: [VisitPage]
})
export class VisitPageModule {}
