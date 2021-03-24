import { Component, OnInit ,Input} from '@angular/core';
import { NavParams} from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerService } from '../../../../services/customer.service'
import {Customer} from '../../../../models/customer';

@Component({
	selector: 'app-select-customer',
	templateUrl: './select-customer.component.html',
	styleUrls: ['./select-customer.component.scss'],
})
export class SelectCustomerComponent implements OnInit {

	public customers;
	public searchTerm:string ="";
	public selectedCustomerKey:string="";
	public selectedCustomer:Customer= new Customer() ;
	public selectedPoolKey:string="";
	public selectedCustomerPools=[];
	public step:number=0;
	@Input("homeref") value;

	constructor(
		public customerService: CustomerService,
		public navParams : NavParams
		) { }

	ngOnInit() {
		this.customers = this.customerService.getCustomers();
	}

	selectCustomer(customer){
		console.log(customer);
		let swimmingPools = this.customerService.getCustomerPools(customer.key).subscribe(
			data =>{
				if(data.length >1){
					this.selectedCustomerPools = data;
					this.selectedCustomerKey= customer.key
				}
				else{
					if(data[0] !==undefined){
						console.log("customer", customer);
						if(customer.data.typeOfContract==='full'){
							this.selectCustomerAndPool(customer,data[0]);
						}

						else if(customer.data.typeOfContract==='technical'){
							this.navParams.get('homeref').selectCustomer(customer.key, data[0].key,"technical")

						}
						else if(customer.data.typeOfContract==='seasonal'){
							this.navParams.get('homeref').selectCustomer(customer.key, data[0].key,"adhoc")

						}						
					}
				}
				swimmingPools.unsubscribe();
			})
	}

	selectCustomerAndPool(customer,pool){
		console.log("customer", customer)
		this.selectedCustomerKey = customer.key;
		this.selectedCustomer= customer.data;
		this.selectedPoolKey = pool.key;
		this.step =1;
	}
	
	startVisitCreation(visitType){
		this.navParams.get('homeref').selectCustomer(this.selectedCustomerKey, this.selectedPoolKey,visitType)


	}
	async filterList(evt) {
		this.searchTerm = evt.srcElement.value;
	}

	customerSelection(){
		this.step =0;
	}

}
