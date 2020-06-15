import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { uniq, flatten } from 'lodash'
import {SwimmingPool} from '../models/swimming-pool';

@Injectable({
  providedIn: 'root'
})
export class PoolServicesService {

  constructor(
  	public afDatabase: AngularFireDatabase,
  	) { }

  getSwimmingPool(id){
  	 return this.afDatabase.object<SwimmingPool>('pools/'+id).valueChanges()
  }

  getPoolsWithCustomers(){
  	return this.afDatabase.list<SwimmingPool>('pools').snapshotChanges()
		.pipe(
			switchMap(pools => {
				const customerUids = uniq(pools.map(pool  => pool.payload.val().customerUid));
				return combineLatest(
					of(pools),
					combineLatest(
						customerUids.map(customerUid =>
							this.afDatabase.object<any>('customers/'+customerUid).valueChanges().pipe(
								map(customer => ({uid:customerUid, data:customer}))
								)
							)
						) as any,
					)  as any
			}),
			map(([pools, customers]) => {
				console.log(pools,customers);
				return pools.map(pool => {
					return {
						...(pool.payload.val() as object)  ,
						poolKey: pool.key,
						customer: customers.find(a => a.uid === pool.payload.val().customerUid),
					}
				})
			})
			);
  }
}
