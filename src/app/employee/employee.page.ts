import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';

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

		) { }

	ngOnInit() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		console.log(this.uid);
		
	}
	ionViewWillEnter(){
		this.db.object<Employee>('employees/'+this.uid).valueChanges().subscribe(
			(data) =>{
				this.employee = data;
				this.center = this.employee.location;
				console.log(this.center)
				console.log(this.employee);
			})

	}

	setAdmin(){
		const callable = this.functions.httpsCallable('setAdmin');
		const obs = callable(this.uid);
		obs.subscribe(async res => {
			console.log(res);
		});
	}

}
