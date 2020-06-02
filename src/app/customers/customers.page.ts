import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Customer} from '../models/customer';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';


@Component({
	selector: 'app-customers',
	templateUrl: './customers.page.html',
	styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
	public customers;
	public claims;
	public searchTerm:string ="";

	constructor(
		public afDatabase: AngularFireDatabase,
		private functions: AngularFireFunctions,
		public authenticationService:AuthenticationService,
		public storage :Storage

		) { 

	}

	ngOnInit() {
		this.customers = this.afDatabase.list<Customer>('/customers',ref => ref.orderByChild('lastName')).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val(), class:'visible' }))
				)
			);
		this.claims = this.authenticationService.getClaims();

	}

	async filterList(evt) {
		this.searchTerm = evt.srcElement.value;
	}

	

}
