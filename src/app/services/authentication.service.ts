import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import {DataSharingService} from './data-sharing.service';
import {CustomerService} from './customer.service';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	public authState=new Observable(state => {return state})
	public user: Observable<firebase.User>;
	public claims:{[key: string]: any}
	private claimsDataSource = new BehaviorSubject(null);
	private claimsChanges = this.claimsDataSource.asObservable();
	constructor(
		private afAuth: AngularFireAuth,
		private storage:Storage,
		public router:Router,
		public angularFireAnalytics:AngularFireAnalytics,
		public dataSharingService:DataSharingService,
		public customerService:CustomerService,
		private functions: AngularFireFunctions,

		) { 
		this.user = this.afAuth.authState;

		this.afAuth.onAuthStateChanged((user) => {
			if (user) {
				user.getIdTokenResult().then(
					result=> {

						this.claims = result.claims;
						this.claimsDataSource.next(this.claims);
						this.storage.set('accountId', result.claims['accountId']);
						this.dataSharingService.currentAccountID(result.claims['accountId']);
						this.angularFireAnalytics.logEvent('login', {accountId:  result.claims['accountId']});
						this.storage.set('claims', result.claims);
						this.storage.set('loggedIn', true); 
						if(this.claims['customer']){
							this.customerService.getCustomerFromUid(result.claims.user_id).subscribe(
								data=>{
									console.log("onAuthStateChanged", data)
									if(data[0]){
										this.dataSharingService.currentCustomer(data[0]);
										this.router.navigateByUrl('/customerPortal');

									}
								})
						}
						else if(this.claims['admin'] ===true || this.claims['employee'] ===true || this.claims['superAdmin'] ===true){
							this.router.navigateByUrl('/customers');
						}
					})
			} else {
				console.log("user not logged in auth")	 
			}
		});
	}


	getClaims(){
		return this.claims;
	}
	getClaimsChanges(){
		return this.claimsChanges;
	}
	getClaimsObservable(){
		return this.afAuth.onAuthStateChanged((user) => {
			if (user) {
				return user.getIdTokenResult().then(
					result=> {
						return result.claims;
					})
			}
		});
	}

	registerUser(value) {
		return new Promise<any>((resolve, reject) => {

			this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
			.then(
				res => resolve(res),
				err => reject(err))
		})

	}

	getAuthenticated(): boolean {
		return this.authState !== null;
	}


	loginUser(form) {
		return new Promise<any>((resolve, reject) => {
			console.log("form: ", form.value)
			this.afAuth.signInWithEmailAndPassword(form.value.email, form.value.password)
			.then(
				res => {
					this.storage.set('loggedIn', true); 
					resolve(res);
				},
				err => reject(err))
		})
	}

	logoutUser() {
		return new Promise((resolve, reject) => {
			if (this.afAuth.currentUser) {
				this.afAuth.signOut()
				.then(() => {
					console.log("LOG Out");
					this.storage.set('loggedIn', false); 

					this.router.navigate(['/login']);
					resolve();
				}).catch((error) => {
					reject();
				});
			}
		})
	}
	resetPassword(email: string) {
		return this.afAuth.sendPasswordResetEmail(email)
		.then(() => console.log("email sent"))
		.catch((error) => console.log(error))
	}
	userDetails() {
		return this.afAuth.user
	}

	
	


}
