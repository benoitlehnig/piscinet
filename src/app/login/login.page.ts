import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import {AccountServicesService}  from '../services/account-services.service'; 

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public errorMessage: string = '';
	public accountId:string="";
	public landingPageLogo:string="";
	public landingPageName:string="";
	public emailResetPassword:string="";
	public mode:string ="login";
	public successEmailSent:string ="";
	public errorMessages = [{'invalidemail': "",'wrongpassword':'','usernot-found':'',}]
	public validation_messages = {
		'email': [
		{ type: 'required', message: 'Email is required.' },
		{ type: 'pattern', message: 'Please enter a valid email.' }
		],
		'password': [
		{ type: 'required', message: 'Password is required.' },
		{ type: 'minlength', message: 'Password must be at least 5 characters long.' }
		]
	};

	constructor(
		public authService:AuthenticationService,
		public navCtrl: NavController,
		public translateService : TranslateService,
		public toastController: ToastController,
		private storage: Storage,
		private activatedRoute: ActivatedRoute,
		private accountServicesService: AccountServicesService,
		) { }

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			console.log("params:", params);
			if(params.accountId !== undefined){
				console.log("his.accountId !==null", this.accountId)
				this.accountId = params.accountId;
				console.log( params.accountId,this.accountId);
				this.storage.set('accountId',this.accountId);
				this.retrieveAccountCustomization();
			}
			else{
				this.storage.get('accountId').then((accountId) => {
					if(accountId !==null){
						console.log("this.accountId storage ", this.accountId)
						this.accountId = accountId;
						this.retrieveAccountCustomization();
					}
					else{

					}
				});
			}
		});
		
		
		this.translateService.get(['LOGIN.SuccessEmailSent','LOGIN.invalidemail','LOGIN.wrongpassword','LOGIN.usernot-found',]).subscribe(
			value => {
				console.log(value)
				this.successEmailSent = value['LOGIN.SuccessEmailSent'];
				this.errorMessages['invalidemail'] = value['LOGIN.invalidemail'];
				this.errorMessages['wrongpassword'] = value['LOGIN.wrongpassword'];
				this.errorMessages['usernot-found'] = value['LOGIN.usernot-found'];
			});
	}

	
	loginUser(form) {
		this.authService.loginUser(form)
		.then(res => {
			console.log(res);
			
		}, err => {
			this.errorMessage = this.errorMessages[String(err.code.split("/")[1].replace("-",""))];
		})
	}

	goToRegisterPage() {
		this.navCtrl.navigateForward('/register');
	}

	requestResetPasswordPage(){
		this.mode ="resetPassword";
	}
	resetPasswordCancel(){
		this.mode ="login";
	}
	resetPassword(){
		this.authService.resetPassword(this.emailResetPassword);
		this.presentToast();
		this.mode ="login";
	}
	async presentToast() {
		let message = this.successEmailSent;
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}

	retrieveAccountCustomization(){
		this.accountServicesService.getAccount(this.accountId).subscribe(
			(account) => {
				this.landingPageLogo = account.configuration.logoPictureUrl;
				this.landingPageName =  account.configuration.nameLoginPage
			})
	}

}
