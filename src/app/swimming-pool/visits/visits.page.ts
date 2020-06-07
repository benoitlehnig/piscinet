import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import {Visit} from '../../models/Visit';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { uniq, flatten } from 'lodash'
import { DataSharingService } from '../../services/data-sharing.service'

@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

	public visits: Observable<any>;
	public poolId:string;
	public uid:string;

	constructor(
		public afDatabase: AngularFireDatabase,
		private functions: AngularFireFunctions,
		public dataSharingService:DataSharingService

		) 
	{ }

	ngOnInit() {
		let sub = this.dataSharingService.getCurrentPoolChanges().subscribe(
			data => {
				console.log("getCurrentPoolChanges visitPage",data)
				if(data){
					this.poolId = data.poolId;
					this.uid = data.uid;
					this.init();
				}
			});	
	}
	onViewWillEnter(){

		
	}
	init(){
		this.visits = this.afDatabase.list<Visit>('visits',ref => ref.orderByChild('poolId').equalTo(this.poolId).limitToLast(100)).snapshotChanges()
		.pipe(

			switchMap(visits => {
				const customerUids = uniq(visits.map(visit  => visit.payload.val().customerUid));
				const employeeUids = uniq(visits.map(visit => visit.payload.val().employeeUid));
				return combineLatest(
					of(visits.reverse()),
					combineLatest(
						customerUids.map(customerUid =>
							this.afDatabase.object<any>('customers/'+customerUid).valueChanges().pipe(
								map(customer => ({uid:customerUid, data:customer}))
								)
							)
						) as any,
					combineLatest(
						employeeUids.map(employeeUid =>
							
							this.afDatabase.object<any>('employees/'+employeeUid).valueChanges().pipe(
								map(employee => ({uid:employeeUid, data:employee}))
								)
							)
						)

					)  as any
			}),
			map(([visits, customers,employees]) => {
				console.log(visits,customers,employees);
				return visits.map(visit => {

					return {

						...(visit.payload.val() as object)  ,
						visitKey: visit.key,
						customer: customers.find(a => a.uid === visit.payload.val().customerUid),
						employee: employees.find(a => a.uid === visit.payload.val().employeeUid)
					}
				})
			})
			)

	}



}
