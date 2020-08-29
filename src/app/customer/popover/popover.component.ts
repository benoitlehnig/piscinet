import { Component, OnInit,Input  } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

	public alertText;
	constructor(
		public navParams : NavParams,  
		public alertController: AlertController,
		public translateService : TranslateService,

		) { }

	@Input("homeref") value;
	@Input("uid") uid;
	@Input("isActivated") isActivated;
	@Input("customerStringified") customerStringified;
	@Input("eligibilityToAddPool") eligibilityToAddPool;

	ngOnInit() {
		this.translateService.get(['CUSTOMER.AlertHeader', 'CUSTOMER.AlertMesssage','CUSTOMER.AlertCancel', 
			'CUSTOMER.AlertOK']).subscribe(
			value => {
				this.alertText = {
					header : value['CUSTOMER.AlertHeader'],
					message:value['CUSTOMER.AlertMesssage'],
					buttonCancel:value['CUSTOMER.AlertCancel'], 
					buttonOK:value['CUSTOMER.AlertOK'] 
				}

			});

		}

		sendEmailUserCreation(){
			this.dismissPopover();
			console.log("ok")
			this.navParams.get('homeref').sendEmailUserCreation();

		}
		dismissPopover(){
			this.navParams.get('homeref').dismissPopover();
		}

		async removeCustomer() {
			const alert = await this.alertController.create({
				cssClass: 'my-custom-class',
				header: this.alertText.header,
				message: this.alertText.message,
				buttons:  [
				{
					text: this.alertText.buttonCancel,
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
					}
				}, {
					text: this.alertText.buttonOK,
					handler: () => {
						this.navParams.get('homeref').removeCustomer();
					}
				}
				]
			});

			await alert.present();
		}

	}
