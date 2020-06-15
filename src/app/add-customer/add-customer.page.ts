import { Component, OnInit ,NgZone } from '@angular/core';
import {Customer} from '../models/customer';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { CustomerServicesService } from '../services/customer-services.service'
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';


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
		public customerServicesService:CustomerServicesService,
		public toastController: ToastController,	
		public translateService : TranslateService,
		public zone: NgZone,
		public loadingController: LoadingController

		) 
	{
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.mode =  params['mode'];
			if(this.mode ==="update"){
				this.uid = params['uid'];
				this.customerServicesService.getCustomer(this.uid).subscribe(
					(data) =>{
						this.customer = data;
						this.typeOfContract = this.customer.typeOfContract;
						this.contractOfProduct = this.customer.contractOfProduct;
						this.autocomplete = { input: this.customer.googleAddress};
					})
			}
		});
		this.translateService.get(['ADDCUSTOMER.SuccessAdd', 'ADDCUSTOMER.SuccessUpdate','COMMON.Loading']).subscribe(
			value => {
				this.successAddText = value['ADDCUSTOMER.SuccessAdd']
				this.successUpdateText = value['ADDCUSTOMER.SuccessUpdate'];
				this.loadingText = value['COMMON.Loading'];
			});
	}

	addCustomer(){
		this.customer.typeOfContract = this.typeOfContract;
		this.customer.contractOfProduct = this.contractOfProduct;
		const callable = this.functions.httpsCallable('addCustomer');
		const obs = callable(this.customer);
		obs.subscribe(async res => {
			this.successfullUpdate(res.key);
			this.navCtrl.navigateRoot(['customers/'+res.key]);
		});
	}

	updateCustomer(){
		this.customer.typeOfContract = this.typeOfContract;
		this.customer.contractOfProduct = this.contractOfProduct;
		let customerToUpdate={'uid':this.uid, 'value' : this.customer};
		const callable = this.functions.httpsCallable('updateCustomer');
		const obs = callable(customerToUpdate);
		obs.subscribe(async res => {
			this.successfullUpdate(this.uid)
		});
	}

	successfullUpdate(uid){
		this.loading.dismiss();
		this.presentToast();
		this.navCtrl.navigateRoot(['customers/'+uid]);
	}

	async submitForm(){
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: this.loadingText,
			duration: 5000
		});
		this.loading.present();
		if(this.mode ==='add'){
			this.addCustomer()
		}
		if(this.mode ==='update'){
			this.updateCustomer()
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
		this.location = item
		this.customer.googleAddress = this.location.description;
		this.geocoder.geocode({'placeId': this.location.place_id}, (results, status) => {
			this.customer.location = {lat: results[0].geometry.location.lat(),lng :results[0].geometry.location.lng()}; 
		})
		this.autocomplete = { input: this.customer.googleAddress};
		this.autocompleteItems = [];
	}

}
