import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

	constructor(
		private activatedRoute: ActivatedRoute,
		public db: AngularFireDatabase
		) { }

	ngOnInit() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		console.log(this.uid);
		
	}
	ionViewWillEnter(){
		this.db.object<Employee>('employees/'+this.uid).valueChanges().subscribe(
			(data) =>{
				this.employee = data;
				console.log(this.employee);
			})

	}

}
