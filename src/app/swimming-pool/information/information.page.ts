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
		) { }

	ngOnInit() {

	}
	ionViewWillEnter(){

		this.storage.get("currentPool").then((val) => {
			this.poolId = val.poolId;
			this.uid = val.uid;
			this.swimmingPool = val.swimmingPool;
		});

	}

}
