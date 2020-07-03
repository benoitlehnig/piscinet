import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomerServicesService } from '../../services/customer-services.service'
import {Customer} from '../../models/customer';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';


@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.page.html',
	styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

	public uid:string="";
	public customer:Customer=new Customer();
	public receivePushNotif:boolean=false;

	constructor( 
		public authService:AuthenticationService,
		public customerServicesService: CustomerServicesService,
		private afMessaging: AngularFireMessaging,
		private functions: AngularFireFunctions,


		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.authService.user.subscribe(
			result =>
			{
				console.log("MyProfilePage", result)
				this.uid = result.uid;
				this.customerServicesService.getCustomer(this.uid).subscribe(
					(data) =>{
						console.log("customer", data)
						this.customer = data;
					})
			})

	}
	updatePushNotifRequest(){
		console.log(" this.receivePushNotif" ,this.receivePushNotif);
		if(this.receivePushNotif ===false){

		}
		else{
			this.requestPermission()
		}
	}
	requestPermission() {

		this.afMessaging.requestToken
		.subscribe(
			(token) => { 
				console.log('Permission granted! Save to the server!', token); 
				const callable = this.functions.httpsCallable('addDevice');
				const obs = callable({'uid':this.uid, 'token': token});
				obs.subscribe(async res => {
				});
			},
			(error) => { console.error(error); 
				console.log('Permission not granted! Save to the server!'); 
				const callable = this.functions.httpsCallable('removeDevices');
				const obs = callable({'uid':this.uid});
				obs.subscribe(async res => {
				});},  
				);

	}





}
