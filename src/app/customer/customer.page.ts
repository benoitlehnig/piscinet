import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Customer} from '../models/customer';
import {SwimmingPool} from '../models/swimming-pool';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import {TranslateService} from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CustomerServicesService } from '../services/customer-services.service'

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
	public loading ;
	public loadingText:string="" ;
	public successDeleteText:string="";


	constructor(
		private activatedRoute: ActivatedRoute,
		public authenticationService:AuthenticationService,
		private functions: AngularFireFunctions,
		public popoverController: PopoverController,
		public translateService : TranslateService,
		public navCtrl: NavController,
		public loadingController: LoadingController,
		public toastController: ToastController,	
		public customerServicesService:CustomerServicesService

		) { }

	ngOnInit() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		this.claims = this.authenticationService.getClaims();
		this.translateService.get('CUSTOMER.EmailSent','COMMON.Loading').subscribe(
			value => {
				this.emailSentText = value['CUSTOMER.EmailSent'];
				this.loadingText = value['COMMON.Loading'];
				this.successDeleteText = value['CUSTOMER.SuccessDeleteText'];
			});		
	}
	async presentPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			componentProps: {homeref:this, uid:this.uid,customerStringified:this.customerStringified},
			cssClass: 'popover',
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	dismissPopover(){
		this.popoverController.dismiss();
	}
	ionViewWillEnter(){
		this.customerServicesService.getCustomer(this.uid).subscribe(
			(data) =>{
				this.customer = data;
				this.customerStringified = JSON.stringify(data);
				this.center = this.customer.location;
			})
		this.swimmingPools = this.customerServicesService.getCustomerPools(this.uid);
	}


	sendEmailUserCreation(){
		let email={'customer':this.customer};
		const callable = this.functions.httpsCallable('sendUserCreationEmail');
		const obs = callable(email);
		obs.subscribe(async res => {
			this.popoverController.dismiss();
		});
	}

	async removeCustomer(){
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 5000
		});
		this.loading.present();
		this.navCtrl.navigateRoot(['customers/']);

		const callable = this.functions.httpsCallable('deleteCustomer');
		const obs = callable(this.uid);
		obs.subscribe(async res => {
			this.popoverController.dismiss();
			this.presentToast();
			this.loading.dismiss();
		});

	}

	async presentToast() {
		let message = this.customer.firstName +" "+ this.customer.lastName +" "+ this.successDeleteText;
		
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}


}
