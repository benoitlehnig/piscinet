import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service'
import {Employee} from '../../models/employee';
import { AuthenticationService } from '../../services/authentication.service';

import { Subscription } from 'rxjs';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.page.html',
	styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {


	public employees =[];
	public claims:{[key: string]: any}={'admin':false}

	public employeesChangesSub: Subscription = new Subscription();

	constructor(
		public employeeService: EmployeeService,
		public authenticationService:AuthenticationService
		) { }

	ngOnInit(){}

	ionViewWillEnter() {
		this.employeesChangesSub = this.employeeService.getEmployees().subscribe(
			data =>{
				this.employees = data;
			});
		this.claims = this.authenticationService.getClaims();
	}

	ionViewWillLeave(){
		this.employeesChangesSub.unsubscribe();
	}

}
