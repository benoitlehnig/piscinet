import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthenticationService } from '../services/authentication.service';
import { PopoverController } from '@ionic/angular';

import { EmployeeServicesService } from '../services/employee-services.service'
import { Observable } from 'rxjs';
import {Employee} from '../models/employee';
import { PopoverComponent } from './popover/popover.component';
import {TranslateService} from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/messaging';



@Component({
	selector: 'app-employee',
	templateUrl: './employee.page.html',
	styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

	public uid:string;
	public claims;
	employee: Employee = new Employee();
	center: google.maps.LatLngLiteral;
	options: google.maps.MapOptions = {
		mapTypeId: 'hybrid',
		
		minZoom: 8
	}
	public emailSentText:string = "";
	public successDeleteText:string="";
	public loading ;
	public mapOK = false;
	public loadingText:string="" ;


	constructor(
		private activatedRoute: ActivatedRoute,
		public employeeServicesService: EmployeeServicesService,
		private functions: AngularFireFunctions,
		public authenticationService:AuthenticationService,
		public popoverController: PopoverController,
		public translateService : TranslateService,
		public navCtrl: NavController,
		public toastController: ToastController,
		public loadingController: LoadingController,
		private afMessaging: AngularFireMessaging,


		) { }

	ngOnInit() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		this.claims = this.authenticationService.getClaims();
		this.translateService.get(['EMPLOYEE.EmailSent', 'EMPLOYEE.SuccessDeleteText','COMMON.Loading']).subscribe(
			value => {
				this.emailSentText = value['EMPLOYEE.EmailSent'];
				this.successDeleteText = value['EMPLOYEE.SuccessDeleteText'];
				this.loadingText = value['COMMON.Loading'];
			});
		
	}
	ionViewWillEnter(){
		this.employeeServicesService.getEmployee(this.uid).subscribe(
			(data) =>{
				if(data){
					this.employee = data;
					this.center = this.employee.location;
					this.mapOK = true;
				}
			})
	}

	setAdmin(){
		const callable = this.functions.httpsCallable('setAdmin');
		const obs = callable(this.uid);
		this.popoverController.dismiss();
		obs.subscribe(async res => {
		});
	}
	async presentPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			componentProps: {homeref:this, uid:this.uid},
			cssClass: 'popover',
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	dismissPopover(){
		this.popoverController.dismiss();
	}
	removeEmployee(){
		const callable = this.functions.httpsCallable('deleteEmployee');
		const obs = callable(this.uid);
		obs.subscribe(async res => {
			this.popoverController.dismiss();
			this.navCtrl.navigateRoot(['employees/']);
			this.presentToast();
			this.loading.dismiss();
		});
	}


	async presentToast() {
		let message = this.employee.firstName +" "+ this.employee.lastName +" "+ this.successDeleteText;
		
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}

	sendEmailUserCreation(){
		let email={'customer':this.employee, 'uid': this.uid};
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
		this.navCtrl.navigateRoot(['employees/']);

		const callable = this.functions.httpsCallable('deleteEmployee');
		const obs = callable(this.uid);
		obs.subscribe(async res => {
			this.popoverController.dismiss();
			this.presentToast();
			this.loading.dismiss();
		});

	}

}
