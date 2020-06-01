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


@Component({
	selector: 'app-add-visit',
	templateUrl: './add-visit.page.html',
	styleUrls: ['./add-visit.page.scss'],
})
export class AddVisitPage implements OnInit {

	newVisit:Visit = new Visit();
	customer:any;
	swimmingPoolName:string="";
	public successAddText:string="";
	public successUpdateText:string="";
	public loadingText:string="";
	public loading;
	public mode :string='online';

	constructor(
		private storage: Storage,
		private functions: AngularFireFunctions,
		private activatedRoute: ActivatedRoute,
		public navCtrl: NavController,
		public authService:AuthenticationService,
		public loadingController: LoadingController,
		public translateService : TranslateService,
		public toastController: ToastController,

		) {
		this.newVisit.customerUid = this.activatedRoute.snapshot.paramMap.get('id');
		this.newVisit.poolId =this.activatedRoute.snapshot.paramMap.get('sid');
		this.newVisit.employeeUid ="";
		this.authService.userDetails().subscribe( (data)=>{
			this.newVisit.employeeUid = data.uid
			storage.set('newVisit', this.newVisit); 
		});
	}


	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			if(params['mode'] ){
				if(params['mode'] ==='offline'){
					this.mode ='offline';
					this.customer = new Customer();
				}
			}
			if(this.mode ==='online'){
				this.customer =  JSON.parse(params['customer']);
				this.swimmingPoolName =  params['swimmingPoolName'];
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

		this.storage.get('newVisit').then((val) => {
			val.dateTime = moment().format();
			if(this.mode ==='online'){
				const callable = this.functions.httpsCallable('addVisit');
				const obs = callable(val);

				obs.subscribe(res => {
					this.navCtrl.navigateRoot(['customers/'+this.newVisit.customerUid +'/swimming-pool/'+this.newVisit.poolId]);

				});
			}
			else{
				this.storage.get('offlineVisits').then((offlineVal) => {
					console.log("offlineVal", offlineVal);
					if(offlineVal===null){
						this.storage.set('offlineVisits', [val])
					}
					else{
						offlineVal.push(val);
						this.storage.set('offlineVisits', offlineVal);
					}
				});

			}
			
			
		});
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 5000
		});
		this.loading.present();

	}

}
