import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TranslateService} from '@ngx-translate/core';

import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import * as moment from 'moment';

import {Visit} from '../../models/visit';
import {Customer} from '../../models/customer';
import {Employee} from '../../models/employee';
import {SwimmingPool} from '../../models/swimming-pool';
import { CustomerService } from '../../services/customer.service'
import { EmployeeService } from '../../services/employee.service'
import { PoolService } from '../../services/pool.service'
import { VisitService } from '../../services/visit.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DataSharingService } from '../../services/data-sharing.service'

@Component({
	selector: 'visit-read-only',
	templateUrl: './visit-read-only.page.html',
	styleUrls: ['./visit-read-only.page.scss'],
})
export class VisitReadOnlyPage implements OnInit {

	public visit:Visit = new Visit();

	@Input("visitId") public  visitId;

	public customerUid:string="";
	public customer:Customer= new Customer()
	public employeeUid:string="";
	public employee:Employee= new Employee()
	public poolId:string="";
	public swimmingPool:SwimmingPool = new SwimmingPool();


	public poolChangesSub: Subscription = new Subscription();
	public visitChangesSub: Subscription = new Subscription();
	public employeeChangesSub: Subscription = new Subscription();
	public customerChangesSub: Subscription = new Subscription();

	constructor(
		private activatedRoute: ActivatedRoute,
		public customerService: CustomerService,
		public employeeService: EmployeeService,
		public poolService: PoolService,
		public visitService: VisitService,
		private storage: Storage,
		public dataSharingService:DataSharingService,
		) {
		this.dataSharingService.someDataChanges(this.visit);
	}

	ngOnInit(){}

	ionViewWillEnter() {
		this.visitId = this.activatedRoute.snapshot.paramMap.get('vid');
		this.visitChangesSub = this.visitService.getVisit(this.visitId).subscribe(
			(data) =>{
				this.visit = data;
				this.employeeUid = data.employeeUid;
				this.customerUid = data.customerUid;
				this.poolId = data.poolId;
				this.employeeChangesSub = this.employeeService.getEmployee(this.employeeUid).subscribe(
					(data2) =>{
						this.employee = data2
					});
				this.poolChangesSub = this.poolService.getSwimmingPool(this.poolId).subscribe(
					(data4) =>{
						this.swimmingPool = data4;
						this.dataSharingService.currentPool(this.swimmingPool);
					});
				this.dataSharingService.someDataChanges(this.visit);

			})
	}
	ionViewWillLeave(){
		this.poolChangesSub.unsubscribe();
		this.visitChangesSub.unsubscribe();
		this.employeeChangesSub.unsubscribe();
		this.customerChangesSub.unsubscribe();
	}
	
}
