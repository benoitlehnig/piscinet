import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps'

import { MyProfilePageRoutingModule } from './my-profile-routing.module';

import { MyProfilePage } from './my-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GoogleMapsModule,
    MyProfilePageRoutingModule
  ],
  declarations: [MyProfilePage]
})
export class MyProfilePageModule {}
