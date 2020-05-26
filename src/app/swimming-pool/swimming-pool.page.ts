import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../models/swimming-pool';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-swimming-pool',
	templateUrl: './swimming-pool.page.html',
	styleUrls: ['./swimming-pool.page.scss'],
})
export class SwimmingPoolPage implements OnInit {

	public poolId:string;
	public uid:string;
	public swimmingPool:SwimmingPool=new SwimmingPool();

	constructor(
		private storage: Storage,
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase
		) { }

	

	ngOnInit() {
		
	}

	ionViewWillEnter(){
		this.activatedRoute.params.subscribe(params => {
			this.uid = params['uid'];
			this.poolId = params['poolId'];
			console.log("this.uid ", this.uid, "this.poolId ",this.poolId);

			this.afDatabase.object<SwimmingPool>('pools/'+this.uid +'/'+this.poolId).valueChanges().subscribe(
				(data) =>{
					this.swimmingPool = data;
					console.log(data);
					this.storage.set('currentPool',{uid:this.uid, poolId:this.poolId,swimmingPool:this.swimmingPool }); 
				})
		});
		this.afDatabase.object<SwimmingPool>('pools/'+this.uid +'/'+this.poolId).valueChanges().subscribe(
			(data) =>{
				this.swimmingPool = data;
			})
	}

}
