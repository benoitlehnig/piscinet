import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Company} from '../models/company';
import { AuthenticationService } from '../services/authentication.service';
import { EmployeeService } from '../services/employee.service'
import {Employee} from '../models/employee';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

	public company:Company = new Company();
	public pushNotifAllVisitSubscription:boolean=false;
	public accountID='piscinet';
	public uid:string ="";
	constructor(
		private afs: AngularFirestore,
		public authService:AuthenticationService,
		public employeeService:EmployeeService,
		private functions: AngularFireFunctions,

		) { }

	ngOnInit() {
		
		this.afs.doc<Company>('accounts/'+this.accountID).valueChanges().subscribe(
			(data)=>{
				this.company = data;
				console.log(this.company);
			})
		this.authService.userDetails().subscribe( (data)=>{
			this.uid = data.uid;
			console.log(this.uid)
			this.employeeService.getEmployee(this.uid).subscribe(
				employee =>{
					if( employee !==null){
						this.pushNotifAllVisitSubscription = employee.pushNotifAllVisitSubscription;

					}
				})
		});
	}

	saveConfiguration(){
		this.afs.collection<Company>('accounts').doc(this.accountID).set(JSON.parse( JSON.stringify(this.company)));
	}

	subscribeNewVisit(){
		const callable = this.functions.httpsCallable('subscribeAllNewVisits');
		const obs = callable({'uid': this.uid, 'status':this.pushNotifAllVisitSubscription});
		obs.subscribe(res => {
			console.log(res);
		});
	}
}
