import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {Visit} from '../../../../models/visit';
import {Customer} from '../../../../models/customer';
import {Employee} from '../../../../models/employee';
import { DataSharingService } from '../../../../services/data-sharing.service'
import { CustomerService } from '../../../../services/customer.service'
import { EmployeeService } from '../../../../services/employee.service'


@Component({
	selector: 'app-general',
	templateUrl: './general.page.html',
	styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {


	public visit:Visit = new Visit();

	public customer:Customer= new Customer()
	public employee:Employee= new Employee()

	public visitChangesSub: Subscription = new Subscription();
	public customerChangesSub: Subscription = new Subscription();
	public employeeChangesSub: Subscription = new Subscription();


	constructor(
		public dataSharingService:DataSharingService,
		public customerService: CustomerService,
		public employeeService: EmployeeService,
		) {
		this.visit = new Visit();	
		this.customer= new Customer()
		this.employee= new Employee()
	}

	ngOnInit() {
	}
	ionViewWillEnter(){
		this.dataSharingService.currentSomeDataChanges.subscribe(visit => {
			this.visit = visit;
			this.employeeChangesSub = this.employeeService.getEmployee(visit.employeeUid).subscribe(
				(data2) =>{
					if(data2!==null)
					{
						this.employee = data2
					}
				});
			this.customerChangesSub = this.customerService.getCustomer(visit.customerUid).subscribe(
				(data3) =>{
					this.customer = data3;
				});
		});
	}

	ionViewWillLeave(){
		this.visitChangesSub.unsubscribe();
		this.employeeChangesSub.unsubscribe();
		this.customerChangesSub.unsubscribe();
	}
	

}
