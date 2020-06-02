import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import {Customer} from '../models/customer';
import {SwimmingPool} from '../models/swimming-pool';
import { Observable, combineLatest, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { AuthenticationService } from '../services/authentication.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';


@Component({
	selector: 'app-customer',
	templateUrl: './customer.page.html',
	styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

	zoom = 18;
	center: google.maps.LatLngLiteral
	options: google.maps.MapOptions = {
		mapTypeId: 'hybrid',
		zoomControl: false,
		scrollwheel: true,
		disableDoubleClickZoom: true,
	}
	public claims;

	public uid:string;
	public customer:Customer=new Customer();
	public customerStringified;string="";
	swimmingPools:Observable<any>;

	constructor(
		private activatedRoute: ActivatedRoute,
		public afDatabase: AngularFireDatabase,
		public authenticationService:AuthenticationService,
		private launchNavigator: LaunchNavigator

		) { }

	ngOnInit() {
		this.uid = this.activatedRoute.snapshot.paramMap.get('id');
		this.claims = this.authenticationService.getClaims();
		
	}
	ionViewWillEnter(){
		this.afDatabase.object<Customer>('customers/'+this.uid).valueChanges().subscribe(
			(data) =>{
				this.customer = data;
				this.customerStringified = JSON.stringify(data);
				console.log(data)
				this.center = this.customer.location;
			})
		this.swimmingPools = this.afDatabase.list('/pools/'+this.uid).snapshotChanges().pipe(
			map(changes => 
				changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
				)
			);
	}
	launchNavigatorRequest(){
		this.launchNavigator.navigate(this.customer.googleAddress)
		.then(
			success => console.log('Launched navigator'),
			error => console.log('Error launching navigator', error)
			);
	}


}
