import { Component, OnInit } from '@angular/core';
import {Visit} from '../../models/visit';
import { DataSharingService } from '../../services/data-sharing.service'
import {SwimmingPool} from '../../models/swimming-pool';
import {AppConstants } from '../../app-constants';

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.page.html',
	styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

	public visit:Visit = new Visit();
	public swimmingPool:SwimmingPool = new SwimmingPool();
	public sandfilterPressureSteps = this.appConstants.sandfilterPressureSteps;

	constructor(
		public dataSharingService:DataSharingService,
		public appConstants:AppConstants


		) {
		this.visit = new Visit();		
	}


	ngOnInit() {
		

	}
	ionViewWillEnter(){
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			this.visit = visit
		});
		this.dataSharingService.getCurrentPoolChanges().subscribe(swimmingPool => {
			this.swimmingPool = swimmingPool;
			console.log("swimmingPool", swimmingPool)
		});
	}
}
