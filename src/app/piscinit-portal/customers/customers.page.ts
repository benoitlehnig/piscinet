import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { DataSharingService } from '../../services/data-sharing.service'
import { CustomerService } from '../../services/customer.service'
import { Subscription } from 'rxjs';



@Component({
	selector: 'app-customers',
	templateUrl: './customers.page.html',
	styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
	
	public customers;
	public claims:{[key: string]: any}={'admin':false}

	public customersChangesSub: Subscription = new Subscription();
	public claimsChangesSub: Subscription = new Subscription();

	constructor(
		public authenticationService:AuthenticationService,
		public dataSharingService:DataSharingService,
		public customerService:CustomerService
		) { 

	}
	ngOnInit(){}

	ionViewWillEnter() {
		this.customersChangesSub = this.customerService.getCustomers().subscribe(
			data=> {
				this.dataSharingService.currentCustomers(data);
				this.customers = data;
			}
			);
		
		this.claimsChangesSub = this.authenticationService.getClaimsChanges().subscribe(
			data=>{
				if(data !==null){
					this.claims = data;
				}
			});
			
	}
	
	ionViewWillLeave(){
		this.customersChangesSub.unsubscribe();
		this.claimsChangesSub.unsubscribe();
	}

	

}
