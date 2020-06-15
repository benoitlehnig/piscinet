import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { uniq, flatten } from 'lodash';
import {Employee} from '../models/employee';
import {SwimmingPool} from '../models/swimming-pool';
import {Visit} from '../models/visit';
import * as moment from 'moment';


@Injectable({
	providedIn: 'root'
})
export class VisitServicesService {

	constructor(
		public afDatabase: AngularFireDatabase
		) { }


	getVisitsByPool(poolId,visitNumber){
		return this.afDatabase.list<Visit>('visits',ref => ref.orderByChild('poolId').equalTo(poolId).limitToLast(visitNumber)).snapshotChanges()
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
		return this.afDatabase.object<Visit>('visits/'+visitId).valueChanges();
	}

	getVisitsSinceMonth(numberOfMonth,visitNumber){
		let lastMonth = moment().subtract(numberOfMonth, 'months').format();

		return this.afDatabase.list<Visit>('visits',ref => ref.orderByChild('dateTime').startAt(lastMonth).limitToLast(visitNumber)).snapshotChanges()
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
