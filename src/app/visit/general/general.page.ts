import { Component, OnInit } from '@angular/core';
import {Visit} from '../../models/visit';
import { DataSharingService } from '../../services/data-sharing.service'
import {Customer} from '../../models/customer';
import {Employee} from '../../models/employee';
import { CustomerServicesService } from '../../services/customer-services.service'
import { EmployeeServicesService } from '../../services/employee-services.service'


@Component({
	selector: 'app-general',
	templateUrl: './general.page.html',
	styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {


	public visit:Visit = new Visit();

	public customer:Customer= new Customer()
	public employee:Employee= new Employee()

	constructor(
		public dataSharingService:DataSharingService,
		public customerServicesService: CustomerServicesService,
		public employeeServicesService: EmployeeServicesService,
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
			this.employeeServicesService.getEmployee(visit.employeeUid).subscribe(
				(data2) =>{
					if(data2!==null)
					{
						this.employee = data2
					}
				});
			this.customerServicesService.getCustomer(visit.customerUid).subscribe(
				(data3) =>{
					this.customer = data3;
				});
		});
	}

}
