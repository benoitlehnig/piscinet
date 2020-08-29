import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {TranslateModule,TranslatePipe} from '@ngx-translate/core';
import { RegisterFormComponent } from './register-form/register-form.component';


import { IonicModule } from '@ionic/angular';

import { LandingPagePageRoutingModule } from './landing-page-routing.module';

import { LandingPagePage } from './landing-page.page';
import {NgsRevealModule} from 'ngx-scrollreveal';

@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	TranslateModule,
	NgsRevealModule,  
	LandingPagePageRoutingModule
	],
	declarations: [LandingPagePage,RegisterFormComponent],
	exports:[TranslatePipe]

})
export class LandingPagePageModule {}
