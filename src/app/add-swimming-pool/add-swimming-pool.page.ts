import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { AngularFireDatabase } from '@angular/fire/database';

import {SwimmingPool} from '../models/swimming-pool';

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
	public successAddText:string="";
	public successUpdateText:string="";

	constructor(
		private functions: AngularFireFunctions,
		public navCtrl: NavController,
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase,
		public toastController: ToastController,
		public translateService : TranslateService
		)
	{ }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			this.uid=  params['uid'];
			if(this.mode ==="update"){
				this.poolId=  params['poolId'];
				this.afDatabase.object<SwimmingPool>('pools/'+this.uid +'/'+this.poolId).valueChanges().subscribe(
					(data) =>{
						this.swimmingPool = data;
					})
			}
		});
		this.translateService.get(['ADDSWIMMINGPOOL.SuccessAdd', 'ADDSWIMMINGPOOL.SuccessUpdate']).subscribe(
			value => {
				// value is our translated string
				console.log(value);
				this.successAddText = value['ADDSWIMMINGPOOL.SuccessAdd']
				this.successUpdateText = value['ADDSWIMMINGPOOL.SuccessUpdate'];
			});
	}

	addSwimmingPool(form){
		let swimmingPool = new SwimmingPool().deserialize(form.value);
		swimmingPool.customerUid = this.uid;
		const callable = this.functions.httpsCallable('addSwimmingPool');
		const obs = callable(swimmingPool);

		obs.subscribe(res => {
			this.presentToast();
			this.navCtrl.navigateRoot(['customer/'+this.uid]);

		});
		
	}

	updateSwimmingPool(form){
		let swimmingPool = new SwimmingPool().deserialize(form.value);
		console.log("swimmingPool", swimmingPool);
		let swimmingPoolToUpdate={'customerUid':this.uid, 'poolId':this.poolId, 'value' : swimmingPool};
		const callable = this.functions.httpsCallable('updateSwimmingPool');
		const obs = callable(swimmingPoolToUpdate);

		obs.subscribe(async res => {
			this.presentToast();
			console.log("this.uid",this.uid);
		this.navCtrl.navigateRoot(['swimming-pool/'+this.poolId, { uid: this.uid, poolId: this.poolId}]);
		});
		
	}
	submitForm(form){
		if(this.mode ==='add'){
			this.addSwimmingPool(form)
		}
		if(this.mode ==='update'){
			this.updateSwimmingPool(form)
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

}

