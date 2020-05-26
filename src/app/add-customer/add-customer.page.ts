import { Component, OnInit } from '@angular/core';
import {Customer} from '../models/customer';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-add-customer',
	templateUrl: './add-customer.page.html',
	styleUrls: ['./add-customer.page.scss'],
})
export class AddCustomerPage implements OnInit {

	public typeOfContract:string="full";
	public contractOfProduct:string="included";
	public mode:string="add";
	public customer:Customer = new Customer();
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
		) 
	{

	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			console.log(this.mode)
			if(this.mode ==="update"){
				this.uid = params['uid'];
				this.afDatabase.object<Customer>('customers/'+this.uid).valueChanges().subscribe(
					(data) =>{
						this.customer = data;
						this.typeOfContract = this.customer.typeOfContract;
						this.contractOfProduct = this.customer.contractOfProduct;
					})
			}
		});
		this.translateService.get(['ADDCUSTOMER.SuccessAdd', 'ADDCUSTOMER.SuccessUpdate']).subscribe(
			value => {
				// value is our translated string
				console.log(value);
				this.successAddText = value['ADDCUSTOMER.SuccessAdd']
				this.successUpdateText = value['ADDCUSTOMER.SuccessUpdate'];
			});
	}
	selectContract(event){
		this.typeOfContract = event.target.value;
	}
	selectProductContract(event){
		this.contractOfProduct = event.target.value;
	}

	addCustomer(form){
		let customer = new Customer().deserialize(form.value);
		customer.typeOfContract = this.typeOfContract;
		customer.contractOfProduct = this.contractOfProduct;
		console.log("customer", customer);
			const callable = this.functions.httpsCallable('addCustomer');
			const obs = callable(customer);
			obs.subscribe(async res => {
				this.presentToast();
			});
	}

	updateCustomer(form){
		let customer = new Customer().deserialize(form.value);
		customer.typeOfContract = this.typeOfContract;
		customer.contractOfProduct = this.contractOfProduct;
		console.log("customer", customer);
		let customerToUpdate={'uid':this.uid, 'value' : customer};
		const callable = this.functions.httpsCallable('updateCustomer');
		const obs = callable(customerToUpdate);

		obs.subscribe(async res => {
			this.presentToast();
			this.navCtrl.navigateRoot(['customer/'+this.uid]);
		});
	}

	submitForm(form){
		if(this.mode ==='add'){
			this.addCustomer(form)
		}
		if(this.mode ==='update'){
			this.updateCustomer(form)
		}
	}
	async presentToast() {
		let message = this.customer.firstName +" "+ this.customer.lastName +" "+ this.successUpdateText;
		if(this.mode ==='add'){
			message = this.customer.firstName +" "+ this.customer.lastName +" "+ this.successAddText;
		}
		const toast = await this.toastController.create({
			message: message ,
			duration: 3000
		});
		toast.present();
	}

}
