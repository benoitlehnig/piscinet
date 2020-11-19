import { Component, OnInit } from '@angular/core';
import {SwimmingPool} from '../../models/swimming-pool';
import { DataSharingService } from '../../services/data-sharing.service'
import {AppConstants } from '../../app-constants';

@Component({
	selector: 'app-information',
	templateUrl: './information.page.html',
	styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

	public poolId:string;
	public uid:string;
	public swimmingPool:SwimmingPool=new SwimmingPool();
	public sandfilterPressureSteps = this.appConstants.sandfilterPressureSteps;



	constructor(
		public dataSharingService:DataSharingService,
		public appConstants:AppConstants

		) { 
		this.swimmingPool= new SwimmingPool();
	}

	ngOnInit() {

	}
	ionViewWillEnter(){
		
		console.log(this.swimmingPool.shape)
		this.initData();

	}

	initData(){
		let sub = this.dataSharingService.getCurrentPoolChanges().subscribe(
			data => {
				if(data!=undefined){
					console.log("swimmingPool", data)
					this.poolId = data.poolId;
					this.uid = data.uid;
					this.swimmingPool = data.swimmingPool;
				}
			});
	}

}
