import { Component, OnInit,NgZone } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import {Company} from '../../models/company';
import { NavController } from '@ionic/angular';
import {Employee} from '../../models/employee';

@Component({
	selector: 'app-add-admin',
	templateUrl: './add-admin.page.html',
	styleUrls: ['./add-admin.page.scss'],
})
export class AddAdminPage implements OnInit {

	public GoogleAutocomplete: google.maps.places.AutocompleteService;
	public geocoder = new google.maps.Geocoder;
	public autocomplete: { input: string; };
	public autocompleteItems: any[];
	public location: any;

	public employee:Employee = new Employee();
	public accountId:string ="";

	constructor(
		private functions: AngularFireFunctions,
		public zone: NgZone,
		public navCtrl: NavController,
		private activatedRoute: ActivatedRoute,
		) { }

	ngOnInit() {
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
		this.accountId = this.activatedRoute.snapshot.paramMap.get('id');

	}

	submitForm(){
		let adminToAdd={'employee':this.employee, 'accountId' : this.accountId};
		const callable = this.functions.httpsCallable('addAdmin');
		const obs = callable(adminToAdd);
		obs.subscribe(async res => {
			this.navCtrl.navigateRoot(['super-admin/']);
		});
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
		this.employee.googleAddress = this.location.description;
		this.geocoder.geocode({'placeId': this.location.place_id}, (results, status) => {
			this.employee.location = {lat: results[0].geometry.location.lat(),lng :results[0].geometry.location.lng()}; 
		})
		this.autocomplete = { input: this.employee.googleAddress};
		this.autocompleteItems = [];
	}

}
