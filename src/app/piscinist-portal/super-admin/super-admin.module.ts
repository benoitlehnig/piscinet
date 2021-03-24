import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SuperAdminPageRoutingModule } from './super-admin-routing.module';

import { SuperAdminPage } from './super-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SuperAdminPageRoutingModule
  ],
  declarations: [SuperAdminPage]
})
export class SuperAdminPageModule {}
