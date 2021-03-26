import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Company} from '../models/company';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AccountService {


	constructor(
		private afs: AngularFirestore
		) { }

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
		return this.afs.doc<Company>('accounts/'+id).valueChanges()
	}

	accountExists(account:Company){
		return this.afs.collection<Company>('accounts', ref => ref.where('account', '==', account.siretNumber) )   
	}

	saveAccount(accountID,account){
		this.afs.collection<Company>('accounts').doc(accountID).set(JSON.parse( JSON.stringify(account)));

	}

}
