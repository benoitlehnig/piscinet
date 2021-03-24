import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { PopoverController } from '@ionic/angular';

import { AuthenticationService } from '../../../services/authentication.service';
import { EmployeeService } from '../../../services/employee.service'
import {Employee} from '../../../models/employee';
import { Observable } from 'rxjs';
import { PopoverComponent } from './popover/popover.component';
import {TranslateService} from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-employee',
	templateUrl: './employee.page.html',
	styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

	public uid:string;
	public claims:{[key: string]: any}={'admin':false}
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

	public employeesChangesSub: Subscription = new Subscription();


	constructor(
		private activatedRoute: ActivatedRoute,
		public employeeService: EmployeeService,
		private functions: AngularFireFunctions,
		public authenticationService:AuthenticationService,
		public popoverController: PopoverController,
		public translateService : TranslateService,
		public navCtrl: NavController,
		public toastController: ToastController,
		public loadingController: LoadingController
		) { }

	ngOnInit() {
		
	}
	ionViewWillEnter(){
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		this.claims = this.authenticationService.getClaims();
		this.translateService.get(['EMPLOYEE.EmailSent', 'EMPLOYEE.SuccessDeleteText','COMMON.Loading']).subscribe(
			value => {
				this.emailSentText = value['EMPLOYEE.EmailSent'];
				this.successDeleteText = value['EMPLOYEE.SuccessDeleteText'];
				this.loadingText = value['COMMON.Loading'];
			});
		this.employeesChangesSub = this.employeeService.getEmployee(this.uid).subscribe(
			(data) =>{
				if(data){
					this.employee = data;
					this.center = this.employee.location;
					this.mapOK = true;
				}
			})
	}
	ionViewWillLeave(){
		this.employeesChangesSub.unsubscribe();
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
	
	async presentToast() {
		let message = this.employee.firstName +" "+ this.employee.lastName +" "+ this.successDeleteText;
		
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}

	sendEmailUserCreation(){
		let employee:any = this.employee;
		employee.userRecordUid = this.uid;
		let email={'customer':this.employee, 'uid': this.uid};
		const callable = this.functions.httpsCallable('sendUserCreationEmail');
		const obs = callable(email);
		obs.subscribe(async res => {
			this.popoverController.dismiss();
		});
	}

	async removeEmployee(){
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 5000
		});
		this.loading.present();
		const callable = this.functions.httpsCallable('deleteEmployee');
		const obs = callable(this.uid);
		obs.subscribe(async res => {
			this.popoverController.dismiss();
			this.presentToast();
			this.loading.dismiss();
			this.navCtrl.navigateRoot(['piscinistPortal/employees/']);

		});

	}

}
