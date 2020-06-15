import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

	@Input("homeref") value;
	@Input("uid") uid;

	public alertText;

	constructor(
		public navParams : NavParams,
		public alertController: AlertController,
		public translateService : TranslateService,) { }

	ngOnInit() {
		this.translateService.get(['EMPLOYEE.AlertHeader', 'EMPLOYEE.AlertMesssage','EMPLOYEE.AlertCancel', 
			'EMPLOYEE.AlertOK']).subscribe(
			value => {
				this.alertText = {
					header : value['EMPLOYEE.AlertHeader'],
					message:value['EMPLOYEE.AlertMesssage'],
					buttonCancel:value['EMPLOYEE.AlertCancel'], 
					buttonOK:value['EMPLOYEE.AlertOK'] 
				}
			});
		}


		sendEmailUserCreation(){
			this.navParams.get('homeref').sendEmailUserCreation();

		}
		dismissPopover(){
			this.navParams.get('homeref').dismissPopover();
		}
		setAdmin(){
			this.navParams.get('homeref').setAdmin();
		}
		async removeEmployee() {
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
