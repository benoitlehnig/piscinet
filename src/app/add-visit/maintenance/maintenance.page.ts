import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service'
import {Visit} from '../../models/visit';
import {SwimmingPool} from '../../models/swimming-pool';

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.page.html',
	styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

	public visit: Visit = new Visit()
	public swimmingPool:SwimmingPool=new SwimmingPool();
	constructor(
		public dataSharingService:DataSharingService,
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
		})	
	}

	saveMaintenance(){
		this.dataSharingService.someDataChanges(this.visit);
	}


}
