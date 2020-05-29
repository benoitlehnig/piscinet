import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {Customer} from '../../models/customer';

@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.page.html',
	styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

	public uid:string="";
	customer:Customer=new Customer();

	zoom = 18;
	center: google.maps.LatLngLiteral
	options: google.maps.MapOptions = {
		mapTypeId: 'hybrid',
		zoomControl: false,
		scrollwheel: true,
		disableDoubleClickZoom: true,
	}
	
	constructor( 
		public authService:AuthenticationService,
		public afDatabase: AngularFireDatabase

		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.authService.user.subscribe(
			result =>
			{
				console.log("MyProfilePage", result)
				this.uid = result.uid;
				this.afDatabase.object<Customer>('customers/'+this.uid).valueChanges().subscribe(
					(data) =>{
						this.customer = data;
						console.log(data)
						this.center = this.customer.location;
					})
			})

	}

}
