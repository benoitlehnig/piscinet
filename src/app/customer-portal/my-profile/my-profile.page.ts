import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Subscription } from 'rxjs';


import { AuthenticationService } from '../../services/authentication.service';
import {Customer} from '../../models/customer';
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

	public customerChangesSub: Subscription = new Subscription();


	constructor( 
		public authService:AuthenticationService,
		private afMessaging: AngularFireMessaging,
		private functions: AngularFireFunctions,
		private dataSharingService: DataSharingService,


		) { 
		this.customer = new Customer()
	}

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.customerChangesSub = this.dataSharingService.getCustomerChanges().subscribe(
			data =>{
				this.customer = data.data;
			})
	}

	ionViewWillLeave(){
		this.customerChangesSub.unsubscribe();
	}

	updatePushNotifRequest(){
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
