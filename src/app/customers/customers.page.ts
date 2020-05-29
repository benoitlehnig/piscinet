import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Customer} from '../models/customer';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';


@Component({
	selector: 'app-customers',
	templateUrl: './customers.page.html',
	styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
	public customers;

	constructor(
		public afDatabase: AngularFireDatabase,
		private functions: AngularFireFunctions

		) { 

	}

	ngOnInit() {
		this.customers = this.afDatabase.list<Customer>('/customers',ref => ref.orderByChild('lastName')).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
		console.log(this.customers);
	}

	async filterList(evt) {
	
	
	}

	

}
