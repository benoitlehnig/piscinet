import { Component, OnInit,ViewChild } from '@angular/core';
import { AngularFireAnalytics  } from '@angular/fire/analytics';
import { PopoverController } from '@ionic/angular';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.page.html',
	styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

	constructor(
		analytics: AngularFireAnalytics,
		public popoverController:PopoverController

		) { }

	ngOnInit() {
	}

	getContent() {
		return document.querySelector('ion-content');
	}

	scrollTo(elementId: string) {
		let y = document.getElementById(elementId).offsetTop;
		this.getContent().scrollToPoint(0, y,400);
	}

	async presentRegisterPopover() {
		const popover = await this.popoverController.create({
			component: RegisterFormComponent,
			componentProps:{homeref:this},
			cssClass: 'popover',
			backdropDismiss: true,
			translucent: true
		});
		return await popover.present();
	}
	dismissRegisterPopover(){
		this.popoverController.dismiss();
	}

}
