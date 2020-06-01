import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';

import {SwimmingPool} from '../models/swimming-pool';
import {Customer} from '../models/customer';

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
	public customer:Customer=new Customer();

	constructor(
		private functions: AngularFireFunctions,
		public navCtrl: NavController,
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase,
		public toastController: ToastController,
		public translateService : TranslateService,
		private storage: Storage,

		)
	{ }

	ionViewWillEnter(){
		this.uid = this.activatedRoute.snapshot.paramMap.get('id')
		console.log("this.uid : ",this.uid);
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			this.customer =  JSON.parse(params['customer']);
			console.log("this.customer",this.customer)
			console.log("this.customer",this.customer.firstName)

			if(this.mode ==="update"){
				this.poolId = this.activatedRoute.snapshot.paramMap.get('sid')
				this.afDatabase.object<SwimmingPool>('pools/'+this.uid +'/'+this.poolId).valueChanges().subscribe(
					(data) =>{
						this.swimmingPool = data;
					})
			}
		});

	}
	ngOnInit() {

		this.translateService.get(['ADDSWIMMINGPOOL.SuccessAdd', 'ADDSWIMMINGPOOL.SuccessUpdate']).subscribe(
			value => {
				// value is our translated string
				console.log(value);
				this.successAddText = value['ADDSWIMMINGPOOL.SuccessAdd']
				this.successUpdateText = value['ADDSWIMMINGPOOL.SuccessUpdate'];
			});
	}

	addSwimmingPool(){
		this.swimmingPool.customerUid = this.uid;
		const callable = this.functions.httpsCallable('addSwimmingPool');
		const obs = callable(this.swimmingPool);

		obs.subscribe(res => {
			this.presentToast();
			this.navCtrl.navigateRoot(['customers/'+this.uid]);

		});
		
	}

	updateSwimmingPool(){
		let swimmingPoolToUpdate={'customerUid':this.uid, 'poolId':this.poolId, 'value' : this.swimmingPool};
		const callable = this.functions.httpsCallable('updateSwimmingPool');
		const obs = callable(swimmingPoolToUpdate);

		obs.subscribe(async res => {
			this.presentToast();
			this.storage.set('currentPool',{uid:this.uid, poolId:this.poolId,swimmingPool:this.swimmingPool }); 
			this.navCtrl.navigateRoot(['/customers/'+this.uid+'/swimming-pool/'+this.poolId]);
		});
		
	}
	submitForm(){
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

}

