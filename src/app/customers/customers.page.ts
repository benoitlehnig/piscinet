import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Customer} from '../models/customer';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { DataSharingService } from '../services/data-sharing.service'
import { CustomerServicesService } from '../services/customer-services.service'


@Component({
	selector: 'app-customers',
	templateUrl: './customers.page.html',
	styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
	public customers;
	public claims;

	constructor(
		public authenticationService:AuthenticationService,
		public dataSharingService:DataSharingService,
		public customerServicesService:CustomerServicesService

		) { 

	}

	ngOnInit() {
		this.customers = this.customerServicesService.getCustomers();
		this.customers.subscribe(
			data=> this.dataSharingService.currentCustomers(data));
		this.claims = this.authenticationService.getClaims();

	}

	

}
