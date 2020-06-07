import { Component, OnInit ,Input} from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
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
		public afDatabase: AngularFireDatabase,
		public navParams : NavParams
		) { }

	ngOnInit() {
		this.customers = this.afDatabase.list<Customer>('/customers',ref => ref.orderByChild('lastName')).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val(), class:'visible' }))
				)
			);
	}

	selectCustomer(customer){
		let swimmingPools = this.afDatabase.list('/pools/'+customer.key).snapshotChanges().pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val()}))
				)
			).subscribe(
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
