import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Employee} from '../models/employee';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.page.html',
	styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {


	public employees: Observable<any>;
	public claims;
	constructor(
		public afDatabase: AngularFireDatabase,
		private functions: AngularFireFunctions,
		public authenticationService:AuthenticationService


		) { }

	ngOnInit() {
		this.employees = this.afDatabase.list('/employees', ref => ref.orderByChild('lastName')).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
		this.claims = this.authenticationService.getClaims();
	}

}
