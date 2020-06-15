import { Component, OnInit,Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { DataSharingService } from '../../services/data-sharing.service'
import {Visit} from '../../models/visit';


@Component({
	selector: 'app-confirmation',
	templateUrl: './confirmation.component.html',
	styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {

	@Input("homeref") value;
	public generalStatusKO:boolean=false;
	public issueDescription:string="" ;
	visit: Visit = new Visit()
	issues=[];

	constructor(
		public navParams : NavParams,
		public dataSharingService:DataSharingService

		)
	{ }


	ngOnInit() {}

	ionViewWillEnter(){
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			console.log("visit ConfirmationComponent:", visit)
			this.visit = visit;
		});
		
		
	}

	confirm(){
		this.visit.issueDescription= this.issueDescription;
		this.visit.generalStatusKO= this.generalStatusKO;
		this.dataSharingService.someDataChanges(this.visit);
		this.navParams.get('homeref').addVisit();
	}
	cancel(){
		this.navParams.get('homeref').closePopover();
	}


}
