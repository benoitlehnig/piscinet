import { Component, OnInit,NgZone } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {Employee} from '../models/employee';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';


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
	public loadingText:string="";

	public GoogleAutocomplete: google.maps.places.AutocompleteService;
	public geocoder = new google.maps.Geocoder;
	public autocomplete: { input: string; };
	public autocompleteItems: any[];
	public location: any;
	public loading ;
	constructor(
		private functions: AngularFireFunctions,
		public navCtrl: NavController,
		private afAuth: AngularFireAuth,
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase,
		public toastController: ToastController,
		public translateService : TranslateService,
		public zone: NgZone,
		public loadingController: LoadingController
		) { 
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			if(this.mode ==="update"){
				this.uid = params['uid'];
				this.afDatabase.object<Employee>('employees/'+this.uid).valueChanges().subscribe(
					(data) =>{
						this.employee = data;
						this.autocomplete = { input: this.employee.googleAddress};
					})
			}
		});
		this.translateService.get(['ADDEMPLOYEE.SuccessAdd', 'ADDEMPLOYEE.SuccessUpdate','COMMON.Loading']).subscribe(
			value => {
				// value is our translated string
				console.log(value);
				this.successAddText = value['ADDEMPLOYEE.SuccessAdd']
				this.successUpdateText = value['ADDEMPLOYEE.SuccessUpdate'];
				this.loadingText = value['COMMON.Loading'];
			});
	}


	addEmployee(){
		const callable = this.functions.httpsCallable('addEmployee');
		const obs = callable(this.employee);

		obs.subscribe(async res => {
			this.presentToast();
			this.loading.dismiss();
			this.navCtrl.navigateRoot(['employees/'+res.key]);
		});
	}

	updateEmployee(){
		console.log("employee", this.employee);
		let employeeToUpdatee={'uid':this.uid, 'value' : this.employee};
		const callable = this.functions.httpsCallable('updateEmployee');
		const obs = callable(employeeToUpdatee);

		obs.subscribe(async res => {
			this.loading.dismiss();
			this.presentToast();
			this.navCtrl.navigateRoot(['employees/'+this.uid]);
		});
	}

	async submitForm(){
		if(this.mode ==='add'){
			this.addEmployee()
		}
		if(this.mode ==='update'){
			this.updateEmployee()
		}
		
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 5000
		});
		this.loading.present();

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

	updateSearchResults(){
		if (this.autocomplete.input == '') {
			this.autocompleteItems = [];
			return;
		}

		this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input,  componentRestrictions: {country: 'fr'}, types: ['address'] },
			(predictions, status) => {
				this.autocompleteItems = [];
				this.zone.run(() => {
					predictions.forEach((prediction) => {
						this.autocompleteItems.push(prediction);
					});
				});
			});
	}
	
	selectSearchResult(item) {
		console.log(item)
		this.location = item
		this.employee.googleAddress = this.location.description;
		this.geocoder.geocode({'placeId': this.location.place_id}, (results, status) => {
			console.log(results);
			this.employee.location = {lat: results[0].geometry.location.lat(),lng :results[0].geometry.location.lng()}; 
		})
		console.log('placeid'+ item)
		this.autocomplete = { input: this.employee.googleAddress};
		this.autocompleteItems = [];
	}

}
