import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AddAccountPageRoutingModule } from './add-account-routing.module';

import { AddAccountPage } from './add-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddAccountPageRoutingModule
  ],
  declarations: [AddAccountPage]
})
export class AddAccountPageModule {}
