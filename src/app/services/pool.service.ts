import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { uniq, flatten } from 'lodash'

import {SwimmingPool} from '../models/swimming-pool';
import {Picture} from '../models/swimming-pool';
import {DataSharingService} from './data-sharing.service';

@Injectable({
	providedIn: 'root'
})
export class PoolService {

	public accountId:string="";

	constructor(
		public afDatabase: AngularFireDatabase,
		public dataSharingService: DataSharingService,

		) { 
		this.dataSharingService.getAccoundIDChanges().subscribe(
			data=>{
				if(data !==null){
					if(data['accountId'] !== null){
						this.accountId=data;
					} 
				}	
			})
	}

	getSwimmingPool(id){
		return this.afDatabase.object<SwimmingPool>(this.accountId+'/pools/'+id).valueChanges()
	}

	getSwimmingPoolStatistics(id,statisticName){
		return this.afDatabase.list<any>(this.accountId+"/statistics/"+id+"/"+statisticName,ref => ref.orderByChild('date'))
		.snapshotChanges().pipe(
			map(changes => 
				changes.map(c => ({ label: c.payload.val().date, value: c.payload.val().value }))
				)
			);
	}
	getSwimmingPoolPictures(id){
		return this.afDatabase.list<Picture>(this.accountId+'/pools/'+id+'/pictures/').snapshotChanges().pipe(
			map(pictures => 
				pictures.map(picture => ({ id: picture.payload.key, data: picture.payload.val() }))
				)
			);
	}
	

		

	getPoolsWithCustomers(){
		return this.afDatabase.list<SwimmingPool>(this.accountId+'/pools').snapshotChanges()
		.pipe(
			switchMap(pools => {
				const customerUids = uniq(pools.map(pool  => pool.payload.val().customerUid));
				return combineLatest(
					of(pools),
					combineLatest(
						customerUids.map(customerUid =>
							this.afDatabase.object<any>(this.accountId+'/customers/'+customerUid).valueChanges().pipe(
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
