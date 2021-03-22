import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { uniq, flatten } from 'lodash';
import {Employee} from '../models/employee';
import {SwimmingPool} from '../models/swimming-pool';
import {Visit} from '../models/visit';
import * as moment from 'moment';
import {DataSharingService} from './data-sharing.service';
import {EmployeeService} from './employee.service';


@Injectable({
	providedIn: 'root'
})
export class VisitService {

	public accountId:string="piscinet";

	constructor(
		public afDatabase: AngularFireDatabase,
		public dataSharingService: DataSharingService,
		public employeeService: EmployeeService,
		) {
		
		this.dataSharingService.getAccoundIDChanges().subscribe(
			data=>{
				console.log("accountId",data);
				if(data !==null){
					if(data['accountId'] !== null){
						this.accountId=data;
					} 
				}	
			})
	}


	getVisitsByPool(poolId,visitNumber){
		return this.afDatabase.list<Visit>(this.accountId+'/visits',ref => ref.orderByChild('poolId').equalTo(poolId).limitToLast(visitNumber))
		.snapshotChanges()
		.pipe(
			switchMap(visits => {
				const customerUids = uniq(visits.map(visit  => visit.payload.val().customerUid));
				const employeeUids = uniq(visits.map(visit => visit.payload.val().employeeUid));
				return combineLatest(
					of(visits.reverse()),
					combineLatest(
						customerUids.map(customerUid =>
							this.afDatabase.object<any>(this.accountId+'/customers/'+customerUid).valueChanges().pipe(
								map(customer => ({uid:customerUid, data:customer}))
								)
							)
						) as any,
					combineLatest(
						employeeUids.map(employeeUid =>
							this.afDatabase.object<any>(this.accountId+'/employees/'+employeeUid).valueChanges().pipe(
								map(employee => ({uid:employeeUid, data:employee}))
								)
							)
						)
					)  as any
			}),
			map(([visits, customers,employees]) => {
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

	getVisit(visitId){
		return this.afDatabase.object<Visit>(this.accountId+'/visits/'+visitId).valueChanges()
	}
	
	

	getVisitsSinceMonth(numberOfMonth,visitNumber){
		let lastMonth = moment().subtract(numberOfMonth, 'months').format();

		return this.afDatabase.list<Visit>(this.accountId+'/visits',ref => ref.orderByChild('dateTime').startAt(lastMonth).limitToLast(visitNumber)).snapshotChanges()
		.pipe(
			switchMap(visits => {
				const customerUids = uniq(visits.map(visit  => visit.payload.val().customerUid));
				const employeeUids = uniq(visits.map(visit => visit.payload.val().employeeUid));
				return combineLatest(
					of(visits.reverse()),
					combineLatest(
						customerUids.map(customerUid =>
							this.afDatabase.object<any>(this.accountId+'/customers/'+customerUid).valueChanges().pipe(
								map(customer => ({uid:customerUid, data:customer}))
								)
							)
						) as any,
					combineLatest(
						employeeUids.map(employeeUid =>
							this.afDatabase.object<any>(this.accountId+'/employees/'+employeeUid).valueChanges().pipe(
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
