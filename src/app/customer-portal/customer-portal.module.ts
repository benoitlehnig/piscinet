import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TranslateModule,TranslatePipe} from '@ngx-translate/core';

import { CustomerPortalPageRoutingModule } from './customer-portal-routing.module';

import { CustomerPortalPage } from './customer-portal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPortalPageRoutingModule,
    TranslateModule
  ],
  declarations: [CustomerPortalPage]
})
export class CustomerPortalPageModule {}
