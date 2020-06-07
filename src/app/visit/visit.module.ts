import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import { SelectCustomerComponent } from './select-customer/select-customer.component';

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
  declarations: [VisitPage,SelectCustomerComponent],
  exports:[TranslatePipe]
})
export class VisitPageModule {}
