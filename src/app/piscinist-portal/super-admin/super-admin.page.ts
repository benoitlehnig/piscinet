import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import {AccountServicesService} from '../../services/account-services.service'
import {Company} from '../../models/company';

@Component({
	selector: 'app-super-admin',
	templateUrl: './super-admin.page.html',
	styleUrls: ['./super-admin.page.scss'],
})
export class SuperAdminPage implements OnInit {

	public accounts:Array<Company>=[];
	constructor(
		public  accountServicesService: AccountServicesService,
		public functions:AngularFireFunctions
		) { }

	ngOnInit() {
		this.accountServicesService.getAcccounts().subscribe(
			
			(data)=> {console.log(data);this.accounts = data});
		
	}


	selectAccount(account){
		console.log(account);
		const callable = this.functions.httpsCallable('setSuperAdminDefaultAccount');
		const obs = callable(account.id);
		obs.subscribe(async res => {
		});
	}

}
