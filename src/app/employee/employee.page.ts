import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthenticationService } from '../services/authentication.service';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Employee} from '../models/employee';

@Component({
	selector: 'app-employee',
	templateUrl: './employee.page.html',
	styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

	public uid:string;
	public claims;
	employee: Employee = new Employee();
	center: google.maps.LatLngLiteral;
	options: google.maps.MapOptions = {
		mapTypeId: 'hybrid',
		
		minZoom: 8
	}
	constructor(
		private activatedRoute: ActivatedRoute,
		public db: AngularFireDatabase,
		private functions: AngularFireFunctions,
		public authenticationService:AuthenticationService

		) { }

	ngOnInit() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		this.claims = this.authenticationService.getClaims();

		
	}
	ionViewWillEnter(){
		this.db.object<Employee>('employees/'+this.uid).valueChanges().subscribe(
			(data) =>{
				this.employee = data;
				this.center = this.employee.location;
			})

	}

	setAdmin(){
		const callable = this.functions.httpsCallable('setAdmin');
		const obs = callable(this.uid);
		obs.subscribe(async res => {
		});
	}

}
