import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	public authState=new Observable(state => {return state})

	constructor(
		private afAuth: AngularFireAuth,
		private storage:Storage,
		public router:Router,

		) { 
		this.afAuth.onAuthStateChanged((user) => {
			if (user) {
				user.getIdTokenResult().then(
					result=> {
						console.log("result",result);
						this.storage.set('claims', result.claims); 
						this.storage.set('loggedIn', true); 

					})
				console.log('initializeApp User is logged in');

			} else {
				this.storage.set('loggedIn', false); 
				console.log('User is not logged in');

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

	userDetails() {
		return this.afAuth.user
	}
}
