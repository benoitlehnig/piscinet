import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service'
import {Visit} from '../../models/Visit';


@Component({
	selector: 'app-observation',
	templateUrl: './observation.page.html',
	styleUrls: ['./observation.page.scss'],
})
export class ObservationPage implements OnInit {

	visit:Visit=new Visit();
	constructor(
		public dataSharingService:DataSharingService
		) { }

	ngOnInit() {
		let sub = this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
            this.visit = visit;
        });
	}
	ionViewWillLeave(){
		this.saveObservation();		
	}
	ionViewWillEnter(){
		
	}
	saveObservation(){
		this.dataSharingService.someDataChanges(this.visit);

	}

}
