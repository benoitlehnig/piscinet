import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Visit} from '../models/visit';
import {Customer} from '../models/customer';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { LoadingController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { VisitServicesService } from '../services/visit-services.service';
import { DataSharingService } from '../services/data-sharing.service'
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import {SwimmingPool} from '../models/swimming-pool';


@Component({
	selector: 'app-add-visit',
	templateUrl: './add-visit.page.html',
	styleUrls: ['./add-visit.page.scss'],
})
export class AddVisitPage implements OnInit {

	newVisit:Visit = new Visit();
	customer:Customer = new Customer();
	swimmingPool:SwimmingPool= new SwimmingPool();
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
		public visitServicesService: VisitServicesService,
		public dataSharingService:DataSharingService,
		public modalController: ModalController
		) {

	}
	ionViewWillEnter(){


	}

	ngOnInit() {
		this.createOnline$().subscribe(isOnline => this.offline = !isOnline);
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			if(params['offline'] ){
				this.offline =params['offline'];
			}
			if(params['visitID'] ){
				this.visitId = params['visitID']
			}
			if(params['visitType'] ){
				this.newVisit.typeOfVisit =params['visitType'];
			}
			if(params['swimmingPoolStringified']){
				this.swimmingPool =  JSON.parse(params['swimmingPoolStringified']); 
				this.dataSharingService.currentPool(this.swimmingPool);
			}
			if(params['customer']){
				this.customer =  JSON.parse(params['customer']); 
			}
			this.authService.userDetails().subscribe( (data)=>{
				this.newVisit.employeeUid = data.uid	
				if(this.offline ===false){
					if(this.mode !=='update'){
						this.newVisit.customerUid = this.activatedRoute.snapshot.paramMap.get('id');
						this.newVisit.poolId =this.activatedRoute.snapshot.paramMap.get('sid');
						this.dataSharingService.someDataChanges(this.newVisit);					
					}
					else{
						this.visitServicesService.getVisit(this.visitId).subscribe(
							(data) =>{
								this.newVisit = data;
							});
					}	
				}
				else{
					this.dataSharingService.someDataChanges(this.newVisit);
				}
			});
			

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
		console.log("this.mode addVisit", this.mode)
		this.modalController.dismiss();
		if(this.mode !=='update'){
			let sub = this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
				visit.dateTime = moment().format();
				if(this.offline === false){
					const callable = this.functions.httpsCallable('addVisit');
					const obs = callable(visit);
					obs.subscribe(res => {
						this.navCtrl.navigateRoot(['customers/'+this.newVisit.customerUid +'/swimming-pool/'+this.newVisit.poolId]);
						this.presentToast();
						this.loading.dismiss();
						sub.unsubscribe();
					});
				}
				else{
					this.storage.get('offlineVisits').then((offlineVal) => {
						if(offlineVal===null){
							this.storage.set('offlineVisits', JSON.stringify([visit]));
						}
						else{
							let newOfflineData = JSON.parse(offlineVal);
							newOfflineData.push(visit);
							this.storage.set('offlineVisits',JSON.stringify(newOfflineData) );
							this.dataSharingService.offlineVisitNumberDataChanges(newOfflineData);
						}
						this.loading.dismiss();
						sub.unsubscribe();
						this.navCtrl.navigateRoot(['offlineVisits']);
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
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 10000
		});
		this.loading.present();
		
		

	}
	async presentToast() {
		let message = this.swimmingPool.name + " "+ this.successUpdateText;
		if(this.mode ==='add'){
			message = this.swimmingPool.name +" "+ this.successAddText;
		}
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}
	async presentModal() {
		const modal = await this.modalController.create({
			component: ConfirmationComponent,
			componentProps: {homeref:this},
			swipeToClose: true,

			cssClass: 'modal'
		});
		return await modal.present();
	}

	saveRequest(){
		this.presentModal();
	}
	closePopover(){
		this.modalController.dismiss();
	}

	createOnline$() {
		return merge<boolean>(
			fromEvent(window, 'offline').pipe(map(() => false)),
			fromEvent(window, 'online').pipe(map(() => true)),
			new Observable((sub: Observer<boolean>) => {
				sub.next(navigator.onLine);
				sub.complete();
			}));
	}

}
