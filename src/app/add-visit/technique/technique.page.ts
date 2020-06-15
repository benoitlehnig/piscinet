import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service'
import {Visit} from '../../models/visit';


@Component({
	selector: 'app-technique',
	templateUrl: './technique.page.html',
	styleUrls: ['./technique.page.scss'],
})
export class TechniquePage implements OnInit {

	
	visit:Visit=new Visit();
	constructor(
		public dataSharingService:DataSharingService
		) { }


	ngOnInit() {
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			console.log("visit technique:", visit)
            this.visit = visit;
        });
	}

	ionViewWillLeave(){
		this.saveTechnical();
	}
	
	ionViewWillEnter(){
		
	}
	saveTechnical(){
		this.dataSharingService.someDataChanges(this.visit);
	}
}
