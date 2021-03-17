import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { DataSharingService } from '../services/data-sharing.service'
import { CustomerServicesService } from '../services/customer-services.service'
import { Subscription } from 'rxjs';



@Component({
	selector: 'app-customers',
	templateUrl: './customers.page.html',
	styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
	
	public customers;
	public claims;

	public customersChangesSub: Subscription = new Subscription();

	constructor(
		public authenticationService:AuthenticationService,
		public dataSharingService:DataSharingService,
		public customerServicesService:CustomerServicesService
		) { 

	}

	ngOnInit() {
		this.customersChangesSub = this.customerServicesService.getCustomers().subscribe(
			data=> {
				this.dataSharingService.currentCustomers(data);
				this.customers = data;
			}
		);
		this.claims = this.authenticationService.getClaims();

	}
	ngOnDestroy(){
		this.customersChangesSub.unsubscribe();
	}

	

}
