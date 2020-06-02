import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Visit} from '../models/Visit';
import {Customer} from '../models/customer';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataSharingService } from '../services/data-sharing.service'


@Component({
	selector: 'app-add-visit',
	templateUrl: './add-visit.page.html',
	styleUrls: ['./add-visit.page.scss'],
})
export class AddVisitPage implements OnInit {

	newVisit:Visit = new Visit();
	customer:Customer = new Customer();
	swimmingPoolName:string="";
	visitId:string="";
	public successAddText:string="";
	public successUpdateText:string="";
	public loadingText:string="";
	public loading;
	public mode :string='online';
	public offline	:boolean= false;

	constructor(
		private storage: Storage,
		private functions: AngularFireFunctions,
		private activatedRoute: ActivatedRoute,
		public navCtrl: NavController,
		public authService:AuthenticationService,
		public loadingController: LoadingController,
		public translateService : TranslateService,
		public toastController: ToastController,
		public afDatabase: AngularFireDatabase,
		public dataSharingService:DataSharingService

		) {

	}
	ionViewWillEnter(){


	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			console.log("parms", params['mode'])
			if(params['offline'] ){
				this.offline =params['offline'];
			}
			console.log(this.mode);
			if(this.offline ===false ){
				this.customer =  JSON.parse(params['customer']);
				this.swimmingPoolName =  params['swimmingPoolName'];
			}
			if(params['visitID'] ){
				this.visitId = params['visitID']
			}
			if(params['visitType'] ){
				this.newVisit.typeOfVisit =params['visitType'];
			}
			if(this.offline ===false){
				if(this.mode !=='update'){
					this.newVisit.customerUid = this.activatedRoute.snapshot.paramMap.get('id');
					this.newVisit.poolId =this.activatedRoute.snapshot.paramMap.get('sid');
					this.newVisit.employeeUid ="";
					this.authService.userDetails().subscribe( (data)=>{
						this.newVisit.employeeUid = data.uid
						this.dataSharingService.someDataChanges(this.newVisit);
					});
				}
				else{
					this.afDatabase.object<Visit>('visits/'+this.visitId).valueChanges().subscribe(
						(data) =>{
							this.newVisit = data;
							console.log("this.newVisit update mode",this.newVisit)
							this.dataSharingService.someDataChanges(this.newVisit);
						});
				}	
			}

		});
		this.translateService.get(['ADDVISIT.SuccessAdd', 'ADDVISIT.SuccessUpdate','COMMON.Loading']).subscribe(
			value => {
				// value is our translated string
				this.successAddText = value['ADDVISIT.SuccessAdd']
				this.successUpdateText = value['ADDVISIT.SuccessUpdate'];
				this.loadingText = value['COMMON.Loading'];
			});


	}
	async addVisit(){
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 5000
		});
		this.loading.present();
		if(this.mode !=='update'){
			let sub = this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
				visit.dateTime = moment().format();
				if(this.offline === false){
					const callable = this.functions.httpsCallable('addVisit');
					const obs = callable(visit);
					obs.subscribe(res => {
						this.navCtrl.navigateRoot(['customers/'+this.newVisit.customerUid +'/swimming-pool/'+this.newVisit.poolId]);
						this.presentToast();
						sub.unsubscribe();
						this.loading.dismiss();
					});
				}
				else{
					this.storage.get('offlineVisits').then((offlineVal) => {
						console.log("offlineVal", offlineVal);
						if(offlineVal===null){
							this.storage.set('offlineVisits', [visit])
						}
						else{
							offlineVal.push(visit);
							this.storage.set('offlineVisits', offlineVal);
						}
					});

				}
			});
		}
		if(this.mode==='update'){
			if(this.offline === false){
				let sub = this.dataSharingService.currentSomeDataChanges
				.subscribe(visit => {
					let visitToUpdate = {visitId: this.visitId, value:visit};
					const callable = this.functions.httpsCallable('updateVisit');
					const obs = callable(visitToUpdate);
					obs.subscribe(res => {
						this.navCtrl.navigateRoot(['customers/'+this.newVisit.customerUid +'/swimming-pool/'+this.newVisit.poolId]);
						this.presentToast();
						sub.unsubscribe();
						this.loading.dismiss();
					});
				});
			}
		}
		
		

	}
	async presentToast() {
		let message = this.swimmingPoolName + " "+ this.successUpdateText;
		if(this.mode ==='add'){
			message = this.swimmingPoolName +" "+ this.successAddText;
		}
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}

}
