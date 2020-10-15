import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,AngularFireObject  } from '@angular/fire/database';
import {DataSharingService} from './data-sharing.service';
import {Contact} from '../models/contact';
import { map } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class MessageServicesService {

	public accountId:string="piscinet";


	constructor(
		public afDatabase: AngularFireDatabase,
		public dataSharingService: DataSharingService,
		) 
	{ 
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
	getMessages(){
		return this.afDatabase.list<Contact>( this.accountId+'/messages', ref => ref.orderByChild('dateTimeLogged').limitToLast(100)).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
	}

	getMessage(uid){
		return this.afDatabase.list<Contact>( this.accountId+'/messages/'+uid, ref => ref.orderByChild('dateTimeLogged').limitToLast(100)).snapshotChanges()
		.pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
	}
}
