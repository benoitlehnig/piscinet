import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import {Visit} from '../models/Visit';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { uniq, flatten } from 'lodash'
import * as moment from 'moment';

@Component({
	selector: 'app-visits',
	templateUrl: './visits.page.html',
	styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

	public visits: Observable<any>;

	constructor(
		public afDatabase: AngularFireDatabase,
		private functions: AngularFireFunctions
		) 
	{ }

	ngOnInit() {
		/*this.visits = this.afDatabase.list('/visits').snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			)

		console.log(this.visits);
		*/
    let lastMonth = moment().subtract(1, 'months').format();
		this.visits = this.afDatabase.list<Visit>('visits',ref => ref.orderByChild('dateTime').startAt(lastMonth)).snapshotChanges()
      .pipe(

        switchMap(visits => {
        	console.log(visits);
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
