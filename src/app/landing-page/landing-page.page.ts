import { Component, OnInit,ViewChild } from '@angular/core';
import { AngularFireAnalytics  } from '@angular/fire/analytics';
import { PopoverController } from '@ionic/angular';
import { RegisterFormComponent } from './register-form/register-form.component';
import { NgsRevealService } from 'ngx-scrollreveal';
import { NgsRevealConfig } from 'ngx-scrollreveal';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.page.html',
	styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

	public slideOpts = {
		initialSlide: 1,
		speed: 2500,
		autoplay:true
	};
	public col1Config: NgsRevealConfig;

	constructor(
		public analytics: AngularFireAnalytics,
		public popoverController:PopoverController,
		private revealService: NgsRevealService

		) {
		 this.col1Config = {reset:false, desktop: true,mobile: true};
		}

	ngOnInit() {
		
	}

	ionViewDidEnter(){
		let beforeRevealSubscription = this.revealService.beforeReveal$.subscribe(
      (el: HTMLElement) => {
        console.log(`beforeReveal of '<${el.nodeName}>.${el.className}'`);
      });
		this.revealService.sync();

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
