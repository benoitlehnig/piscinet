import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {Customer} from '../../models/customer';
import { map, switchMap } from 'rxjs/operators'

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
					})
			})

	}

}
