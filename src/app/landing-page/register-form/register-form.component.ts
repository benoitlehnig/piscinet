import { Component, OnInit,Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavParams} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

	@Input("homeref") value;

	public accountRequestSentText:string="";
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
		this.translateService.get('REGISTER.AccountRequestSentText').subscribe(
			value => {
				this.accountRequestSentText = value;
			});
		}

		submitForm(){
			const callable = this.functions.httpsCallable('newAccountRequest');
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

		}

	}
