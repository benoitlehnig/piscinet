import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import {Customer} from '../models/customer';
import {SwimmingPool} from '../models/swimming-pool';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-customer',
	templateUrl: './customer.page.html',
	styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

	zoom = 18;
	center: google.maps.LatLngLiteral
	options: google.maps.MapOptions = {
		mapTypeId: 'hybrid',
		zoomControl: false,
		scrollwheel: true,
		disableDoubleClickZoom: true,
		rotateControl:false
	}
	public claims;
	public emailSentText:string="";

	public uid:string;
	public customer:Customer=new Customer();
	public customerStringified;string="";
	public swimmingPools:Observable<any>;

	constructor(
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase,
		public authenticationService:AuthenticationService,
		private functions: AngularFireFunctions,
		public popoverController: PopoverController,
		public translateService : TranslateService
		) { }

	ngOnInit() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		this.claims = this.authenticationService.getClaims();
		this.translateService.get('CUSTOMER.EmailSent').subscribe(
			value => {
				this.emailSentText = value;
			});
		
	}
	async presentPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			componentProps: {homeref:this, uid:this.uid,customerStringified:this.customerStringified},
			cssClass: 'my-custom-class',
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	dismissPopover(){
		this.popoverController.dismiss();
	}
	ionViewWillEnter(){
		this.afDatabase.object<Customer>('customers/'+this.uid).valueChanges().subscribe(
			(data) =>{
				this.customer = data;
				this.customerStringified = JSON.stringify(data);
				this.center = this.customer.location;
			})
		this.swimmingPools = this.afDatabase.list<SwimmingPool>('/pools/',ref => ref.orderByChild('customerUid').equalTo(this.uid)).snapshotChanges().pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
	}


	sendEmailUserCreation(){
		let email={'customer':this.customer};
		const callable = this.functions.httpsCallable('sendUserCreationEmail');
		const obs = callable(email);
		obs.subscribe(async res => {
			this.popoverController.dismiss();
		});
	}



}
