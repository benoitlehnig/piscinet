import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';

import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import { EmployeesPageRoutingModule } from './employees-routing.module';

import { EmployeesPage } from './employees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarModule,
    TranslateModule,
    EmployeesPageRoutingModule
  ],
  declarations: [EmployeesPage]
})
export class EmployeesPageModule {}
