import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AddEmployeePageRoutingModule } from './add-employee-routing.module';

import { AddEmployeePage } from './add-employee.page';
import {MyCommonDirectivesModule} from '../../../directives/common/common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddEmployeePageRoutingModule,
    MyCommonDirectivesModule
  ],
  declarations: [AddEmployeePage]
})
export class AddEmployeePageModule {}
