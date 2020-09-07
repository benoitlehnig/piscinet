import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomerServicesService } from '../../services/customer-services.service'
import {Customer} from '../../models/customer';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { DataSharingService } from '../../services/data-sharing.service'


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
		private dataSharingService: DataSharingService,


		) { 
		this.customer = new Customer()
	}

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.dataSharingService.getCustomerChanges().subscribe(
			data=>{
				if(data){
					console.log("ionViewWillEnter", data.data)
					this.customer = data.data
				}
				
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
