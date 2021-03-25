import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {Customer} from '../models/customer';
import {AppConstants } from '../app-constants';
import {DataSharingService} from '../services/data-sharing.service';
import {CustomerService} from '../services/customer.service';
import { AuthenticationService } from '../services/authentication.service';



@Component({
	selector: 'app-customer-portal',
	templateUrl: './customer-portal.page.html',
	styleUrls: ['./customer-portal.page.scss'],
})
export class CustomerPortalPage implements OnInit {

	public appPages =[];
	public selectedIndex:number = 0;

	public customer: Customer = new Customer();
	public customerChangesSub: Subscription = new Subscription();


	constructor(
		private appConstants: AppConstants,
		public router:Router,
		public dataSharingService:DataSharingService,
		public customerService:DataSharingService,
		public authenticationService:AuthenticationService,
		) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.appPages = this.appConstants.appCustomerPages;
		this.customerChangesSub = this.customerService.getCustomerChanges().subscribe(
			data =>{
				this.customer = data.data;
			})
	}

	ionViewWillLeave(){
		this.customerChangesSub.unsubscribe();
	}
	
	redirectTo(url,index){
		this.router.navigate([url]);
		this.selectedIndex = index;
	}
	logout(){
		this.authenticationService.logoutUser();
	}
}
