import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import {Visit} from '../../../../models/visit';
import { DataSharingService } from '../../../../services/data-sharing.service'
import {AppConstants } from '../../../../app-constants';

@Component({
	selector: 'app-technical',
	templateUrl: './technical.page.html',
	styleUrls: ['./technical.page.scss'],
})
export class TechnicalPage implements OnInit {

	public visitChangesSub: Subscription = new Subscription();


	public visit:Visit = new Visit();
	public chloreSteps= this.appConstants.chloreSteps;
	public PHSteps= this.appConstants.PHSteps;

	constructor(
		public dataSharingService:DataSharingService,
		public appConstants:AppConstants

		) { }

	ngOnInit() {
		
	}
	ionViewWillEnter(){
		this.visitChangesSub = this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			this.visit = visit;
		});
		
	}
	ionViewWillLeave(){
		this.visitChangesSub.unsubscribe();
	}


}
