import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/Visit';
import {Customer} from '../models/customer';
import {Employee} from '../models/employee';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';


@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

	visit:Visit = new Visit();
	visitId:string="";
	customer:Customer= new Customer()
	employee:Employee= new Employee()
	swimmingPoolName:string="";
	constructor(
		private activatedRoute: ActivatedRoute,
		public db: AngularFireDatabase,
		private storage: Storage,


		) {

	}

	ngOnInit() {
		this.visitId = this.activatedRoute.snapshot.paramMap.get('vid');

	}
	ionViewWillEnter(){
		this.db.object<Visit>('visits/'+this.visitId).valueChanges().subscribe(
			(data) =>{
				this.visit = data;
				this.db.object<Employee>('employees/'+data.employeeUid).valueChanges().subscribe(
					(data2) =>{
						this.employee = data2
				});
				this.db.object<Customer>('customers/'+data.customerUid).valueChanges().subscribe(
					(data3) =>{
						this.customer = data3
				});
				this.storage.set('visit', this.visit); 
				console.log(" this.visit", this.visit );
			})

	}

}
