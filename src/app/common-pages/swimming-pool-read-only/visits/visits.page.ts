import { Component, OnInit } from '@angular/core';

import { VisitService } from '../../../services/visit.service';
import {Visit} from '../../../models/visit';
import { DataSharingService } from '../../../services/data-sharing.service'

@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

	public visits;
	public poolId:string;
	public routerLink:string="";

	constructor(
		public visitService: VisitService,
		public dataSharingService:DataSharingService

		) 
	{ }

	ngOnInit() {
		
	}
	ionViewWillEnter(){
		let sub = this.dataSharingService.getCurrentPoolChanges().subscribe(
			data => {
				if(data){
					this.poolId = data.poolId;
					this.visitService.getVisitsByPool(this.poolId,100).subscribe(data =>{
						this.visits = data;
					})
				}
			});	

		
	}

}
