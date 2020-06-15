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

		) { }

	ngOnInit() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		this.claims = this.authenticationService.getClaims();
		this.translateService.get('EMPLOYEE.EmailSent', 'EMPLOYEE.SuccessDeleteText').subscribe(
			value => {
				this.emailSentText = value['EMPLOYEE.EmailSent'];
				this.successDeleteText = value['EMPLOYEE.SuccessDeleteText'];
			});
		
	}
	ionViewWillEnter(){
		this.employeeServicesService.getEmployee(this.uid).subscribe(
			(data) =>{
				this.employee = data;
				this.center = this.employee.location;
			})
	}

	setAdmin(){
		const callable = this.functions.httpsCallable('setAdmin');
		const obs = callable(this.uid);
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

}
