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
		this.translateService.get('CUSTOMER.REMOVEALERT').subscribe(
			value => {
				this.alertText = value
			});
		}
		sendEmailUserCreation(){
			this.dismissPopover();
			this.navParams.get('homeref').sendEmailUserCreation();

		}
		dismissPopover(){
			this.navParams.get('homeref').dismissPopover();
		}

		activateAccount(){
			this.dismissPopover();
			this.navParams.get('homeref').activateAccount();
		}

		async removeCustomer() {
			const alert = await this.alertController.create({
				cssClass: 'my-custom-class',
				header: this.alertText['Header'],
				message: this.alertText['Messsage'],
				buttons:  [
				{
					text: this.alertText['Cancel'],
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
					}
				}, {
					text: this.alertText['OK'],
					handler: () => {
						this.navParams.get('homeref').removeCustomer();
					}
				}
				]
			});

			await alert.present();
		}

	}
