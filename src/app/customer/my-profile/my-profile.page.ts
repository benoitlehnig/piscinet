import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomerServicesService } from '../../services/customer-services.service'
import {Customer} from '../../models/customer';

@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.page.html',
	styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

	public uid:string="";
	customer:Customer=new Customer();

	constructor( 
		public authService:AuthenticationService,
		public customerServicesService: CustomerServicesService

		) { }

	ngOnInit() {
	}

	ionViewWillEnter(){
		this.authService.user.subscribe(
			result =>
			{
				console.log("MyProfilePage", result)
				this.uid = result.uid;
				this.customerServicesService.getCustomer(this.uid).subscribe(
					(data) =>{
						this.customer = data;
					})
			})

	}

}
