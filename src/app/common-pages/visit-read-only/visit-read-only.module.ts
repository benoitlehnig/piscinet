import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { VisitReadOnlyPageRoutingModule } from './visit-read-only-routing.module';

import { VisitReadOnlyPage } from './visit-read-only.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VisitReadOnlyPageRoutingModule
  ],
  declarations: [VisitReadOnlyPage],
  exports:[VisitReadOnlyPage,TranslatePipe]
})
export class VisitReadOnlyPageModule {}
