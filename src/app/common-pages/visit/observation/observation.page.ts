import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {Visit} from '../../../models/visit';
import { DataSharingService } from '../../../services/data-sharing.service'

@Component({
	selector: 'app-observation',
	templateUrl: './observation.page.html',
	styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {

	public visitChangesSub: Subscription = new Subscription();
	public visit:Visit = new Visit();
	
	constructor(
		public dataSharingService:DataSharingService
		) {

	}

	ngOnInit() {
		
	}
	ionViewWillEnter(){
		this.visitChangesSub= this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			this.visit = visit
		});
	}

	ionViewWillLeave(){
		this.visitChangesSub.unsubscribe();
	}
}
