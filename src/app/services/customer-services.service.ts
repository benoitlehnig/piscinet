import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Customer} from '../models/customer';
import { map } from 'rxjs/operators';
import {SwimmingPool} from '../models/swimming-pool';
import {AuthenticationService} from './authentication.service'

@Injectable({
	providedIn: 'root'
})
export class CustomerServicesService {

	public accountId:string="piscinet";

	constructor(
		public afDatabase: AngularFireDatabase,
		public authenticationService: AuthenticationService,
		) {
		this.authenticationService.getClaimsChanges().subscribe(
			data=>{
				console.log("claims",data);
				if(data !==null){
					if(data['accountId'] !== null){
						this.accountId=data['accountId'];
					} 
				}
				
			})
		
	}

	getCustomers(){

		return this.afDatabase.list<Customer>(this.accountId+'/customers',ref => ref.orderByChild('lastName')).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val(), class:'visible' }))
				)
			);
	}
	getCustomer(uid){
		console.log(this.accountId);
		return this.afDatabase.object<Customer>(this.accountId+'/customers/'+uid).valueChanges()
	}
	getCustomerPools(uid){
		return this.afDatabase.list<SwimmingPool>(this.accountId+'/pools/',ref => ref.orderByChild('customerUid').equalTo(uid)).snapshotChanges().pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
	}


}
