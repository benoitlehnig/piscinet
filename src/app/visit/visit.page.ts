import { Component, OnInit } from '@angular/core';
import {Visit} from '../models/Visit';
import {Customer} from '../models/customer';
import {Employee} from '../models/employee';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';
import { DataSharingService } from '../services/data-sharing.service'


@Component({
	selector: 'app-visit',
	templateUrl: './visit.page.html',
	styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

	visit:Visit = new Visit();
	visitId:string="";
	public claims;
	public customerStringified = "";
	public mode = "online";

	customer:Customer= new Customer()
	employee:Employee= new Employee()
	swimmingPoolName:string="";
	constructor(
		private activatedRoute: ActivatedRoute,
		public db: AngularFireDatabase,
		private storage: Storage,
		public authenticationService:AuthenticationService,
		public dataSharingService:DataSharingService


		) {

	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			if( params['mode']){
				console.log("parms", params['mode'])
				this.mode =  params['mode'];
			}
			
		});
		this.visitId = this.activatedRoute.snapshot.paramMap.get('vid');
		this.claims = this.authenticationService.getClaims();
		console.log("this.claims",this.claims)
		if(this.mode ==='online'){
			this.db.object<Visit>('visits/'+this.visitId).valueChanges().subscribe(
				(data) =>{
					this.visit = data;
					this.db.object<Employee>('employees/'+data.employeeUid).valueChanges().subscribe(
						(data2) =>{
							this.employee = data2
						});
					this.db.object<Customer>('customers/'+data.customerUid).valueChanges().subscribe(
						(data3) =>{
							this.customer = data3;
							this.customerStringified = JSON.stringify(data3);
						});
					this.dataSharingService.someDataChanges(this.visit);
					
				
				})
		}
		else{
			this.storage.get('offlineVisits').then(
				data => {
					this.visit = data[this.visitId];
					this.dataSharingService.someDataChanges(this.visit);
				}) 
		}
	}
	ionViewWillEnter(){

		

	}

}
