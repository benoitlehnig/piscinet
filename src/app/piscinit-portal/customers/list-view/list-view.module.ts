import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { AvatarModule } from 'ngx-avatar';

import { IonicModule } from '@ionic/angular';

import { ListViewPageRoutingModule } from './list-view-routing.module';

import { ListViewPage } from './list-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AvatarModule,
    ListViewPageRoutingModule
  ],
  declarations: [ListViewPage]
})
export class ListViewPageModule {}
