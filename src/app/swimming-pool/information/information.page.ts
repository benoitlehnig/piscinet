import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../../models/swimming-pool';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-information',
	templateUrl: './information.page.html',
	styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

	public poolId:string;
	public uid:string;
	public swimmingPool:SwimmingPool=new SwimmingPool();
	constructor(
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase,
		private storage: Storage,
		) { 
	}

	ngOnInit() {
		this.initData()

	}
	ionViewWillEnter(){
		this.activatedRoute.data.subscribe(
			(data) => this.initData())
	}

	initData(){
		this.uid = this.activatedRoute.snapshot.paramMap.get('id')
		this.poolId = this.activatedRoute.snapshot.paramMap.get('sid')
		this.storage.get("currentPool").then((val) => {
			console.log("currentPool",val);
			this.poolId = val.poolId;
			this.uid = val.uid;
			this.swimmingPool = val.swimmingPool;
		});

	}


}
