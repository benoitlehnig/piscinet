import { Component, OnInit } from '@angular/core';
import { EmployeeServicesService } from '../services/employee-services.service'
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
		public employeeServicesService: EmployeeServicesService,
		private functions: AngularFireFunctions,
		public authenticationService:AuthenticationService


		) { }

	ngOnInit() {
		this.employees = this.employeeServicesService.getEmployees();
		this.claims = this.authenticationService.getClaims();
	}

}
