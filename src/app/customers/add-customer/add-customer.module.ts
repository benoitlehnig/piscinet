import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AddCustomerPageRoutingModule } from './add-customer-routing.module';

import { AddCustomerPage } from './add-customer.page';
import {MyCommonDirectivesModule} from '../../directives/common/common.module';


@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	TranslateModule,
	AddCustomerPageRoutingModule,
	MyCommonDirectivesModule
	],
	declarations: [AddCustomerPage],
})
export class AddCustomerPageModule {}
