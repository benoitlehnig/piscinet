import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TranslateService} from '@ngx-translate/core';

import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import * as moment from 'moment';

import {Visit} from '../../../models/visit';
import {Customer} from '../../../models/customer';
import {Employee} from '../../../models/employee';
import {SwimmingPool} from '../../../models/swimming-pool';
import { CustomerService } from '../../../services/customer.service'
import { EmployeeService } from '../../../services/employee.service'
import { PoolService } from '../../../services/pool.service'
import { VisitService } from '../../../services/visit.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { DataSharingService } from '../../../services/data-sharing.service'
import { SelectCustomerComponent } from './select-customer/select-customer.component';

@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

	public visit:Visit = new Visit();
	public visitId:string="";
	public claims:{[key: string]: any}={'admin':false}
	public customerStringified = "";
	public swimmingPoolStringified = "";
	public mode = "online";
	public loading;
	public customerUid:string="";
	public customer:Customer= new Customer()
	public employeeUid:string="";
	public employee:Employee= new Employee()
	public poolId:string="";
	public swimmingPool:SwimmingPool = new SwimmingPool();
	public swimmingPoolName:string="";
	public successUploadText:string="";
	public loadingText:string="";
	public editEligibility : boolean=true;

	public poolChangesSub: Subscription = new Subscription();
	public employeeChangesSub: Subscription = new Subscription();
	public customerChangesSub: Subscription = new Subscription();



	constructor(
		private activatedRoute: ActivatedRoute,
		public customerService: CustomerService,
		public employeeService: EmployeeService,
		public poolService: PoolService,
		public visitService: VisitService,
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
		this.dataSharingService.someDataChanges(this.visit);
	}

	ngOnInit(){}

	ionViewWillEnter() {
		this.activatedRoute.params.subscribe(params => {
			if( params['mode']){
				this.mode =  params['mode'];
			}
			
		});
		this.visitId = this.activatedRoute.snapshot.paramMap.get('vid');
		this.claims = this.authenticationService.getClaims();
		if(this.mode ==='online'){;
			this.visitService.getVisit(this.visitId).subscribe(
				(data) =>{
					this.visit = data;
					this.employeeUid = data.employeeUid;
					console.log(" data, this.customerUid", data.customerUid)
					this.customerUid = data.customerUid;
					this.poolId = data.poolId;
					this.editEligibility = (
						this.claims['admin']===true || 
						(this.claims['employee'] ===true && moment().diff(this.visit.dateTime,'hours') <3)
						);
					this.employeeChangesSub = this.employeeService.getEmployee(this.employeeUid).subscribe(
						(data2) =>{
							this.employee = data2
						});
					this.poolChangesSub = this.poolService.getSwimmingPool(this.poolId).subscribe(
						(data4) =>{
							this.swimmingPool = data4;
							this.dataSharingService.currentPool(this.swimmingPool);
						});
					this.dataSharingService.someDataChanges(this.visit);

					this.getCustomerData();
				})
		}
		else{
			this.storage.get('offlineVisits').then(
				data => {
					let offlineVisits= JSON.parse(data);
					this.visit = offlineVisits[this.visitId];
					this.customerUid = this.visit.customerUid;
					this.getCustomerData();
					this.dataSharingService.someDataChanges(this.visit);					
				}) 
		}

		this.translateService.get(['ADDVISIT.SuccessUploadText','COMMON.Loading']).subscribe(
			value => {
				this.loadingText = value['COMMON.Loading'];
				this.successUploadText = value['ADDVISIT.SuccessUploadText'];
			});

	}
	ionViewWillLeave(){
		this.poolChangesSub.unsubscribe();
		this.employeeChangesSub.unsubscribe();
		this.customerChangesSub.unsubscribe();
	}

	getCustomerData(){
		if(this.customerUid !==""){
			this.customerChangesSub = this.customerService.getCustomer(this.customerUid).subscribe(
				(data3) =>{
					console.log(" this.customerUid", data3)
					this.customer = data3;
					this.customerStringified = JSON.stringify(data3);
				});
		}
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
				this.navCtrl.navigateRoot(['piscinistPortal/customers/'+this.visit.customerUid +'/swimming-pool/'+this.visit.poolId]);
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
