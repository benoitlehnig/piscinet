import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AddAdminPageRoutingModule } from './add-admin-routing.module';

import { AddAdminPage } from './add-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddAdminPageRoutingModule
  ],
  declarations: [AddAdminPage]
})
export class AddAdminPageModule {}
