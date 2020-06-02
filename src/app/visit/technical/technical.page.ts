import { Component, OnInit } from '@angular/core';
import {Visit} from '../../models/Visit';
import { DataSharingService } from '../../services/data-sharing.service'


@Component({
	selector: 'app-technical',
	templateUrl: './technical.page.html',
	styleUrls: ['./technical.page.scss'],
})
export class TechnicalPage implements OnInit {

	public visit:Visit = new Visit();
	constructor(
		public dataSharingService:DataSharingService

		) { }

	ngOnInit() {
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			this.visit = visit
		});
	}
	ionViewWillEnter(){
		
	}

}
