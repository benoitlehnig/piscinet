import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import { GoogleMapsModule } from '@angular/google-maps'

import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { CustomerPageRoutingModule } from './customer-routing.module';

import { CustomerPage } from './customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GoogleMapsModule,
     TranslateModule.forChild(),
    CustomerPageRoutingModule
  ],
  declarations: [CustomerPage,PopoverComponent],
  exports:[TranslatePipe]
})
export class CustomerPageModule {}
