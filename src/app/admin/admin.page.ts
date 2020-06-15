import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Company} from '../models/company';
import { AuthenticationService } from '../services/authentication.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

	public company:Company = new Company();

	public accountID='piscinet'
	constructor(
		private afs: AngularFirestore,
		public authService:AuthenticationService,

		) { }

	ngOnInit() {
		
		this.afs.doc<Company>('accounts/'+this.accountID).valueChanges().subscribe(
			(data)=>{
				this.company = data;
				console.log(this.company);
			})
	}

	saveConfiguration(){
		this.afs.collection<Company>('accounts').doc(this.accountID).set(this.company);
	}


}
