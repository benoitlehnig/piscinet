import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service'
import {Visit} from '../../models/Visit';

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.page.html',
	styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

	visit: Visit = new Visit()
	constructor(
		public dataSharingService:DataSharingService
		) { }

	ngOnInit() {
		
	}
	ionViewWillLeave(){
		this.saveMaintenance();
	}
	ionViewWillEnter(){
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			console.log("visit maintenance:", visit)
            this.visit = visit
        });
		
		
	}

	saveMaintenance(){
		this.dataSharingService.someDataChanges(this.visit);
	}


}
