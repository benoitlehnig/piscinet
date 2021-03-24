import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'

import { IonicModule } from '@ionic/angular';

import { MapViewPageRoutingModule } from './map-view-routing.module';

import { MapViewPage } from './map-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    MapViewPageRoutingModule
  ],
  declarations: [MapViewPage]
})
export class MapViewPageModule {}
