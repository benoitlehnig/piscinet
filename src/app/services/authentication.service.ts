import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	public authState;
	constructor(
		private afAuth: AngularFireAuth,
		private storage:Storage,
		public router:Router,

		) { }

	registerUser(value) {
		return new Promise<any>((resolve, reject) => {

			this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
			.then(
				res => resolve(res),
				err => reject(err))
		})

	}

	loginUser(form) {
		return new Promise<any>((resolve, reject) => {
			console.log("form: ", form.value)
			this.afAuth.signInWithEmailAndPassword(form.value.email, form.value.password)
			.then(
				res => {
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
