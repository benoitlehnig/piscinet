import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import { AvatarModule } from 'ngx-avatar';
import { GoogleMapsModule } from '@angular/google-maps'

import { CustomersPageRoutingModule } from './customers-routing.module';

import { CustomersPage } from './customers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AvatarModule,
    GoogleMapsModule,
    CustomersPageRoutingModule
  ],
  declarations: [CustomersPage]
})
export class CustomersPageModule {}
