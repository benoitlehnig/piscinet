import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	errorMessage: string = '';
	emailResetPassword:string="";
	mode:string ="login";
	successEmailSent:string ="";
	errorMessages = [{'invalidemail': "",'wrongpassword':'','usernot-found':'',}]
	validation_messages = {
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
		) { }

	ngOnInit() {
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
			this.errorMessage = "";
			let claims = this.authService.getClaims();
			if(claims['customer'] ===true){
				this.navCtrl.navigateForward('/myPools');
			}
			if(claims['admin'] ===true){
				this.navCtrl.navigateForward('/');
			}
			if(claims['employee'] ===true){
				this.navCtrl.navigateForward('/customers');
			}
			
			
		}, err => {
			console.log(err);
			console.log(err.code.split("/")[1].replace("-",""));
			console.log(this.errorMessages['invalidemail'])
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

}
