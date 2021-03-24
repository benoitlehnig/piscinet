import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CmsService {

	constructor(
		private afs: AngularFirestore
		) { }

	getCGU(){
		const cguCollection = this.afs.collection<any>('CGU');
		return cguCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				console.log("OK CGU")
				const data = a.payload.doc.data() as any;
				const id = a.payload.doc.id;
				return { id, ...data };
			})))
	}
}
