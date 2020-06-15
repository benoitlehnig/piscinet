import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Customer} from '../models/customer';
import { map } from 'rxjs/operators';
import {SwimmingPool} from '../models/swimming-pool';

@Injectable({
	providedIn: 'root'
})
export class CustomerServicesService {

	constructor(
		public afDatabase: AngularFireDatabase,
		) { }

	getCustomers(){
		return this.afDatabase.list<Customer>('/customers',ref => ref.orderByChild('lastName')).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val(), class:'visible' }))
				)
			);
	}
	getCustomer(uid){
		return this.afDatabase.object<Customer>('customers/'+uid).valueChanges()
	}
	getCustomerPools(uid){
		return this.afDatabase.list<SwimmingPool>('/pools/',ref => ref.orderByChild('customerUid').equalTo(uid)).snapshotChanges().pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
	}


}
