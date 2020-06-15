import { Component, OnInit } from '@angular/core';
import {Visit} from '../../models/visit';
import * as moment from 'moment';
import { DataSharingService } from '../../services/data-sharing.service'

@Component({
	selector: 'app-observation',
	templateUrl: './observation.page.html',
	styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {

	public visit:Visit = new Visit();
	constructor(
		public dataSharingService:DataSharingService


		) {

	}

	ngOnInit() {
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			this.visit = visit
		});
	}
	ionViewWillEnter(){
		
	}
}
