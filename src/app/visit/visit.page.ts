import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/visit';
import {Customer} from '../models/customer';
import {Employee} from '../models/employee';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { CustomerServicesService } from '../services/customer-services.service'
import { EmployeeServicesService } from '../services/employee-services.service'
import { VisitServicesService } from '../services/visit-services.service';

import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';
import { DataSharingService } from '../services/data-sharing.service'
import { AngularFireFunctions } from '@angular/fire/functions';
import { LoadingController } from '@ionic/angular';
import { TranslateService} from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { SelectCustomerComponent } from './select-customer/select-customer.component';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

	visit:Visit = new Visit();
	visitId:string="";
	public claims;
	public customerStringified = "";
	public mode = "online";
	public loading;
	public customer:Customer= new Customer()
	public employee:Employee= new Employee()
	public swimmingPoolName:string="";
	public successUploadText:string="";
	public loadingText:string="";
	public editEligibility : boolean=true;


	constructor(
		private activatedRoute: ActivatedRoute,
		public customerServicesService: CustomerServicesService,
		public employeeServicesService: EmployeeServicesService,
		public visitServicesService: VisitServicesService,
		private storage: Storage,
		public authenticationService:AuthenticationService,
		public dataSharingService:DataSharingService,
		private functions: AngularFireFunctions,
		public navCtrl: NavController,
		public loadingController: LoadingController,
		public translateService : TranslateService,
		public toastController: ToastController,
		public modalController: ModalController
		) {
		this.visit = new Visit();
		this.customer= new Customer()
		this.employee= new Employee()
		this.dataSharingService.someDataChanges(this.visit);
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			if( params['mode']){
				console.log("parms", params['mode'])
				this.mode =  params['mode'];
			}
			
		});
		this.visitId = this.activatedRoute.snapshot.paramMap.get('vid');
		this.claims = this.authenticationService.getClaims();
		if(this.mode ==='online'){
			this.visitServicesService.getVisit(this.visitId).subscribe(
				(data) =>{
					this.visit = data;
					this.editEligibility = (
						this.claims['admin']===true || 
						(this.claims['employee'] ===true && moment().diff(this.visit.dateTime,'hours') <3)
						);
					this.employeeServicesService.getEmployee(data.employeeUid).subscribe(
						(data2) =>{
							if(data2!==null)
							{
								this.employee = data2
							}
						});
					this.customerServicesService.getCustomer(data.customerUid).subscribe(
						(data3) =>{
							this.customer = data3;
							this.customerStringified = JSON.stringify(data3);
						});
					this.dataSharingService.someDataChanges(this.visit);
				})
		}
		else{
			this.storage.get('offlineVisits').then(
				data => {
					let offlineVisits= JSON.parse(data);
					this.visit = offlineVisits[this.visitId];
					if(this.visit.customerUid !==""){
						this.customerServicesService.getCustomer(this.visit.customerUid).subscribe(
							(data3) =>{
								this.customer = data3;
								this.customerStringified = JSON.stringify(data3);
							});
					}
					this.dataSharingService.someDataChanges(this.visit);
				}) 
		}
		this.translateService.get(['ADDVISIT.SuccessUploadText','COMMON.Loading']).subscribe(
			value => {
				// value is our translated string
				this.loadingText = value['COMMON.Loading'];
				this.successUploadText = value['ADDVISIT.SuccessUploadText'];
			});

	}
	ionViewWillEnter(){

		

	}

	async uploadVisit(){
		if(this.visit.customerUid !=="" && this.visit.poolId !==""){

			this.loading = await this.loadingController.create({
				cssClass: 'my-custom-class',
				message: this.loadingText,
				duration: 5000
			});
			this.loading.present();
			
			const callable = this.functions.httpsCallable('addVisit');
			const obs = callable(this.visit);
			obs.subscribe(res => {
				this.navCtrl.navigateRoot(['customers/'+this.visit.customerUid +'/swimming-pool/'+this.visit.poolId]);
				this.storage.get('offlineVisits').then(
					data =>{
						const outputArray = []
						let newOfflineVisits = JSON.parse(data);
						for(let i = 0; i < newOfflineVisits.length; i++)
							if(i!= Number(this.visitId)) {
								outputArray.push(newOfflineVisits[i])
							}
							this.storage.set('offlineVisits', JSON.stringify(outputArray))  ;
							this.dataSharingService.offlineVisitNumberDataChanges(outputArray);
							this.presentToast();
							this.loading.dismiss();
						});
			});
			
		}
		else{
			this.presentModal();
		}
	}
	async presentToast() {
		let message = this.successUploadText;
		
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}
	async presentModal() {
		const modal = await this.modalController.create({
			component: SelectCustomerComponent,
			componentProps: {homeref:this},
			cssClass: 'modal'
		});
		return await modal.present();
	}
	selectCustomer(customerUid, poolId){
		this.modalController.dismiss();
		this.visit.customerUid = customerUid;
		this.visit.poolId = poolId;
		if(this.visit.customerUid !=="" && this.visit.poolId !==""){
			this.uploadVisit()
		}
		
		
	}
}
