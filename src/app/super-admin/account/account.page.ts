import { Component, OnInit } from '@angular/core';
import {AccountServicesService} from '../../services/account-services.service'
import { ActivatedRoute } from '@angular/router';
import {Company} from '../../models/company';

@Component({
	selector: 'app-account',
	templateUrl: './account.page.html',
	styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

	public accountId:string="";
	public account:Company = new Company();
	constructor(
		public  accountServicesService: AccountServicesService,
		public  activatedRoute: ActivatedRoute,
		) { }

	ngOnInit() {
		this.accountId = this.activatedRoute.snapshot.paramMap.get('id');
	}

	ionViewWillEnter(){
		this.accountServicesService.getAccount(this.accountId).subscribe(
			(data) =>{
				console.log("account : ", data);
				this.account = data;
			})		
	}

	saveAccount(){
		
	}

}
