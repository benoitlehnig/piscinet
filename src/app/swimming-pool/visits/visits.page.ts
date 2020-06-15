import { Component, OnInit } from '@angular/core';
import { VisitServicesService } from '../../services/visit-services.service';
import {Visit} from '../../models/visit';
import { DataSharingService } from '../../services/data-sharing.service'

@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

	public visits;
	public poolId:string;
	public uid:string;

	constructor(
		public visitServicesService: VisitServicesService,
		public dataSharingService:DataSharingService

		) 
	{ }

	ngOnInit() {
		let sub = this.dataSharingService.getCurrentPoolChanges().subscribe(
			data => {
				console.log("getCurrentPoolChanges visitPage",data)
				if(data){
					this.poolId = data.poolId;
					this.uid = data.uid;
					this.init();
				}
			});	
	}
	onViewWillEnter(){

		
	}
	init(){
		this.visits = this.visitServicesService.getVisitsByPool(this.poolId,100);
	}



}
