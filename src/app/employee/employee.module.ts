import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { GoogleMapsModule } from '@angular/google-maps'

import { IonicModule } from '@ionic/angular';
import { AvatarModule } from 'ngx-avatar';

import { EmployeePageRoutingModule } from './employee-routing.module';

import { EmployeePage } from './employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AvatarModule,
    GoogleMapsModule,
    EmployeePageRoutingModule
  ],
  declarations: [EmployeePage]
})
export class EmployeePageModule {}
