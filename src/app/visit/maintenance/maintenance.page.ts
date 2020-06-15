import { Component, OnInit } from '@angular/core';
import {Visit} from '../../models/visit';
import { DataSharingService } from '../../services/data-sharing.service'

@Component({
	selector: 'app-maintenance',
	templateUrl: './maintenance.page.html',
	styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

	public visit:Visit = new Visit();
	constructor(
		public dataSharingService:DataSharingService

		) {
		this.visit = new Visit();		
	}


	ngOnInit() {
		

	}
	ionViewWillEnter(){
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			this.visit = visit
		});
	}
}
