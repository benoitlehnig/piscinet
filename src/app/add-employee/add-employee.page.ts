import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {Employee} from '../models/employee';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';


@Component({
	selector: 'app-add-employee',
	templateUrl: './add-employee.page.html',
	styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

	public mode:string="add";
	public employee:Employee = new Employee();
	public uid:string="";
	public successAddText:string="";
	public successUpdateText:string="";

	constructor(
		private functions: AngularFireFunctions,
		public navCtrl: NavController,
		private afAuth: AngularFireAuth,
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase,
		public toastController: ToastController,
		public translateService : TranslateService 
		) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			if(this.mode ==="update"){
				this.uid = params['uid'];
				this.afDatabase.object<Employee>('employees/'+this.uid).valueChanges().subscribe(
					(data) =>{
						this.employee = data;
					})
			}
		});
		this.translateService.get(['ADDEMPLOYEE.SuccessAdd', 'ADDEMPLOYEE.SuccessUpdate']).subscribe(
			value => {
				// value is our translated string
				console.log(value);
				this.successAddText = value['ADDEMPLOYEE.SuccessAdd']
				this.successUpdateText = value['ADDEMPLOYEE.SuccessUpdate'];
			});
	}


	addEmployee(form){
		let employee = new Employee().deserialize(form.value);
		this.afAuth.createUserWithEmailAndPassword(employee.email, 'totototo')
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(error)
		})
		.then( (user:any)=>
		{
			console.log(user);
			console.log(user.user);
			const uid = user.user.uid;
			console.log(uid);
			let employeeToAdd={'uid':uid, 'value' : employee};
			const callable = this.functions.httpsCallable('addEmployee');
			const obs = callable(employeeToAdd);

			obs.subscribe(async res => {
				this.presentToast();
				this.navCtrl.navigateRoot(['employee/'+uid]);
				console.log(employee.email, 'toto');

			});
		});
	}

	updateEmployee(form){
		let employee = new Employee().deserialize(form.value);
		console.log("employee", employee);
		let employeeToUpdatee={'uid':this.uid, 'value' : employee};
		const callable = this.functions.httpsCallable('updateEmployee');
		const obs = callable(employeeToUpdatee);

		obs.subscribe(async res => {
			this.presentToast();
			this.navCtrl.navigateRoot(['employee/'+this.uid]);
		});
	}

	submitForm(form){
		if(this.mode ==='add'){
			this.addEmployee(form)
		}
		if(this.mode ==='update'){
			this.updateEmployee(form)
		}
	}
	async presentToast() {
		let message = this.employee.firstName +" "+ this.employee.lastName +" "+ this.successUpdateText;
		if(this.mode ==='add'){
			message = this.employee.firstName +" "+ this.employee.lastName +" "+ this.successAddText;
		}
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}

}
