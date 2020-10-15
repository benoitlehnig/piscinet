import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service'
import {Visit} from '../../models/visit';
import {SwimmingPool} from '../../models/swimming-pool';
import {AppConstants } from '../../app-constants';

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.page.html',
	styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

	public visit: Visit = new Visit()
	public swimmingPool:SwimmingPool=new SwimmingPool();
	public sandfilterPressureSteps = this.appConstants.sandfilterPressureSteps;
	public lastMaintenance={sandfilterPressure:{pressure:0}};

	constructor(
		public dataSharingService:DataSharingService,
		public appConstants:AppConstants,
		) { 
	}

	ngOnInit() {

	}
	ionViewWillLeave(){
		this.saveMaintenance();
	}
	ionViewWillEnter(){
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			this.visit = visit;

		});
		this.dataSharingService.getCurrentPoolChanges().subscribe(swimmingPool =>{
			this.swimmingPool = swimmingPool;
			console.log("lastMaintenance", swimmingPool.lastMaintenance)
				if(swimmingPool.lastMaintenance){
					this.lastMaintenance = swimmingPool.lastTechnique
				}
		})	
	}

	saveMaintenance(){
		this.dataSharingService.someDataChanges(this.visit);
	}
	savePressure(value){
		console.log("savePressure" , value)
		this.visit.maintenance.sandfilterPressure =value;
		this.saveMaintenance();
	}


}
