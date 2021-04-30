import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {DataSharingService} from './data-sharing.service';


import {Company} from '../models/company';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	public accountId:string="piscinet";


	constructor(
		private afs: AngularFirestore,
		public dataSharingService: DataSharingService,

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

	getAcccounts(){
		const accountCollection = this.afs.collection<Company>('accounts');
		return accountCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Company;
				const id = a.payload.doc.id;
				return { id, ...data };
			})))
	}


	getAccount(id){
		console.log("getAccount", id)
		if(id !==null){
			return this.afs.doc<Company>('accounts/'+id).valueChanges()
		}
		else{
			return this.afs.doc<Company>('accounts/'+this.accountId).valueChanges()
		}
	}

	accountExists(account:Company){
		return this.afs.collection<Company>('accounts', ref => ref.where('account', '==', account.siretNumber) )   
	}

	saveAccount(accountID,account){
		if(accountID !==null){
			this.afs.collection<Company>('accounts').doc(accountID).set(JSON.parse( JSON.stringify(account)));
		}
		else{
			this.afs.collection<Company>('accounts').doc(this.accountId).set(JSON.parse( JSON.stringify(account)));
		}

	}

}
