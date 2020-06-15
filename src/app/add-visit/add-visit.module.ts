import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AddVisitPageRoutingModule } from './add-visit-routing.module';

import { AddVisitPage } from './add-visit.page';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	TranslateModule,
	AddVisitPageRoutingModule
	],
	declarations: [AddVisitPage,ConfirmationComponent]
})
export class AddVisitPageModule {}
