import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {SwimmingPool} from '../../../models/swimming-pool';
import {Customer} from '../../../models/customer';

import { PoolServicesService } from '../../../services/pool-services.service';
import {AppConstants } from '../../../app-constants';

@Component({
	selector: 'app-add-swimming-pool',
	templateUrl: './add-swimming-pool.page.html',
	styleUrls: ['./add-swimming-pool.page.scss'],
})
export class AddSwimmingPoolPage implements OnInit {


	public uid:string;
	public poolId:string;
	public mode:string='add';
	public swimmingPool:SwimmingPool= new SwimmingPool();
	public customer:Customer=new Customer();
	public successAddText:string="";
	public successUpdateText:string="";
	public loadingText:string="";
	public loading;
	public sandfilterPressureSteps = this.appConstants.sandfilterPressureSteps;

	constructor(
		private functions: AngularFireFunctions,
		public navCtrl: NavController,
		private activatedRoute: ActivatedRoute,
		public poolServicesService: PoolServicesService,
		public toastController: ToastController,
		public translateService : TranslateService,
		private storage: Storage,
		public loadingController: LoadingController,
		public appConstants:AppConstants,
		)
	{ }

	ionViewWillEnter(){
		this.uid = this.activatedRoute.snapshot.paramMap.get('id')
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			this.customer =  JSON.parse(params['customer']);
			if(this.mode ==="update"){
				this.poolId = this.activatedRoute.snapshot.paramMap.get('sid')
				this.poolServicesService.getSwimmingPool(this.poolId).subscribe(
					(data) =>{
						this.swimmingPool = data;
					})
			}
		});
		this.translateService.get(['ADDSWIMMINGPOOL.SuccessAdd', 'ADDSWIMMINGPOOL.SuccessUpdate','COMMON.Loading']).subscribe(
			value => {
				this.successAddText = value['ADDSWIMMINGPOOL.SuccessAdd']
				this.successUpdateText = value['ADDSWIMMINGPOOL.SuccessUpdate'];
				this.loadingText = value['COMMON.Loading'];
			});


	}
	ngOnInit() {

	}

	addSwimmingPool(){
		this.swimmingPool.customerUid = this.uid;
		const callable = this.functions.httpsCallable('addSwimmingPool');
		const obs = callable(this.swimmingPool);
		obs.subscribe(res => {
			this.presentToast();
			this.navCtrl.navigateRoot(['customers/'+this.uid]);
			this.loading.dismiss();
		});	
	}

	updateSwimmingPool(){
		let swimmingPoolToUpdate={'customerUid':this.uid, 'poolId':this.poolId, 'value' : this.swimmingPool};
		const callable = this.functions.httpsCallable('updateSwimmingPool');
		const obs = callable(swimmingPoolToUpdate);
		obs.subscribe(async res => {
			this.presentToast();
			this.loading.dismiss();
			this.storage.set('currentPool',{uid:this.uid, poolId:this.poolId,swimmingPool:this.swimmingPool }); 
			this.navCtrl.navigateRoot(['/customers/'+this.uid+'/swimming-pool/'+this.poolId]);
		});
		
	}
	async submitForm(){
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 5000
		});
		this.loading.present();
		if(this.mode ==='add'){
			this.addSwimmingPool()
		}
		if(this.mode ==='update'){
			this.updateSwimmingPool()
		}
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

	savePressure(value){
		this.swimmingPool.cleanFilterPressure =value;
	}
}

