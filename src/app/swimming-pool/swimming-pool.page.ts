import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../models/swimming-pool';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import {Customer} from '../models/customer';

@Component({
	selector: 'app-swimming-pool',
	templateUrl: './swimming-pool.page.html',
	styleUrls: ['./swimming-pool.page.scss'],
})
export class SwimmingPoolPage implements OnInit {

	public poolId:string;
	public uid:string;
	public swimmingPool:SwimmingPool=new SwimmingPool();
	public customer:Customer = new Customer();

	constructor(
		private storage: Storage,
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase
		) { 
		
	}



	ngOnInit() {
		console.log("enter")

	}

	ionViewWillEnter(){
		this.ngOnInit()
		console.log("enter2")
		this.uid = this.activatedRoute.snapshot.paramMap.get('id')
		this.poolId = this.activatedRoute.snapshot.paramMap.get('sid');
		this.afDatabase.object<Customer>('customers/'+this.uid).valueChanges().subscribe(
			(data) =>{
				this.customer = data;
			})
		this.afDatabase.object<SwimmingPool>('pools/'+this.uid +'/'+this.poolId).valueChanges().subscribe(
			(data) =>{
				this.swimmingPool = data;
				this.storage.set('currentPool',{uid:this.uid, poolId:this.poolId,swimmingPool:this.swimmingPool }); 
			})

		this.afDatabase.object<SwimmingPool>('pools/'+this.uid +'/'+this.poolId).valueChanges().subscribe(
			(data) =>{
				this.swimmingPool = data;
			})

	}

}
