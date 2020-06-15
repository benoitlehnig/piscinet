import { Component, OnInit ,Input} from '@angular/core';
import { CustomerServicesService } from '../../services/customer-services.service'
import { Observable } from 'rxjs';
import {Customer} from '../../models/customer';
import { map } from 'rxjs/operators';
import { NavParams} from '@ionic/angular';

@Component({
	selector: 'app-select-customer',
	templateUrl: './select-customer.component.html',
	styleUrls: ['./select-customer.component.scss'],
})
export class SelectCustomerComponent implements OnInit {

	public customers;
	public searchTerm:string ="";
	public selectedCustomerKey:string="";
	public selectedCustomerPools=[];
	@Input("homeref") value;

	constructor(
		public customerServicesService: CustomerServicesService,
		public navParams : NavParams
		) { }

	ngOnInit() {
		this.customers = this.customerServicesService.getCustomers();
	}

	selectCustomer(customer){
		let swimmingPools = this.customerServicesService.getCustomerPools(+customer.key).subscribe(
			data =>{
				if(data.length >1){
					this.selectedCustomerPools = data;
					this.selectedCustomerKey= customer.key
				}
				else{
					this.navParams.get('homeref').selectCustomer(customer.key, data[0].key)
				}
				swimmingPools.unsubscribe();
			})
	}

	selectCustomerAndPool(customer,pool){
		this.navParams.get('homeref').selectCustomer(customer.key, pool.key)
	}
	
	async filterList(evt) {
		this.searchTerm = evt.srcElement.value;
	}

}
