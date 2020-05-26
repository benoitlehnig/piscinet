import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	errorMessage: string = '';

	constructor(
	public authService:AuthenticationService,
	public navCtrl: NavController
		) { }

	ngOnInit() {

	}

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


	loginUser(form) {
		this.authService.loginUser(form)
		.then(res => {
			console.log(res);
			this.errorMessage = "";
			this.navCtrl.navigateForward('/');
			
		}, err => {
			this.errorMessage = err.message;
		})
	}

	goToRegisterPage() {
		this.navCtrl.navigateForward('/register');
	}

}
