import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonPagesPageRoutingModule } from './common-pages-routing.module';

import { CommonPagesPage } from './common-pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonPagesPageRoutingModule
  ],
  declarations: [CommonPagesPage]
})
export class CommonPagesPageModule {}
