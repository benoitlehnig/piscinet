import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../../models/swimming-pool';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service'

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
		public dataSharingService:DataSharingService

		) { 
	}

	ngOnInit() {

	}
	ionViewWillEnter(){
		this.initData();
	}

	initData(){
		this.uid = this.activatedRoute.snapshot.paramMap.get('id')
		this.poolId = this.activatedRoute.snapshot.paramMap.get('sid')
		let sub = this.dataSharingService.getCurrentPoolChanges().subscribe(
			data => {
				if(data){console.log("getCurrentPoolChanges info",data, data.poolId)
					this.poolId = data.poolId;
				this.uid = data.uid;
				this.swimmingPool = data.swimmingPool;
				console.log(this.swimmingPool);
			}

		});

	}


}
