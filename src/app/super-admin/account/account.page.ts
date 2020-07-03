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

	public id:string="";
	public account:Company = new Company();
	constructor(
		public  accountServicesService: AccountServicesService,
		public  activatedRoute: ActivatedRoute,
		) { }

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
	}

	ionViewWillEnter(){
		this.accountServicesService.getAccount(this.id).subscribe(
			(data) =>{
				this.account = data;
			})		
	}

}
