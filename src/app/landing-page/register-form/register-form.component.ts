import { Component, OnInit,Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavParams} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

import {Company} from '../../models/company';
import {Employee} from '../../models/employee';


@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

	@Input("homeref") value;

	public accountRequestSentText:string="";
	public cguChecked:boolean=false;
	public accountRequest ={
		emailAddress:"",
		siretNumber:"",
		firstName:"",
		lastName:"",
		companyName:""
	}

	constructor(
		private functions: AngularFireFunctions,
		public navParams : NavParams,
		public translateService : TranslateService,
		public toastController : ToastController,

		) { }

	ngOnInit() {
		
	}

	ionViewDidEnter(){
		this.translateService.get('REGISTER.AccountRequestSentText').subscribe(
			value => {
				this.accountRequestSentText = value;
			});
	}

	submitForm(){
			/*const callable = this.functions.httpsCallable('newAccountRequest');
			const obs = callable(this.accountRequest);
			obs.subscribe(async res => {
				this.navParams.get('homeref').dismissRegisterPopover();
				const toast = await this.toastController.create({
					message: this.accountRequestSentText ,
					position:'top' ,
					duration: 5000
				});
				toast.present();
			});
			*/

			const callable2 = this.functions.httpsCallable('createSelfAccount');
			let account:Company = new Company(); 
			account.email = this.accountRequest.emailAddress
			account.siretNumber = this.accountRequest.siretNumber;
			account.name = this.accountRequest.companyName;
			account.configuration.nameLoginPage = this.accountRequest.companyName;

			let admin:Employee = new Employee();

			admin.firstName = this.accountRequest.firstName;
			admin.lastName = this.accountRequest.lastName;
			const data = {account: account, admin:admin }

			const obs2 = callable2(data);
			obs2.subscribe(async res => {
				this.navParams.get('homeref').dismissRegisterPopover();
				const toast = await this.toastController.create({
					message: this.accountRequestSentText ,
					position:'top' ,
					duration: 5000
				});
				toast.present();
			});

		}

	}
