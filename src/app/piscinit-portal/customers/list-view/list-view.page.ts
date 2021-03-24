import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../../services/data-sharing.service'
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-list-view',
	templateUrl: './list-view.page.html',
	styleUrls: ['./list-view.page.scss'],
})
export class ListViewPage implements OnInit {

	public searchTerm:string ="";
	public customers;

	public customersChangesSub: Subscription = new Subscription();


	constructor(
		public dataSharingService:DataSharingService

		) { }

	ngOnInit() {}
	
	ionViewWillEnter() {
		this.customersChangesSub = this.dataSharingService.getCustomersChanges().subscribe(
			data => {
				if(data){
					this.customers = data;
				}
			});	
	}


	async filterList(evt) {
		this.searchTerm = evt.srcElement.value;
	}

	ionViewWillLeave(){
		this.customersChangesSub.unsubscribe();
	}

}
